import React from 'react';
import LoadingModule from './LoadingModule';

//dumb component handles displaying item list for an active check and closed checks(reusable)

export default (props) => {

  let itemObj = {};

  if(props.orderedItems)
  return props.orderedItems.map((singleItem) => {
    itemObj = props.items[singleItem.itemId];

    return (
      <li key={singleItem.dateCreated} className="list-group-item justify-content-between ordered-item-list">
            {itemObj ? itemObj.name + " (+ " + new Date(singleItem.dateCreated).toLocaleTimeString() + ")" : <span></span>}
            <span className="badge">
            <button className="btn btn-secondary"
            disabled={singleItem.voided}
            type="button"
            onClick={() => props.voidItemOnCheck(singleItem.id) }>{!singleItem.voided ? "Void Item" : "VOIDED"}</button>
            </span>
      </li> ); })
  else if(props.check)
  if(props.check.orderedItems && props.check.orderedItems.length !== 0){
  let index = 0;
  //add the tip and check to the end of the orderedItems array for new line display
  if(props.check.tax !== null){
  props.check.orderedItems.push( {"tax": round(props.check.tax, 2)} );
  props.check.orderedItems.push( {"tip": round(props.check.tip, 2)} );
  }
  return props.check.orderedItems.map((singleItem) => {
  index++;
  itemObj = props.items[singleItem.itemId];
      return (
        <li key={index} className="list-group-item justify-content-between ordered-item-list">
          {
          singleItem.hasOwnProperty('tax') ? "Tax: $" + singleItem.tax :
          singleItem.hasOwnProperty('tip') ? "Tip: $" + singleItem.tip :
          itemObj ? itemObj.name + " ($" + itemObj.price + ")" :
          <span></span>
          }
          <span className={singleItem.hasOwnProperty('voided') ? "badge badge-default badge-pill" : ""}>
          {singleItem.hasOwnProperty('voided') ? singleItem.voided ? "Voided" : "Not Voided" : <div></div>}
          </span>
        </li> );}) }
  else
  return(<div className="LoadingContainer"><LoadingModule text={"Loading Items"}/></div>);
else
return(<div>Choose a check to see Items</div>);

}

function round(n, digits) {
    if (digits === undefined)
        digits = 0;

    var multiplicator = Math.pow(10, digits);
    n = parseFloat((n * multiplicator).toFixed(11));
    n = (Math.round(n) / multiplicator).toFixed(2);
    return n;
}
