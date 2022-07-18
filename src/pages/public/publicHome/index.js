import AStyles from 'app/styles.css'
import React from 'react'
import useAppNavigate from 'hooks/useAppNavigate'
import IPageLoading from 'IComponents/IPageLoading';
import ILoading from 'IComponents/ILoading'

const PublicHome = () => {
  const appNavigate = useAppNavigate()

  return (
    <>
    <div className='d-flex flex-items-center flex-justify-center'>
      <button className={`btn btn-primary`} onClick={() => appNavigate('/signin') }>Sign in</button>
    </div>

   
    </>
  );
};

export default PublicHome;