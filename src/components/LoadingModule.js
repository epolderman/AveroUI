import React from 'react';

//loading module

export default (props) => {

  return(
    <div className="loadingModule">
      <span className="fa fa-refresh fa-spin fa-3x fa-fw" aria-hidden="true"></span>
      <h6>{props.text}</h6>
    </div>
  )

}
