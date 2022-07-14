
import React, { useEffect } from 'react'
import './styles.css'
import ILoadingSpinner from 'IComponents/ILoadingSpinner';
import signInWithCredentials from 'functions/user/signIn/signInWithCredentials'

const App = () => {

  useEffect(() => {
    console.log(process.env)
    const aaa = async () => {
      const bbb = await signInWithCredentials({
        emailAddress: 'muhittin.yendun@au.indorama.net',
        password: '111'
      })

      console.log(bbb)
    }

    aaa()
  }, [])

  return (
      <ILoadingSpinner size='xl' />
  );
};

export default App