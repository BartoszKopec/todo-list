const Router = require('@koa/router')

const router = new Router({ prefix: '/api/users' })

router.get('/', async (ctx) => {
  ctx.status = 501
})

router.post('/', async (ctx) => {
  ctx.status = 501
})

module.exports = router