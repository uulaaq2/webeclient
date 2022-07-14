import React from 'react'
import CStyles from './styles.css'

const ILoadingSpinner = ({ size }) => {
  let fontSize
  if (!size || size === 'normal' || size === '') {
    fontSize = '1rem'
  }
  
  if (size === 'xl') {
    fontSize = '3rem'
  }

  if (size  === 'lg') {
    fontSize = '2rem'
  }

  return (
    <div className={`${CStyles.spinner}`} style={{fontSize: fontSize}}>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>
      <div className={CStyles.spinnerBlade}></div>                              
    </div>
  
  );
};

export default ILoadingSpinner