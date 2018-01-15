import React, { Component } from 'react';
import { connect } from 'react-redux';
import {clearMessage} from '../actions/index';

//Handles notifying user when a async req failed

class MessageBar extends Component {

  constructor(props){
    super(props);
    this.clearMessages = this.clearMessages.bind(this);
  }

  clearMessages(){
    setTimeout(() => {this.props.clearMessage()}, 2000);
  }

  renderBar()
  {
      let divclassName = '';
      let spanclassName = '';
      if(this.props.error) {

        if(this.props.error.message !== "Empty")
        {
              this.clearMessages();

              if(this.props.error.message.includes("Error")) {
                divclassName = "BarMessage error Shown";
                spanclassName= "fa fa-exclamation btn-space Shown"
              }
        }
        else {
          divclassName = "BarMessage success Hidden";
          spanclassName= "fa fa-hand-spock-o btn-space Hidden"
        }

      return (
        <div className={divclassName}>
          <span className={spanclassName} aria-hidden="true"> </span>
          {this.props.error ? this.props.error.message : ""}
        </div>
      );

      }
    else {
      return (
          <div></div>
      );
    }
  }

  render() {
    return (
      <div>
      {this.renderBar()}
      </div>
    );
  }
}

function mapStateToProps(state) {
  return {error: state.error };
}


export default connect(mapStateToProps, {clearMessage})(MessageBar);
