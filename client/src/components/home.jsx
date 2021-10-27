import React, { Component } from 'react';
import PageHeader from './common/pageHeader';

class Home extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <PageHeader titleText="Welcom to real app"/>
                <div className="row">
                    <div className="col-12">
                        <p>Lorem ipsum dolor sit amet consectetur adipisicing elit. Est, vitae?</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default Home;