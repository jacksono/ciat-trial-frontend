
import React from 'react';
import {Link, IndexLink} from 'react-router';
import { Table } from 'reactstrap';
import apiCall from './apiHelper';
import ResultTable from './resultsTable';
import { Modal, ModalHeader, ModalBody, ModalFooter } from 'react-bootstrap';

export default class ResultsPage extends React.Component {
  constructor(props) {
      super(props);
      this.state = {
        editValues: {},
        allResults: [],
        plot_num:'',
        hasResults: false,
        searched: false,
        observation:'',
        error: '',
        errorObservation:'',
        years: [],
        dataOptions: ["Select Rotation First"],
        showModal: false
      };

      this.handleChange = this.handleChange.bind(this);
      this.handleSearch = this.handleSearch.bind(this);
      this.handleClear = this.handleClear.bind(this);
      this.select = this.select.bind(this);
      this.getOptions = this.getOptions.bind(this);
      this.nextSearch = this.nextSearch.bind(this);
      this.toggle = this.toggle.bind(this);

    }

  componentDidMount(){
    $('.selectpicker').selectpicker();
    }

  select(event){
    let targets = [];
    $.each($(".selectpicker option:selected"), function(){
    targets.push($(this).val());
    });
    this.setState({years: targets})
  }

  toggle() {
  this.setState({
    showModal: !this.state.showModal
  });
}

  handleChange(event) {
    const { name, value } = event.target;
    if(name === 'rot'){
    this.getOptions()
    }
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
    }, function(){
        $('.selectpicker').selectpicker();
    });
  }

  handleClear() {
    this.setState({ editValues:{rep:'...',
                                rot:'...',
                                fym:'...',
                                nitro:'...',
                                phos:'...',
                                res:'...',
                                year:'...',
                                obs:'Select Rotation First',
                                season:''},
                      plot_num:'',
                      hasResults:false,
                      searched:false,
                      error : '',
                      errorObservation:''

                    });
                  }

  nextSearch() {
    this.setState({ editValues:{rep:'...',
                                rot:'...',
                                fym:'...',
                                nitro:'...',
                                phos:'...',
                                res:'...',
                                year:'...',
                                obs:'Select Rotation First',
                                season:'',
                                trial:"INM3"},
                      plot_num:'',
                      hasResults:false,
                      searched:false,
                      error : '',
                      errorObservation:''

                    });
                  }

  handleSearch(event) {
    event.preventDefault()
    this.setState({
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
      this.setState({ error: 'ERROR: All selections are required'
      })
    }
    if(!error){
      this.setState({showModal: true})
    apiCall(null, 'get', 'results/combination?res='+res+'&f='+fym+'&n='+nitro+'&p='+phos+'&rep='+rep+'&rot='+rot)
    .then((response) => {
      this.setState({searched: true})
      if(response){
        if(response.message){
          this.setState({showModal: false});
        }
        else{
        this.setState({hasResults: true, allResults: response, showModal: false});
      }}
      }).catch(error => (error));
      }
    }

  getOptions(){
    let data = []
    if(this.refs.rot.value === 'M-M'){
      data = ["...", "Maize_Y", "Maize_AGB"]
    }
    else if(this.refs.rot.value === 'M-T' || this.refs.rot.value === 'T-M'){
      data = ["...", "Maize_Y", "Maize_AGB","Teph_AGB"]
    }
    else if(this.refs.rot.value === 'Intercr'){
      data = ["...", "Maize_Y", "Maize_AGB", "Soy_Y", "Soy_AGB"]
    }
    this.setState({dataOptions : data })
  }

  render() {
    console.log("STATE", this.state)
    return (
        <div>
        <form className='form-horizontal'>
            <div className='form-group'>
              <select
                className="form-control select-category-header marg-center"
                ref="trial"
                name="trial"
                value={this.state.editValues.trial}
                onChange={this.handleChange}
                style={{ width: '100px' }}
              >
                {
                  ["-- select trial --", "INM3", "Other"].map(option => (
                    <option key={option} value={option}>{option}</option>
                  ))
                }
              </select>
              </div>
              <Modal show={this.state.showModal} toggle={this.toggle} className="">
              <ModalFooter toggle={this.toggle}><h3 className="text-group" >Loading Results... </h3></ModalFooter>
              <ModalBody>
              <img className="modal-center" src="https://upload.wikimedia.org/wikipedia/commons/b/b1/Loading_icon.gif"/>
              </ModalBody>
              </Modal>

            { this.state.editValues.trial === "INM3"  ?
            <div className='table-div' >
              <div className='form-group'>
              <h3 className="text-group"> Select Combination </h3>
                <label className='control-label col-sm-2'> RESIDUE </label>
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
                  <label className='control-label col-sm-1 '> ROTATION </label>
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
                  <label className='control-label col-sm-1 '> REPETITION </label>
                  <div className='col-sm-1'>
                    <select
                      className="form-control select"
                      name="rep"
                      ref="rep"
                      value={this.state.editValues.rep}
                      onChange={this.handleChange}
                      style={{ width: '100px' }}
                    >
                      {
                        ["...", 1, 2, 3, 4].map(option => (
                          <option key={option} value={option}>{option}</option>
                        ))
                      }
                    </select>
                  </div>
                </div>

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
                <div className='form-group'>
                  <label className='control-label col-sm-1 '> PHOSPHATE </label>
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
                  <label className='control-label col-sm-1 '> FYM </label>
                  <div className='col-sm-1'>
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

              <div className='form-group'>
                <hr />
                <label className='control-label col-sm-3 text-group'> Select Observation </label>
                <div className='col-sm-3'>
                <select
                  className="form-control select"
                  name="obs"
                  ref="obs"
                  value={this.state.editValues.obs}
                  onChange={this.handleChange}
                >
                  {
                    this.state.dataOptions.map(option => (
                      <option key={option} value={option}>{option}</option>
                    ))
                  }
                </select>
                </div>

                <div className='form-group'>
                  <label className='control-label col-sm-2 text-group'> Select Years </label>
                  <div className='col-sm-1'>
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
                  </div>
                </div>
              </div>

              <hr/>

            {!this.state.searched &&
            <div className='form-group buttons'>
              <div className='col-sm-2 marg-center'>
              <input className='btn btn-success form-control'
                      name='edit'
                      type='button'
                      value='SEARCH'
                      onClick={this.handleSearch}
                  />
              </div>
              <div className='col-sm-2'>
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
          {this.state.allResults.length > 0 ?
            <div>
            <ResultTable results={this.state.allResults.slice(1)} obs={this.refs.obs.value}
                          years={this.state.years} clear={this.nextSearch}/>
            </div>
            :
            <h3 className='error'>No results of the selected combination</h3>
          }
            </div>
          }


        </div>
        : this.state.editValues.trial !== "Other" ? "" : <h3 className=" error category-header"> No data for that trial yet</h3> }

        </form>
        </div>
    );
  }
}
