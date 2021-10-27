const express = require('express');
const _ = require('lodash');
const { Card, validateCard, generateRandomNumber } = require('../models/card');
const auth = require('../middleware/auth');
const router = express.Router();
const { User} = require('../models/user');

router.delete('/:id', auth, async (req, res) => {

  let card = Card.findOneAndRemove({_id: req.params.id, user_id: req.user._id});
  if(! card) return res.status(400).send('card not found');

  res.send(card);
});

//כל פעם עובר איידי אחר ואפשר ברקווסט פארם לשלוח
//פארמס מגיע מאקספרס ולא ממונגו
router.put('/:id', auth, async (req, res) => {
  
  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  //מתודה ראשונה אומרת איפה באיזה איידי לעדכן
  //שתי תנאים שאיידי שלו הוא איידי שעבר בשורת כתובת וגם שאיידי שלו הוא איידי של היוזר שהתחבר
  let card = await Card.findOneAndUpdate({_id: req.params.id, user_id: req.user._id}, req.body)
  if (! card) return res.status(404).send('the card with the given id does not found');
//כדי שרספונס שיחזור יהיה עם פרטים מעודכנים צריך לשלוח שוב בקשה לקבלת הפרטים

  card = await Card.findOne({_id:req.params.id, user_id: req.user._id});
  res.send(card);
});


router.get('/:id', auth, async(req,res) =>{
  const card = await Card.findOne({_id:req.params.id, user_id: req.user._id});
  if( ! card ) return res.status(404).send('the card with the given Id not found');
  res.send(card);
});




router.post('/', auth, async (req, res) => {

  const { error } = validateCard(req.body);
  if (error) return res.status(400).send(error.details[0].message);

  let card = new Card(
    {
      bizName: req.body.bizName,
      bizDescription: req.body.bizDescription,
      bizAddress: req.body.bizAddress,
      bizPhone: req.body.bizPhone,
      bizImage: req.body.bizImage ? req.body.bizImage : 'https://cdn.pixabay.com/photo/2015/10/05/22/37/blank-profile-picture-973460_960_720.png',
      bizNumber: await generateRandomNumber(Card),
      user_id: req.user._id
    }
  );

  post = await card.save();
  res.send(post);

});

module.exports = router; 