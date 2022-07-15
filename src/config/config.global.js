let config = {}

config.tokenExpiresIn = '14d'
config.showDevErrors = true
config.localStorageType = 'cookie'
config.tSep = ' | '

config.app = {
  name: 'IBOS'
}

config.urls = {}

config.urls.api = {
  user: {
    signIn: {
      title: 'Sign in',
      path: 'http://localhost:3002/user/signin'
    } 
  }
}
export default config