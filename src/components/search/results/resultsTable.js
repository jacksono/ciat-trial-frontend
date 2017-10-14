import React from 'react';
import ReactTable from 'react-table';
import "react-table/react-table.css";

const ResultTable = (props) => {
    console.log("toskcs", props.results[0])
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

    }
  )
  console.log("data", dataArray)
    const columns = [{
        id: 'year',
        Header: 'YEAR',
        accessor: d => Object.entries(d)[0][0].slice(7)
      },
      {
        id: 'plot',
        Header: 'PLOT',
        accessor: d => Object.values(d)[0]['plot']
      },
      {
        id: 'shortrains',
        Header: 'SHORT RAINS',
        accessor: d => Object.values(d)[0][props.obs][0].toFixed(2)
      },
      {
        id: 'longrains',
        Header: 'LONG RAINS',
        accessor: d => Object.values(d)[0][props.obs][1].toFixed(2)
      }
    ];

    return (
      <div>
        <div className="">
          <div className="">
            {2 > 0 ?
              <div>
                <h3>RESULTS </h3>
              <ReactTable
                className="-striped -highlight"
                data={dataArray}
                pageSize= {dataArray.length < 12 ? dataArray.length : 12}
                columns={columns}
              />
              </div>
            : 0 > 1 ? 'No Results Found' : ''
            }
          </div>
        </div>

      </div>
    );
}
export default ResultTable;
