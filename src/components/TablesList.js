import React from 'react';
import _ from 'lodash';
import { Link } from 'react-router-dom';


//dumb component that handles displaying what tables are available

export default (props) => {

  return _.map(props.tables, (singleTable) => {
        let isTableAvailable = true;

        //see if table has a check open, if so, table is unavailable
        for(let id in props.checks){
           if(props.checks[id].tableId === singleTable.id && !props.checks[id].closed)
            isTableAvailable = false;
        }

        return (
            <Link key={singleTable.id} to={`/table/${singleTable.number}/${singleTable.id}/`}>
                <li className={isTableAvailable ? "list-group-item justify-content-between list-group-item-available" :
                "list-group-item justify-content-between list-group-item-notAvailable"}>
                  {"Table " + singleTable.number}
                  <span className="badge badge-default badge-pill">{isTableAvailable ? "Available" : "Check Open"}</span>
                </li>
            </Link>
        );
      })
}
