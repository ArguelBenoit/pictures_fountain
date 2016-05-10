import React, { PropTypes } from 'react';

function Fountain(props){
  const {styleContainer} = props;
  return <div className="container" style={styleContainer} >
  </div>;
}

Fountain.propTypes = {
};
export default Fountain;