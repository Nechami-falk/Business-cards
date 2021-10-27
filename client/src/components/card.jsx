import React from 'react';
import { Link } from 'react-router-dom';

const Card = ({card, deleteCard}) => {
    return ( 
        //בניד זה יהיה אחד כל הרוחב, בטאבלט לרוחב זה יהיה חצי, במחשב נייד וניח זה יהיה שליש
    <div className="col-md-6 col-lg-4 mt-3">
        <div className="card">
            <img width="100" src={card.bizImage} alt={card.bizName} />
            <div className="card-body">
                <h5 className="card-title">{card.bizName}</h5>
                <p className="card-text">{card.bizDescription}</p>
                <p className="card-text border-top pt-2">
                    <b>Tel:</b>{card.Phone}<br/>
                    <b>Biz Number:</b>{card.bizNumber}<br/>
                </p>
                <Link to ={`/my-cards/edit/${card._id}`}>Edit</Link>
                <Link to='#' className='ml-1' onClick={deleteCard()}>Delete</Link>
            </div>
        </div> 
    </div> );
}
 
export default Card;