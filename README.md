# order-router

### Install
npm install order-router --save

### How to use
```
const Router = require('./router.js');
const router = new Router();

router.use(async (ctx, next) => {
  console.log('first');
  next();
});

router.all('XT', 'XT1', async (ctx, next) => {
  console.log('xt');
  // next();
});

router.use(async (ctx, next) => {
  console.log('second');
});

router.routes('XT');
// If u use koa-compose
// output:
//    first
//    xt
```
