import React from 'react';
import _ from 'lodash';

//Displays stats about tables/checks given data

export default (props) => {

  const StatsObject = {tablesOpen: 0, totalTables: 0, tablesClosed: 0,
                       openChecks: 0, closedChecks: 0, totalChecks: 0};

    for(let id in props.checks){
       if(!props.checks[id].closed)
       StatsObject.openChecks++;
       else
       StatsObject.closedChecks++;

       StatsObject.totalChecks++;
  }

  _.map(props.tables, (singleTable) => {
    for(let id in props.checks)
    if(props.checks[id].tableId === singleTable.id && !props.checks[id].closed)
    StatsObject.tablesClosed++;

    StatsObject.totalTables++;
  });

  StatsObject.tablesOpen = StatsObject.totalTables - StatsObject.tablesClosed;
  return(
    <div>
      <p>{props.isTableView ? "Tables Open" : "Checks Open"}</p>
      <p className="StatsNumber">{props.isTableView ? StatsObject.tablesOpen : StatsObject.openChecks}</p>
      <hr/>
      <p>{"Total Tables"}</p>
      <h1>{StatsObject.totalTables}</h1>
      <p>{props.isTableView ? "Checks Open" : "Open Tables"}</p>
      <h1>{props.isTableView ? StatsObject.openChecks : StatsObject.tablesOpen}</h1>
      <p>{"Checks Closed"}</p>
      <h1>{StatsObject.closedChecks}</h1>
      <p>{"Total Checks"}</p>
      <h1>{StatsObject.totalChecks}</h1>
    </div>);

}
