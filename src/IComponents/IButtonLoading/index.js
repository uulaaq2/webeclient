import CStyle from './styles.css'
import React, { useState, useEffect } from 'react'

const IButtonLoading = ({ delay = 1000 }) => {
  const [show, setShow] = useState(false)

  useEffect(() => {
    setTimeout(() => {
      setShow(true)
    }, (delay));
  }, [])

  return (   
    <>
      { show && <span className={`AnimatedEllipsis ${CStyle.loading}`}></span> }
    </> 
  );
};

export default IButtonLoading;