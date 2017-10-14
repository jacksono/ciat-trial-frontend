
import React from 'react';
import {Link, IndexLink} from 'react-router';
import { Table } from 'reactstrap';
import apiCall from './apiHelper';
import ResultTable from './resultsTable';

export default class PraisePage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        editValues: {},
        Results:{ MY:[],
                      MAGB:[],
                      TAGB:[],
                      SY:[],
                      SAGB:[]},
        allResults: [],
        plot_num:'',
        hasResults: false,
        searched: false,
        observation:'',
        error: '',
        errorObservation:'',
        years: []
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.select = this.select.bind(this);

    }


select(event){
  let targets = [];
  $.each($(".selectpicker option:selected"), function(){
  targets.push($(this).val());
  });
  this.setState({years: targets})
}

handleChange(event) {
const { name, value } = event.target;
if(name === 'obs'){
  if(this.state.editValues.rot === 'M-M' && !this.refs.obs.value.includes("M")){
    this.setState({errorObservation : "Invalid Observation for the selected Rotation"})
  }
  else if((this.state.editValues.rot === 'M-T' || this.state.editValues.rot === 'T-M') && this.refs.obs.value.includes("S")){
    this.setState({errorObservation : "Invalid Observation for the selected Rotation"})
  }
  else if(this.state.editValues.rot === 'Intercr'  && this.refs.obs.value.includes("T")){
    this.setState({errorObservation : "Invalid Observation for the selected Rotation"})
  }

else{
  this.setState({errorObservation : ""})
}
}
else if(!this.state.editValues.season){
  this.setState({searched: false})
}

this.setState({
  editValues: Object.assign({}, this.state.editValues, { [name]: value }),
});
}

handleClear() {
  this.setState({ editValues:{rep:'...',
                              rot:'',
                              obs:'',
                              fym:'',
                              nitro:'',
                              phos:'',
                              res:'',
                              year:'',
                              season:''},
                  Results:{ MY:[],
                                MAGB:[],
                                TAGB:[],
                                SY:[],
                                SAGB:[]},
                    plot_num:'',
                    hasResults:false,
                    searched:false,
                    error : '',
                    errorObservation:''

  });
}

handleSearch(event) {
  event.preventDefault()
  this.setState({ Results:{ MY:[],
                                MAGB:[],
                                TAGB:[],
                                SY:[],
                                SAGB:[]},
                    plot_num:'',
                    hasResults:false,
                    allResults: [],
                    error:'',
                    searched: false

  });
  let error = false
  const res = this.refs.res.value
  const fym = this.refs.fym.value
  const rot = this.refs.rot.value
  const nitro = this.refs.nitro.value
  const phos = this.refs.phos.value
  const rep = this.refs.rep.value
  const observation = this.refs.obs.value
  if( observation === "..." || res === "..." || fym === "..." || rot === "..." ||
    nitro  === "..." || phos  === "..." || rep === "..." || this.state.errorObservation){
    error = true
    this.setState({ errorState: true,
      error: 'ERROR: All selections are required'
    })
  }
  if(!error){
  apiCall(null, 'get', 'results/combination?res='+res+'&f='+fym+'&n='+nitro+'&p='+phos+'&rep='+rep+'&rot='+rot)
  .then((response) => {
    this.setState({searched: true})
    if(response){
      const resp = response[0]["Results"+2004]
      this.setState({hasResults: true, allResults: response});
    }
}).catch(error => (error));
}
}
  render() {
    console.log("wll",this.state.allResults)
    return (
        <div>

        <form className='form-horizontal'>
            <div className='form-group'>
              <header className="category-header">
                INM
              </header>
            </div>

            <div className='table-div' >

              <div className='form-group'>
              <h3 className="text-group"> Select Combination </h3>
                <label className='control-label col-sm-3'> RESIDUE </label>
                <div className='col-sm-3'>
                <select
                  className="form-control select"
                  ref="res"
                  name="res"
                  value={this.state.editValues.res}
                  onChange={this.handleChange}
                  style={{ width: '100px' }}
                >
                  {
                    ["...", "R-", "R+"].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))
                  }
                </select>
                </div>

                <div className='form-group'>
                  <label className='control-label col-sm-2 '> ROTATION </label>
                  <div className='col-sm-3'>
                    <select
                      className="form-control select"
                      name="rot"
                      ref="rot"
                      value={this.state.editValues.rot}
                      onChange={this.handleChange}
                      style={{ width: '100px' }}
                    >
                      {
                        ["...", "M-M", "M-T", "T-M", "Intercr"].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>
              </div>



              <div className='form-group'>
                <label className='control-label col-sm-3 '> REPETITION </label>
                <div className='col-sm-3'>
                  <select
                    className="form-control select"
                    name="rep"
                    ref="rep"
                    value={this.state.editValues.rep}
                    onChange={this.handleChange}
                    style={{ width: '100px' }}
                  >
                    {
                      ["...", "1", "2", "3", "4"].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))
                    }
                  </select>
                </div>
                <div className='form-group'>
                  <label className='control-label col-sm-2 '> NITROGEN </label>
                  <div className='col-sm-3'>
                  <select
                    className="form-control select"
                    name="nitro"
                    ref="nitro"
                    value={this.state.editValues.nitro}
                    onChange={this.handleChange}
                    style={{ width: '100px' }}

                  >
                    {
                      ["...", "N0", "N30", "N60", "N90"].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))
                    }
                  </select>
                  </div>
                </div>
              </div>



              <div className='form-group  '>
                <label className='control-label col-sm-3 '> PHOSPHORUS </label>
                <div className='col-sm-3'>
                <select
                  className="form-control select"
                  name="phos"
                  ref="phos"
                  value={this.state.editValues.phos}
                  onChange={this.handleChange}
                  style={{ width: '100px' }}
                >
                  {
                    ["...", "P0", "P60"].map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))
                  }
                </select>
                </div>
                <div className='form-group'>
                  <label className='control-label col-sm-2 '> FYM </label>
                  <div className='col-sm-3'>
                  <select
                    className="form-control select"
                    name="fym"
                    ref="fym"
                    value={this.state.editValues.fym}
                    onChange={this.handleChange}
                    style={{ width: '100px' }}
                  >
                    {
                      ["...", "PlusFYM", "Minus FYM"].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))
                    }
                  </select>
                  </div>

                </div>
              </div>

              <div className="form-group  ">
              <hr />
              <h3 className="text-group"> Select Observation </h3>
                <div className='marg'>
                  <div className='col-sm-6'>
                  <select
                    className="form-control select"
                    name="obs"
                    ref="obs"
                    value={this.state.editValues.obs}
                    onChange={this.handleChange}
                  >
                    {
                      ["...", "Maize_Y", "Maize_AGB", "Soy_Y", "Soy_AGB", "Teph_AGB",].map(option => (
                        <option key={option} value={option}>{option}</option>
                      ))
                    }
                  </select>
                  </div>

                </div>
              </div>
              {
                this.state.errorObservation &&
                <div className='error'>
                  <h4>{this.state.errorObservation}</h4>
                </div>
              }
              <hr />

              <h3 className="text-group"> Select Years </h3>

              <select className="selectpicker"
                      multiple
                      onChange={this.select}
                      data-none-selected-text='All years'
                      data-actions-box='true'
                      data-header='Years'

              >
              {
                ["2004", "2005", "2006", "2007",
                 "2008", "2009", "2010", "2011", "2012", "2013",
                 "2014", "2015"].map(option => (
                  <option key={option} value={option}>{option}</option>
                ))
              }
              </select>
              <hr/>

            {!this.state.searched &&
            <div className='form-group marg'>
              <div className='col-sm-3'>
              <input className='btn btn-success form-control'
                      name='edit'
                      type='button'
                      value='SEARCH'
                      onClick={this.handleSearch}
                  />
              </div>
              <div className='col-sm-3'>
                  <input type='button'
                       name='cancel'
                       onClick={this.handleClear}
                       className='btn btn-default form-control cancelBtn'
                       value="CLEAR"
                  />
              </div>

          </div>
        }

          {
            this.state.error &&
            <div className='error'>
              <h4>{this.state.error}</h4>
            </div>
          }

          {(this.state.searched && !this.state.errorObservation) &&
          <div>
          {3 > 0 ?
            <div>
          <Table striped className='table-rows'>
                  <thead>
                    <tr>
                      <th>YEAR </th>
                      <th>PLOT </th>
                      <th>SHORT RAINS</th>
                      <th>LONG RAINS</th>

                    </tr>
                  </thead>

                  <tbody>
                  {this.state.allResults.slice(2).map((result) => {
                    if(this.state.years.length > 0){
                      if(this.state.years.includes(Object.entries(result)[0][0].slice(7))){
                    return (
                      <tr key={Object.entries(result)[0][0] + Object.values(result)[0]['plot']}>
                        <td>{Object.entries(result)[0][0].slice(7)}</td>
                        <td>{Object.values(result)[0]['plot']}</td>
                        <td>{Object.values(result)[0][this.refs.obs.value][0].toFixed(2)}</td>
                        <td>{Object.values(result)[0][this.refs.obs.value][1].toFixed(2)}</td>
                      </tr>
                    )}}
                    else if(Object.entries(result)[0][0].includes("Results")){
                      return (
                        <tr key={Object.entries(result)[0][0] + Object.values(result)[0]['plot']}>
                          <td>{Object.entries(result)[0][0].slice(7)}</td>
                          <td>{Object.values(result)[0]['plot']}</td>
                          <td>{Object.values(result)[0][this.refs.obs.value][0].toFixed(2) }</td>
                          <td>{Object.values(result)[0][this.refs.obs.value][1].toFixed(2)}</td>
                        </tr>
                      )
                    }
                  }
                  )}
                  </tbody>
          </Table>
            <ResultTable results={this.state.allResults.slice(2)} obs={this.refs.obs.value}
                          years={this.state.years}/>
            </div>
            :
            <h3 className='error'>No results of the selected combination</h3>
          }
            </div>
          }


        </div>

        </form>
        </div>
    );
  }
}
