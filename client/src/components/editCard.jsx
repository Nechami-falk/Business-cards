import React  from 'react';
import PageHeader from './common/pageHeader';
import Joi from "joi-browser";
import Form from "./common/form";
import cardService from "../services/cardService";
import {toast } from 'react-toastify';
import {Link} from 'react-router-dom';

//לעשות אימפורט לJOI ןל FORM 
//לעשות EXTENDS ל FORM
class EditCard extends Form {
    state = { 
        // לפי ניים השדה להכניס את שמות השדות שאנו רוצים
        data:{ 
            bizName: "",
            bizDescription:"",
            bizAddress: "",
            bizPhone: "",
            bizImage: ""
         },
        errors:{ }
    }
//סכימה לפי שם השדה
    schema = {
        _id:Joi.string(),
        bizName: Joi.string().min(2).max(255).required(),
        bizDescription: Joi.string().min(2).max(1024).required(),
        bizAddress: Joi.string().min(2).max(400).required(),
        bizPhone: Joi.string().min(9).max(10).required().regex(/^0[2-9]\d{7,8}$/),
        bizImage: Joi.string().min(11).max(1024).uri().allow("")
        //יואראי בודק שזה כתובת יואראל, אלוו אומר שזה לא חובה להזין תמונה כי יש תמונה דיפולטיבית
    }
//ריאקט ראוטר דום אחראי על הניתוב בפרופס ריאקט מעבירה מטש ובתוכו יש פרמס ובתוכו יש את אידי

async componentDidMount(){
    const cardId = this.props.location;
    const {data} = await cardService.getCard(cardId);
    this.setState({ data: this.mapToViewModel(data)});
}

mapToViewModel(card){
    return {
        _id: card.id,
        bizName: card.bizName,
        bizDescription: card.bizDescription,
        bizAddress: card.bizAddress,
        bizPhone: card.bizPhone,
        bizImage: card.bizImage
    };
}

doSubmit = async  () => {
    const {data} = this.state;
    await cardService.editCard(data);
    toast("Card details update");
    this.props.history.replace('/my-cards');
}


    render() { 
        

        return ( 
            <div className="container">
            <PageHeader titleText="Edit Card Form"/>
            <div className="row">
                <div className="col-12">
                    <p>Update Your Card details</p>
                </div>
                <div className="row">
                    <div className="col-lg-6" >
                        {/*   ברנדר בוטן לכתוב את שם הכפתור מתאים לפונקציה שבתוך האינפוט */}
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="post">
                            {this.renderInput("bizName","Business Name")}
                            {this.renderInput("bizDescription","Business Discreption")}
                            {this.renderInput("bizAddress","Business Address")}
                            {this.renderInput("bizPhone","Business Phone")}
                            {this.renderInput("bizImage","Business Image")}
                            {this.renderButton("update Card")}
                            <Link className="btn btn-secondary ml-2" to="/my-cards">Cancl</Link>

                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
 
export default EditCard;