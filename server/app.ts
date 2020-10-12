import express, { Application, Request, Response } from 'express'
import next from 'next'
// import configContainer from './config'

class App {
  private server: Application
  private appConfig: any

  constructor(appConfig) {
    this.server = express()
    this.appConfig = appConfig
  }

  public startup() {
    const dev: boolean = this.appConfig.environment !== 'production'
    const app: any = next({ dev })
    const handle = app.getRequestHandler()
    app
      .prepare()
      .then(() => {
        this.server.get('/test', (req: any, res: any) => {
          res.send('hello')
          return app.render(req, res, '/test', req.query)
        })
        this.server.all('*', (req: Request, res: Response) => handle(req, res))
        this.listen()
      })
      .catch((error) => {
        console.error(error)
        process.exit(1)
      })
  }

  private listen() {
    this.server.listen(this.appConfig.port, () => {
      console.log(`App listening on the http://localhost:${this.appConfig.port}`)
    })
  }
}

export default App;





// const {port, environment} = configContainer.resolve('appConfig')
// const dev = environment !== 'production'
// const app = next({ dev })
// const handle = app.getRequestHandler()
//
// app
//   .prepare()
//   .then(() => {
//     const server = express()
//
//     server.get('/test', (req: any, res: any) => {
//       res.send('hello')
//       return app.render(req, res, '/test', req.query)
//     })
//
//     server.all('*', (req: Request, res: Response) => handle(req, res))
//
//     server.listen(port, (err?: any) => {
//       if (err) throw err
//       console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
//     })
//   })
//   .catch((error) => {
//     console.error(error)
//     process.exit(1)
//   })
