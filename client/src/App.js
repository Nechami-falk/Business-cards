import React, { Component } from 'react'
import './App.css';
import Navbar from './components/navBar';
import Footer from './components/footer';
import Home from './components/home';
import About from './components/about';
import Logout from './components/logout';
import Signup from './components/signup';
import Signin from './components/signin';
import {Switch, Route} from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import userService from './services/userService';
import BizSignup from './components/bizSignup';
import MyCart from './components/myCart';
import ProtectedRoute from './components/common/protectedRoute';
import EditCard from './components/editCard';


class App extends Component {

  state={ };

  componentDidMount() {
    const user = userService.getCurrentUser();
    this.setState({user});
  }

  render(){

    const {user} = this.state;
  return (
    <React.Fragment >
      <header >
        <ToastContainer/>
        <Navbar user={user} />
      </header>
      <main className="minh-900" >
        <Switch>
          
          <ProtectedRoute path="/create-card" component={CreateCard} biz={true}/>
          <ProtectedRoute path="/my-cards/edit/:id" component={EditCard} biz={true}/> 
          <Route path="/biz-signup" component={BizSignup}/>
          <Route path="/logut" component={Logout}/>
          <Route path="/signin" component={Signin}/>
          <Route path="/signup" component={Signup}/>  
          <Route path="/about" component={About}/>
          <Route path="/myCart" component={MyCart}/>
          <Route path="/" exact component={Home}/>
       


          
        </Switch>
      </main>
      <footer><Footer/></footer>
    </React.Fragment>
  );
}
}

export default App;
