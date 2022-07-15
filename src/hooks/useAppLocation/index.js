import { useLocation, useParams } from 'react-router-dom';

const useAppLocation = () => {
  const location = useLocation();
  const params = useParams();

  let pathWithoutParams = Object.values(params).reduce(
      (path, param) => path.replace('/' + param, ''),
      location.pathname,
  )
  
  if (pathWithoutParams.length > 1) {
    if (pathWithoutParams.charAt(0) === '/') {
      pathWithoutParams = pathWithoutParams.substring(1)
    }

    if (pathWithoutParams.charAt(pathWithoutParams.length - 1) === '/') {
      pathWithoutParams = pathWithoutParams.substring(0, pathWithoutParams.length - 1)
    }
  }
  
  if (pathWithoutParams === '/' || pathWithoutParams === '') {
    return {
      pieces: ['/'],
      fullPath: '/'
    }
  }

  const pieces = pathWithoutParams.split('/') 
  
  for (let i=0; i < pieces.length; i++) {
    pieces[i] = '/' + pieces[i]
  }

  return {
    pieces: pieces,
    fullPath: '/' + pathWithoutParams
  }
}

export default useAppLocation