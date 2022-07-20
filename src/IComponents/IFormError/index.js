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
          <svg className="octicon" style={{marginTop: '0.1em'}} xmlns="http://www.w3.org/2000/svg" viewBox="0 0 16 16" width="16" height="16"><path fillRule="evenodd" d="M8.22 1.754a.25.25 0 00-.44 0L1.698 13.132a.25.25 0 00.22.368h12.164a.25.25 0 00.22-.368L8.22 1.754zm-1.763-.707c.659-1.234 2.427-1.234 3.086 0l6.082 11.378A1.75 1.75 0 0114.082 15H1.918a1.75 1.75 0 01-1.543-2.575L6.457 1.047zM9 11a1 1 0 11-2 0 1 1 0 012 0zm-.25-5.25a.75.75 0 00-1.5 0v2.5a.75.75 0 001.5 0v-2.5z"></path></svg>
          { errorObj.message }
        </div>
          { (config.showDevErrors || state.context.userInfo?.globalAdmin)  &&
            <button className="btn btn-sm" onClick={() => setShowDetails(!showDetails)}>
              { showDetails ? <ArrowUpIcon size={16} /> : <ArrowDownIcon size={16} /> }
            </button>
          }
      </div>
      { showDetails &&
        <div className='mt-3 width-full overflow-hidden'>         
          { JSON.stringify(errorObj, null, 2) }
        </div>
      }
    </>
  );
};

export default IFormError;