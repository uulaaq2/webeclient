import React from 'react'
import CStyles from './styles.css'

const ILoadingSpinner = ({ size, center = false, color = 'var(--color-accent-fg)', delay = '0.8s', style = {}, ...rest }) => {
  let fontSize
  fontSize = '1rem'
  
  if (size === 'xl') {
    fontSize = '3rem'
  }

  if (size  === 'lg') {
    fontSize = '2rem'
  }

  if (size  === 'sm') {
    fontSize = '0.5rem'
  }


  let spinnerStyle = {
    ...style,
    ['--spinner-blade-color']: color,
    ['--spinner-fade-in-delay']: delay,
    fontSize
  }

  return (
    <div className={`${CStyles.spinner} ${center ? CStyles.center : ''}`} style={spinnerStyle} {...rest}>
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