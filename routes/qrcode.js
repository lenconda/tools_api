const Router = require('koa-router')
const qrcode = require('qrcode')

const router = new Router({
  prefix: '/qrcode'
})

const generateBase64 = async (text, options) => await qrcode.toDataURL(text, options)

router.get('/:text', async (ctx, next) => {
  const text = Buffer.from(ctx.params.text, 'base64').toString()
  ctx.type = 'image/png'
  const { size, scale, margin } = ctx.query
  const data = await generateBase64(text, 
    {
      width: size,
      scale,
      margin
    }
  )
  ctx.body = Buffer.from(data.split(';base64,').pop(), 'base64')
  console.log(ctx.body)
  await next()
})

module.exports = router
