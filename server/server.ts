import App from './app'
import configContainer from './config'

const appConfig = configContainer.resolve('appConfig')

const app: App = new App(appConfig)

app.startup()
app.listen()