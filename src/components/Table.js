import React, { Component } from 'react';
import { CloseCheckforTable, openCheck, getChecks } from '../actions/index';
import { connect } from 'react-redux';
import Check from './Check';
import ChecksList from './ChecksList';

//Smart Component/HOC that can view closed checks for table,
//create and view open check, view menu and add items to open check.

class Table extends Component {
  constructor(props) {
    super(props);
    this.openCheck = this.openCheck.bind(this);
    this.closeCheck = this.closeCheck.bind(this);
    this.showClosedChecks = this.showClosedChecks.bind(this);
    this.state = { closedCheckView: true };
  }

  componentDidMount() {
    this.props.getChecks();
  }

  showClosedChecks() {
    if (this.state.closedCheckView) this.setState({ closedCheckView: false });
    else this.setState({ closedCheckView: true });
  }

  openCheck(tableid) {
    this.props.openCheck(tableid);
    this.showClosedChecks();
  }

  closeCheck(tableid, checkidToClose) {
    this.props.CloseCheckforTable(checkidToClose, this.props.getChecks);
    if (!this.state.closedCheckView) this.setState({ closedCheckView: true });
  }

  render() {
    const { tablenumber, tableid } = this.props.match.params;
    const { checks } = this.props;
    let activeCheckID = findActiveCheck(checks, tableid);
    return (
      <div className="Table">
        <div className="TableHeader">
          <button
            className="btn btn-secondary Purple pull-left"
            onClick={() => this.props.history.push('/')}
          >
            Back to Landing
          </button>
          <div className="btn-group pull-right">
            <button
              type="button"
              disabled={this.state.closedCheckView}
              className="btn btn-success Purple"
              onClick={() => this.showClosedChecks()}
            >
              Show Closed Checks
            </button>
            <button
              type="button"
              disabled={!this.state.closedCheckView || !activeCheckID}
              className={activeCheckID ? 'btn btn-success Purple' : 'btn btn-warning'}
              onClick={() => this.showClosedChecks()}
            >
              {activeCheckID ? 'Show Active Check' : 'No Active Check'}
            </button>
            {activeCheckID ? (
              <button
                className="btn btn-danger"
                onClick={() => this.closeCheck(tableid, activeCheckID)}
              >
                Close Check
              </button>
            ) : (
              <button
                className="btn btn-secondary Purple"
                onClick={() => this.openCheck(tableid)}
              >
                Open Check
              </button>
            )}
          </div>
        </div>
        <div className="TableData">
          <hr />
          <h3>Table {tablenumber}</h3>
        </div>
        {activeCheckID && !this.state.closedCheckView ? (
          <Check tablenumber={tablenumber} activeCheckID={activeCheckID} />
        ) : (
          <div />
        )}
        {this.state.closedCheckView ? (
          <div>
            <ul className="list-group">
              <ChecksList checks={checks} tableid={tableid} />
            </ul>
          </div>
        ) : (
          <div />
        )}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return { checks: state.checks };
}

function findActiveCheck(checks, tableid) {
  let activeCheckID = '';
  for (let id in checks) {
    if (checks[id].tableId === tableid && !checks[id].closed) activeCheckID = id;
  }
  return activeCheckID;
}

export default connect(mapStateToProps, {
  CloseCheckforTable,
  openCheck,
  getChecks,
})(Table);
