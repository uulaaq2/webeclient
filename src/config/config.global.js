let config = {}

config.urls = {}
config.urls.api = {}
config.urls.api.user = {}

config.tokenExpiresIn = '14d'
config.showDevErrors = true
config.localStorageType = 'cookie'

config.urls.api.user.signIn = 'http://localhost:3002/user/signin'

export default config