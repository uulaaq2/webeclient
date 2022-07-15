import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'

const useAppNavigate = () => {
  const navigate = useNavigate()

  function doNavigate(goTo) {
    return navigate(goTo)
  }

  return doNavigate
};

export default useAppNavigate