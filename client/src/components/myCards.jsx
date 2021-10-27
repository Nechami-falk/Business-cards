import React, { Component } from 'react';
import PageHeader from './common/pageHeader';
import cardService from '../services/cardService';
import Card from './card';
import {Link} from 'react-router-dom'; 
import Swal from 'sweetalert2';
import {toast } from 'react-toastify';

class MyCards extends Component {
    state = { 
        cards:[]
     }

async componentDidMount(){
const { data } = await cardService.getMyCards();
if ( data.length > 0 )  this.setState ({ cards: data });
}

deleteCard = (cardId) => {
    Swal.fire({
        title:'Are you sure to want to delete this card?',
        text:"you wont be to revert this!",
        icon:'Warning',
        showCancelButton:true,
        confirmButtonColor:'#ff0000',
        cancelButtonColor:'gray',
        confirmButtonText:'Delete'
    }).then( async (result) => {
        if (result.isConfirmed){
            let cards = [...this.state.cards];
            cards = cards.filter( card=> card._id !== cardId);
            this.setState({cards: cards});
            toast ('the card has been deleted!');
            await cardService.deleteCard(cardId);
        }
    });
};

    render() { 

        const { cards } = this.state;

        return ( 
            <div className="container">
                <PageHeader titleText="Your Cards List" />
                <div className="row">
                    <div className="col-12">
                        <p>Here tou can view your cards list</p>
                    </div>
                </div>
                <div className="row">
                    <div className="col-12">
                        <p>
                        <Link to="/create-card" className="btn btn-success"> + Add Card</Link>
                        </p>
                    </div>
                </div>
                
                <div className="row">
                    { cards.length > 0 && cards.map (card => <Card key={card._id} card={card} deleteCard={this.deleteCard}/> ) }
                </div>
            </div>
         );
    }
}
 
export default MyCards;