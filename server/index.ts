import * as humps from 'humps'
import Koa from 'koa'
import middlewares from 'koa-mid'
import Router from 'koa-router'
import next from 'next'
import pino from 'koa-pino-logger'
import koaLogger from 'koa-logger'

const port = process.env.PORT || 3000
const dev = process.env.NODE_ENV !== 'production'

const getRandomString = () => Math.random().toString(36).slice(2)

const getRandomStrings = (): Array<string> =>
  Array.from({ length: 10 }, getRandomString)

const main = async () => {
  const nextApp = next({ dev })
  const app = new Koa()
  const router = new Router()

  await nextApp.prepare()

  const handle = nextApp.getRequestHandler()

  const renderNext = (route: string) => (ctx: Koa.Context) => {
    ctx.res.statusCode = 200
    ctx.respond = false

    nextApp.render(ctx.req, ctx.res, route, {
      // @ts-ignore
      ...((ctx.request && ctx.request.body) || {}),
      ...ctx.params,
      ...(ctx.query && humps.camelizeKeys(ctx.query)),
    })
  }

  router.get('/api/strings', async (ctx: Koa.Context) => {
    ctx.type = 'application/json'
    ctx.body = JSON.stringify(getRandomStrings())
  })

  router.get('/', renderNext('/'))

  if (dev) {
    app.use(koaLogger())
  } else {
    app.use(pino())
  }

  app.use(middlewares)
  app.use(router.routes())

  app.use(async (ctx: Koa.Context) => {
    ctx.respond = false
    handle(ctx.req, ctx.res)
  })

  app.listen(port, () => {
    // eslint-disable-next-line no-console
    console.log(`listening on ${port}`)
  })
}

main()
