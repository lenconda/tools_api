const Router = require('koa-router')
const qrcode = require('qrcode')

const router = new Router({
  prefix: '/qrcode'
})

const generateBase64 = async text => await qrcode.toDataURL(text)

router.get('/:text', async (ctx, next) => {
  const text = Buffer.from(ctx.params.text, 'base64').toString()
  ctx.body = await generateBase64(text)
  await next()
})

module.exports = router
