import CStyles from './styles.css'
import React from 'react'

const IPageLoading = () => {
  return (
    <div className={CStyles.spinner}>    
      <div className={`${CStyles.spinnerSector} ${CStyles.spinnerSectorRed}`}></div>
      <div className={`${CStyles.spinnerSector} ${CStyles.spinnerSectorBlue}`}></div>
      <div className={`${CStyles.spinnerSector} ${CStyles.spinnerSectorGreen}`}></div>
    </div>
  )
}

export default IPageLoading