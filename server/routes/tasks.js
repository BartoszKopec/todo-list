const Router = require('@koa/router')

const router = new Router({ prefix: '/api/tasks' })

router.get('/', async (ctx) => {
  ctx.status = 501
})

router.post('/', async (ctx) => {
  ctx.status = 501
})

router.delete('/', async (ctx) => {
  ctx.status = 501
})

module.exports = router