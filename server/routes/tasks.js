const Router = require('@koa/router')
const router = new Router({ prefix: '/api/tasks' })
const store = require('../store')

router.get('/', async (ctx) => {
  ctx.response.body = await store.listTasks()
})

router.post('/', async (ctx) => {
  var task = ctx.request.body
  if(task.title != ''){
    await store.addTask(ctx.request.body)
    console.log('addtask - post')
    ctx.status = 200
  }
  else{
    ctx.status = 400
  }
})

router.delete('/', async (ctx) => {
  await store.deleteTask(ctx.request.query)
  ctx.status = 200
})

module.exports = router