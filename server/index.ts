import express, { Request, Response } from 'express'
import next from 'next'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'
const app = next({ dev })
const handle = app.getRequestHandler()

app
  .prepare()
  .then(() => {
    const server = express()

    server.get('/test', (req: any, res: any) => {
      res.send('hello')
      return app.render(req, res, '/test', req.query)
    })

    server.all('*', (req: Request, res: Response) => {
      return handle(req, res)
    })

    server.listen(port, (err?: any) => {
      if (err) throw err
      console.log(`> Ready on localhost:${port} - env ${process.env.NODE_ENV}`)
    })
  })
  .catch((error) => {
    console.error(error)
    process.exit(1)
  })
