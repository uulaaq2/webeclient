import React, { useContext, useEffect } from 'react'
import config from 'config'

const index = (params) => { 
  const pagePath = params.pagePath.split('.')
  
  useEffect(() => {
    let page = config.urls
    for (let i=0; i < pagePath.length; i++ ) {
      page = page[pagePath[i]]
    }
    document.title = page.title + config.tSep + config.app.name        
  }, [])

};

export default index;