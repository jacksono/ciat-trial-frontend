
import React from 'react';
import {Link, IndexLink} from 'react-router';


export default class Header extends React.Component {
  render() {
    return (
        <div className='jumbo'>
                <Link to="/home" activeClassName="active">
                <img src={require('./logowhite.jpg') } alt='HOME' width="80" height="80"/>
                <img src={require('./logo2.png') } alt='HOME' width="80" height="80" className="float-right"/>  
                </Link>
        </div>
    );
  }
}
