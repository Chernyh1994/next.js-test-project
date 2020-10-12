import { asClass, InjectionMode, createContainer } from 'awilix'

import AppConfig from './app.config'
import DatabaseConfig from './database.config'

interface IConfig {
  appConfig: AppConfig
  databaseConfig: DatabaseConfig
}

const container = createContainer<IConfig>({
  injectionMode: InjectionMode.CLASSIC,
})

const configContainer = container.register({
  appConfig: asClass(AppConfig),
  databaseConfig: asClass(DatabaseConfig),
})

export default configContainer