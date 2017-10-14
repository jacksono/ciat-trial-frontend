
import React from 'react';
import {Link, IndexLink} from 'react-router';

export default class HomePage extends React.Component {
  render() {
    return (
        <div>
        <form className='form-horizontal'>

            <div className='form-group'>
              <div className=' category col-sm-4'>
              <Link to ="/search">
                  <input className='btn-home form-control'
                         name='praise'
                         type='button'
                         value='LOGIN'
                         onClick=''
                  />
                  </Link>
              </div>
            </div>

            </form>
        </div>
    );
  }
}
