import React, { useState, useContext } from 'react'
import config from 'config'


import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'
import { ArrowUpIcon, ArrowDownIcon } from '@primer/octicons-react'

const IFormError = ({ errorObj }) => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)    
  const [showDetails, setShowDetails] = useState(false)
  return (
    <>
      <div className="flash mt-3 flash-error d-flex flex-items-start flex-justify-between py-2 px-2 overflow-hidden full-width">
        <div className='d-flex flex-items-start'>
          <svg className="octicon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path d="M5.75 7.5a.75.75 0 01.75.75v1.5a.75.75 0 01-1.5 0v-1.5a.75.75 0 01.75-.75zm5.25.75a.75.75 0 00-1.5 0v1.5a.75.75 0 001.5 0v-1.5z"></path><path fillRule="evenodd" d="M6.25 0a.75.75 0 000 1.5H7.5v2H3.75A2.25 2.25 0 001.5 5.75V8H.75a.75.75 0 000 1.5h.75v2.75a2.25 2.25 0 002.25 2.25h8.5a2.25 2.25 0 002.25-2.25V9.5h.75a.75.75 0 000-1.5h-.75V5.75a2.25 2.25 0 00-2.25-2.25H9V.75A.75.75 0 008.25 0h-2zM3 5.75A.75.75 0 013.75 5h8.5a.75.75 0 01.75.75v6.5a.75.75 0 01-.75.75h-8.5a.75.75 0 01-.75-.75v-6.5z"></path></svg>           
          { errorObj.user?.message }
        </div>
          { (config.showDevErrors || state.context.userInfo?.globalAdmin)  &&
            <button className="btn btn-sm" onClick={() => setShowDetails(!showDetails)}>
              { showDetails ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} /> }
            </button>
          }
      </div>
      { showDetails &&
        <div>
          { JSON.stringify(errorObj, null, 2) }
        </div>
      }
    </>
  );
};

export default IFormError;