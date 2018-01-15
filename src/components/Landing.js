import React, { Component } from 'react';
import { fetchChecks, fetchTables} from '../actions/index';
import { connect } from 'react-redux';
import ChecksList from './ChecksList';
import TablesList from './TablesList';
import StatDisplay from './StatDisplay';

//High Order Component that passes data downward
//Manages views for open tables, open checks, closed checks
//Only portal to the table.js view
//Does NOT allow adding menu items to open check nor creating one

class Landing extends Component{

  constructor(props){
    super(props);
    this.state = {isTableView: true, sortedAll: true, sortedClosed: false, sortedOpen: false};
    //bind early(optimization)
    this.showTableView = this.showTableView.bind(this);
    this.sortedOpen = this.sortedOpen.bind(this);
    this.sortedClosed = this.sortedClosed.bind(this);
    this.sortedAll = this.sortedAll.bind(this);
  }

  showTableView(){
    if(!this.state.isTableView){
    this.setState({isTableView: true, sortedAll: this.state.sortedAll,
                  sortedClosed: this.state.sortedClosed, sortedOpen: this.state.sortedOpen});}
    else{
    this.setState({isTableView: false, sortedAll: this.state.sortedAll,
                  sortedClosed: this.state.sortedClosed, sortedOpen: this.state.sortedOpen});}
  }

  sortedOpen(){
    this.setState({isTableView: this.state.isTableView, sortedAll: false, sortedClosed: false, sortedOpen: true});
  }

  sortedClosed(){
    this.setState({isTableView: this.state.isTableView, sortedAll: false, sortedClosed: true, sortedOpen: false});
  }

  sortedAll(){
    this.setState({isTableView: this.state.isTableView, sortedAll: true, sortedClosed: false, sortedOpen: false});
  }

  componentDidMount(){
    this.props.fetchChecks();
    this.props.fetchTables();
  }

  render(){
    const {tables, checks} = this.props;
    return(
          <div className="Landing">
            <div className="btn-group" role="group" aria-label="Trigger View">
              <button
                disabled={this.state.isTableView}
                onClick={this.showTableView} type="button"
                className={this.state.isTableView ? "btn btn-secondary active-btn" : "btn btn-secondary not-active-btn"}>Tables</button>
              <button
              disabled={!this.state.isTableView}
              onClick={this.showTableView} type="button"
              className={!this.state.isTableView ? "btn btn-secondary active-btn" : "btn btn-secondary not-active-btn"}>Checks</button>
            </div>
            {!this.state.isTableView ?
              <div>
              <h6>Sort Checks By</h6>
              <div className="btn-group" role="group" aria-label="Trigger View">
                <button
                  disabled={this.state.sortedOpen}
                  onClick={this.sortedOpen} type="button"
                  className={this.state.sortedOpen ? "btn btn-secondary active-btn" : "btn btn-secondary not-active-btn"}>Open</button>
                <button
                  disabled={this.state.sortedAll}
                  onClick={this.sortedAll} type="button"
                  className={this.state.sortedAll ? "btn btn-secondary active-btn" : "btn btn-secondary not-active-btn"}>All</button>
                <button
                  disabled={this.state.sortedClosed}
                  onClick={this.sortedClosed} type="button"
                  className={this.state.sortedClosed ? "btn btn-secondary active-btn" : "btn btn-secondary not-active-btn"}>Closed</button>
                  </div>
              </div> : <span></span>}
            <div className={this.state.isTableView ? "View" : "WideView"}>
              <ul className="list-group">
                {this.state.isTableView ? <TablesList tables={tables} checks={checks}/> :
                <ChecksList
                isOpenSorted={this.state.sortedOpen}
                isCloseSorted={this.state.sortedClosed}
                isAllSorted={this.state.sortedAll}
                isAllCheckView={true}
                tables={tables}
                checks={checks} />}
              </ul>
            </div>
            <div className="Stats">
              {this.state.isTableView ? <StatDisplay checks={checks} tables={tables} isTableView={this.state.isTableView}/> : <span></span>}
            </div>
          </div>
          );
  }

}

function mapStateToProps(state) {
  return { checks: state.checks,
           tables: state.tables
         };
}

export default connect(mapStateToProps,{ fetchChecks, fetchTables })(Landing);
