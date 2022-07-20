let config = {}

config.tokenExpiresIn = '14d'
config.showDevErrors = true
config.localStorageType = 'cookie'
config.tSep = ' | '
config.apiServerUrl = 'http://localhost:3002'

config.app = {
  name: 'IBOS'
}

config.urls = {}

config.urls = {
  protectedHome: {
    title: 'Welcome' + config.tSep + config.app.name,
    url: '/'
  },
  signIn: {
    title: 'Sign in',
    url: '/signin',
    apiUrl: config.apiServerUrl + '/signin'
  },
  publicHome: {
    title: 'Welcome ' + config.tSep + config.app.name,
    url: '/public'
  }
}
export default config