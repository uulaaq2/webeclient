import React, { useContext } from 'react'
import config from 'config'

import { GlobalStateContext } from 'state/globalState'
import { useActor } from '@xstate/react'

const IPageLoadError = ({ errorObj }) => {
  const globalServices = useContext(GlobalStateContext)  
  const [ state  ] = useActor(globalServices.authService)    

  return (
    <div class="container-lg clearfix full-height p-5 d-flex flex-justify-center flex-column">
      <h1>Error while loading page</h1>
      <div class="flash mt-3 flash-warn">
        { errorObj.message }
        { (config.showDevErrors || state.context.userInfo?.globalAdmin)  &&
          <div className='mt-3 width-full overflow-hidden'>         
            { JSON.stringify(errorObj, null, 2) }
          </div>
        }
      </div>
    </div>
  );
};

export default IPageLoadError;