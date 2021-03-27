const Koa = require('koa');
const Router = require('@koa/router');
const cors = require('koa2-cors');

const app = new Koa();
const router = new Router();

const { getNews } = require('./src/spider/index');
const { REGION } = require('./src/constant');

Object.keys(REGION).forEach(path => {
  const area = REGION[path];

  router.get(`/api/${area}`, async (ctx) => {
    let result;
    try {
      const data = await getNews(area);
      result = { status: 'ok', data };
    } catch (e) {
      let error = typeof e === 'object' && typeof e.message !== 'undefined' ? e : { message: `${e}` };

      result = { status: 'error', ...error };
    };

    ctx.res.setHeader('Content-Type', 'application/json');
    ctx.body = JSON.stringify(result);
  });
});

app.use(cors({
  origin: ['http://dev.ele.me', 'https://hwaphon.gitee.io/'],
  credentials: true,
  maxAge: 5,
  credentials: true,
}));
app.use(router.routes());

app.listen(process.env.PORT || 5000);