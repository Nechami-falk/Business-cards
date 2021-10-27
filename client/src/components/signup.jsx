import React  from 'react';
import PageHeader from './common/pageHeader';
import Joi from "joi-browser";
import Form from "./common/form";
import http from "../services/httpService";
import {apiUrl} from "../config.json";
import { toast } from 'react-toastify';
import { Redirect } from 'react-router-dom';
import userService from '../services/userService';

//לעשות אימפורט לJOI ןל FORM 
//לעשות EXTENDS ל FORM
class Signup extends Form {
    state = { 
        // לפי ניים השדה להכניס את שמות השדות שאנו רוצים
        data:{ email:"", password:"", name:"" },
        errors:{ }
    }
//סכימה לפי שם השדה
    schema = {
        email:Joi.string().required().email().label("Email"),
        password:Joi.string().required().min(6).label("Password"),
        name: Joi.string().required().min(2).label("Name")
    }
//חובה לעשות מתודה בשם סבמיט כי הפורם יחפש אותה
     doSubmit = async () => {
        //shalow copy
        const data = { ...this.state.data };
        data.biz = false;
        try{

            await http.post(`${apiUrl}/users`, data);
            toast(`${data.name} you sign up successfuly`);
            this.props.history.replace('/signin');
            
        }catch(ex){

            if(ex.response && ex.response.status === 400){
                this.setState({errors:{email:'Email is taken'}});
            }
            
        }
    }

    render() { 
        if ( userService.getCurrentUser () ) return <Redirect to ="/" />
        

        return ( 
            <div className="container">
            <PageHeader titleText="Signup Page"/>
            <div className="row">
                <div className="col-12">
                    <p>Here you can open new account for free!</p>
                </div>
                <div className="row">
                    <div className="col-lg-6" >
                        {/*   ברנדר בוטן לכתוב את שם הכפתור מתאים לפונקציה שבתוך האינפוט */}
                        <form onSubmit={this.handleSubmit} autoComplete="off" method="post">
                            {this.renderInput("email", "Email", "email")}
                            {this.renderInput("password", "Password", "password")}
                            {this.renderInput("name", "Name")}
                            {this.renderButton("Signup")}
                        </form>
                    </div>
                </div>
            </div>
        </div>
        );
    }
}
 
export default Signup;