import App from './app'
import configContainer from './config'

const app: App = new App({configContainer})
app.startup();