import React from 'react';
import _ from 'lodash';

//Dumb Component that manages menu items list

export default (props) => {

    return _.map(props.items, (singleItem) => {
    return (
      <li key={singleItem.id} className="list-group-item justify-content-between item-list">
            {singleItem.name}
            <span className="badge">
            <button className="btn btn-secondary"
            type="button"
            onClick={() => props.addItemtoCheck(singleItem.id)}>Add Item [${singleItem.price}]</button>
            </span>
      </li>
    );
  })
}
