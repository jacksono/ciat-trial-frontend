import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const ResultTable = (props) => {
    let dataArray = [];
    props.results.map((data) => {
      if(props.years.length > 0){
        if(props.years.includes(Object.entries(data)[0][0].slice(7))){
          dataArray.push(data)
        }
      }
      else if(Object.entries(data)[0][0].includes("Results")){
        dataArray.push(data)
      }

    });
    console.log("rtable", Object.values(Object.values(props.results[0])[0]))
    let combination = Object.values(Object.values(props.results[0])[0])

    const columns = [
      {
      id: 'trial',
      Header: 'TRIAL',
      accessor: d => "INM3"
      },
      {
        id: 'year',
        Header: 'YEAR',
        accessor: d => Object.entries(d)[0][0].slice(7)
      },
      {
      id: 'obs',
      Header: 'OBSERVATION',
      accessor: d => props.obs
      },
      {
        id: 'plot',
        Header: 'PLOT',
        accessor: d => Object.values(d)[0]['plot']
      },
      {
      id: 'rep',
      Header: 'REPETITION',
      accessor: d => combination[0]
      },
      {
      id: 'rot',
      Header: 'ROTATION',
      accessor: d => combination[4]
      },
      {
      id: 'fym',
      Header: 'FYM',
      accessor: d => combination[2]
      },
      {
      id: 'np',
      Header: 'N / P',
      accessor: d => combination[1] + " / " + combination[3]
      },

      {
        id: 'shortrains',
        Header: 'SR',
        accessor: d => isNaN(Object.values(d)[0][props.obs][0]) ? Object.values(d)[0][props.obs][0] : Object.values(d)[0][props.obs][0].toFixed(2)
      },
      {
        id: 'longrains',
        Header: 'LR',
        accessor: d => isNaN(Object.values(d)[0][props.obs][1]) ? Object.values(d)[0][props.obs][1] : Object.values(d)[0][props.obs][1].toFixed(2)
      }
    ];

    return (
      <div>
        <div className="">
          <div className="">
              <div>
                <h3>Results</h3>
              <ReactTable
                className="-striped -highlight"
                data={dataArray}
                pageSize= {dataArray.length < 12 ? dataArray.length + 1 : 12}
                columns={columns}
                showPageSizeOptions={false}
              />
              </div>
              <div className='form-group buttons-next'>
                <div className='col-sm-3 marg-center'>
                <input className='btn btn-success form-control'
                        name='edit'
                        type='button'
                        value='SEARCH FOR ANOTHER COMBINATION'
                        onClick={props.clear}
                    />
                </div>

            </div>
          </div>
        </div>

      </div>
    );
}
export default ResultTable;
