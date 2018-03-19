import React, { Component } from 'react';
import {
  addMenuItem,
  fetchCheck,
  voidMenuItem,
  fetchItems,
  getCheck,
} from '../actions/index';
import { connect } from 'react-redux';
import MenuItem from './MenuItem';
import CheckItemsList from './CheckItemsList';

//High order component for view specific check Contents
//passes data downward

class Check extends Component {
  constructor(props) {
    super(props);
    this.addItemtoCheck = this.addItemtoCheck.bind(this);
    this.voidItemOnCheck = this.voidItemOnCheck.bind(this);
  }

  componentDidMount() {
    this.props.getCheck(this.props.activeCheckID);
    this.props.fetchItems();
  }

  addItemtoCheck(menuItemID) {
    const { activeCheckID } = this.props;
    this.props.addMenuItem(activeCheckID, menuItemID, () =>
      this.props.getCheck(activeCheckID)
    );
  }

  voidItemOnCheck(menuItemID) {
    const { activeCheckID } = this.props;
    this.props.voidMenuItem(activeCheckID, menuItemID, () =>
      this.props.getCheck(activeCheckID)
    );
  }

  render() {
    const { activeCheck, items } = this.props;
    const { orderedItems } = activeCheck;
    if (!activeCheck) return <h2> Loading Check Contents </h2>;
    else
      return (
        <div className="Check">
          <div className="CheckDetails">
            <h6>
              Opened on{' '}
              <span>{new Date(activeCheck.dateCreated).toLocaleDateString() + ' '}</span>
              at <span>{new Date(activeCheck.dateCreated).toLocaleTimeString()}</span>
            </h6>
            <h6>
              {'Last Updated: ' + new Date(activeCheck.dateUpdated).toLocaleTimeString()}
            </h6>
          </div>
          <div className="Menu">
            <h3>Menu Items</h3>
            <hr />
            <ul className="list-group">
              <MenuItem items={items} addItemtoCheck={this.addItemtoCheck} />
            </ul>
          </div>
          <div className="CheckItems">
            <h3>Ordered Items</h3>
            <hr />
            {orderedItems && orderedItems.length > 0 ? (
              <ul className="list-group">
                <CheckItemsList
                  items={items}
                  orderedItems={orderedItems}
                  voidItemOnCheck={this.voidItemOnCheck}
                />
              </ul>
            ) : (
              <h3>No Ordered Items</h3>
            )}
          </div>
        </div>
      );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    activeCheck: state.checks[ownProps.activeCheckID],
    items: state.items,
  };
}

export default connect(mapStateToProps, {
  addMenuItem,
  voidMenuItem,
  fetchItems,
  getCheck,
})(Check);
