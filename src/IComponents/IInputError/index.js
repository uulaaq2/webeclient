import React from 'react'
import { AlertIcon } from '@primer/octicons-react'

const IInputError = ({ message }) => {
  return (    
      <p className="note color-fg-danger anim-scale-in"><AlertIcon /> { message }</p>      
  );
};

export default IInputError;