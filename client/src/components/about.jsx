import React, { Component } from 'react';
import PageHeader from './common/pageHeader';

class About extends Component {
    state = {  }
    render() { 
        return ( 
            <div className="container">
                <PageHeader titleText="About Real App" />
                <div className="row">
                    <div className="col-12">
                        <p>Our real app is best ever!</p>
                    </div>
                </div>
            </div>
         );
    }
}
 
export default About;