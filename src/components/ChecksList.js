import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchItems, fetchCheck } from '../actions/index';
import _ from 'lodash';
import CheckItemsList from './CheckItemsList';

//Smart Component/HOC that manages different check views

class CheckList extends Component {

    constructor(props){
      super(props);
      this.findOrderedItems = this.findOrderedItems.bind(this);
      this.state = {checkID: ""};
    }

    findOrderedItems(checkIDString){
      this.setState({checkID: checkIDString});
      this.props.fetchCheck(checkIDString);
    }

    componentDidMount(){
      this.props.fetchItems();
    }

    renderList(){

      //view all Closed checks(Landing)
      if(this.props.isCloseSorted && !this.props.tableid){
      let closedCheckList = _.map(this.props.checks, (check) => {
          if(check.closed) return check;
      });
      closedCheckList = _.without(closedCheckList, undefined);

      return _.map(closedCheckList, (check) => {

            let tableNumber = findTableNumber(this.props.tables, check);

            return (
              <li
              key={check.id}
              className={!check.closed ? "list-group-item justify-content-between list-group-item-available" :
              "list-group-item justify-content-between list-group-item-notAvailable"}>
                    {check.closed ? 'Table ' + tableNumber + ' (Closed)' : 'Table ' + tableNumber + ' (Open)'}
                    <span className="badge">
                    <button className="btn btn-secondary"
                    disabled={check.id === this.state.checkID}
                    type="button"
                    onClick={() => this.findOrderedItems(check.id) }>{check.id !== this.state.checkID ? "View Check" : "Viewing"}</button>
                    </span>
              </li> );
          });
        }

        //view all Open checks(Landing)
        if(this.props.isOpenSorted && !this.props.tableid){
        let openCheckList = _.map(this.props.checks, (check) => {
            if(!check.closed) return check;
        });
        openCheckList = _.without(openCheckList, undefined);

        return _.map(openCheckList, (check) => {

              let tableNumber = findTableNumber(this.props.tables, check);

              return (
                <li
                key={check.id}
                className={!check.closed ? "list-group-item justify-content-between list-group-item-available" :
                "list-group-item justify-content-between list-group-item-notAvailable"}>
                      {check.closed ? 'Table ' + tableNumber + ' (Closed)' : 'Table ' + tableNumber + ' (Open)'}
                      <span className="badge">
                      <button className="btn btn-secondary"
                      disabled={check.id === this.state.checkID}
                      type="button"
                      onClick={() => this.findOrderedItems(check.id) }>{check.id !== this.state.checkID ? "View Check" : "Viewing"}</button>
                      </span>
                </li> );
            });
          }

      //for landing page(ALL checks)
      return _.map(this.props.checks, (check) => {
            if(!this.props.tableid){
            let tableNumber = findTableNumber(this.props.tables, check);

                return (
                  <li
                  key={check.id}
                  className={!check.closed ? "list-group-item justify-content-between list-group-item-available" :
                  "list-group-item justify-content-between list-group-item-notAvailable"}>
                        {check.closed ? 'Table ' + tableNumber + ' (Closed)' : 'Table ' + tableNumber + ' (Open)'}
                        <span className="badge">
                        <button className="btn btn-secondary"
                        disabled={check.id === this.state.checkID}
                        type="button"
                        onClick={() => this.findOrderedItems(check.id) }>{check.id !== this.state.checkID ? "View Check" : "Viewing"}</button>
                        </span>
                  </li> ); }
            else //for Table.js view
              if(check.tableId === this.props.tableid && check.closed)
              return (
                <li
                key={check.id}
                className="list-group-item justify-content-between list-group-item-available">
                {"Closed on " + new Date(check.dateCreated).toLocaleDateString() + " at " +
                new Date(check.dateCreated).toLocaleTimeString()}
                <span className="badge">
                <button className="btn btn-secondary"
                disabled={check.id === this.state.checkID}
                type="button"
                onClick={() => this.findOrderedItems(check.id) }>{check.id !== this.state.checkID ? "View Check" : "Viewing"}</button>
                </span>
                </li> );
            });

    }

    render(){
      const {checks, items} = this.props;
      let check = checks[this.state.checkID];
      return(
            <div>
                <div className="ClosedChecks">
                  <h3>{this.props.isAllCheckView ? "All Checks" : "Closed Checks"}</h3>
                  <hr/>
                  {this.renderList()}
                </div>
                <div className="ClosedChecksItems">
                  <h3>Items on Check</h3>
                  <hr/>
                  <ul className="list-group">
                    <CheckItemsList items={items}  check={check}/>
                  </ul>
                </div>
            </div>);
    }
}

function mapStateToProps(state, ownProps) {
  return { items: state.items };
}

function findTableNumber(tables, check){

  let tableNumber = 0;

  for(let table in tables){
    if(tables[table].id === check.tableId)
    tableNumber = tables[table].number;
  }

  return tableNumber;
}

export default connect(mapStateToProps,{ fetchCheck, fetchItems })(CheckList);
