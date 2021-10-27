import React from 'react';
import PageHeader from './common/pageHeader';
import Joi from "joi-browser";
import Form from "./common/form";
import userService from "../services/userService";
import { Redirect } from "react-router-dom"; 



class Signin extends Form {
    state = { 
        data:{email:"", password:""},
        errors:{}
     }

     schema = {
        email:Joi.string().required().email().label("Email"),
        password:Joi.string().required().min(6).label("Password"), 
     }

    doSubmit = async () => {
        const {email, password} = this.state.data;
        try{
            await  userService.login(email, password);
            //רק בהתחברות עושים רפרש מחדש ולא רק רינדור של קומפוננטה
            //כי לוקח הרבה זמן לדף לעכן את האפליקציה שיש טוקן של התחברות
            // כי הטוקן נמצא בהרדיסק של במחשב
            window.location='/';


        } catch(ex){
            if( ex.response && ex.response.status === 400){
                this.setState({ errors: {email: ex.response.data} })
            
            }
        }
    }

    
        render() { 
//אם כבר רשום לא יוכל להכנס לסין אין אלא יעביר אותו לדף הבית
            if ( userService.getCurrentUser() ) return <Redirect to ="/"/>

        return ( 
            <div className="container">
            <PageHeader titleText="Signin Page"/>
            <div className="row">
                <div className="col-12">
                    <p>Here you can open new account for free!</p>
                </div>
                <div className="row">
                    <div className="col-lg-6" >
                    <form onSubmit={this.handleSubmit} autoComplete="off" method="post">
                            {this.renderInput("email", "Email", "email")}
                            {this.renderInput("password", "Password", "password")}
                            {this.renderButton("Signup")}
                    </form>
                    </div>
                </div>
            </div>
            </div>
         );
    }
}
 
export default Signin;