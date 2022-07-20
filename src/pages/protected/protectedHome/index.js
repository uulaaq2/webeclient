import React, { useContext, useEffect } from 'react'
import useAppNavigate from 'hooks/useAppNavigate/index';

const ProtectedHome = () => {
  const appNavigate = useAppNavigate()
  return (
    <>
      <div>Protected Home</div>
      <button onClick={() => appNavigate('signin') }>Sign in</button>
    </>
  )
};

export default ProtectedHome;