import Koa from 'koa';
import { koaBody } from 'koa-body';
import Router from '@koa/router';
import cors from '@koa/cors';
import TicketStorage from './TicketStorage.js';

const app = new Koa();
const router = new Router();
const ticketStorage = new TicketStorage();

app
  .use(cors())
  .use(koaBody())
  .use(router.routes())
  .use(router.allowedMethods());

router.get('/', (ctx) => {
  switch (ctx.request.query.method) {
    case 'allTickets':
      ctx.body = ticketStorage.getAll();
      break;
    case 'ticketById':
      ctx.body = ticketStorage.get(ctx.request.query.id);
      break;
    default:
      ctx.throw(404, 'Not found');
  }
});

router.post('/', (ctx) => {
  switch (ctx.request.query.method) {
    case 'createTicket':
      ctx.body = ticketStorage.create(ctx.request.body);
      break;
    default:
      ctx.throw(404, 'Not found');
  }
});

router.patch('/', (ctx) => {
  switch (ctx.request.query.method) {
    case 'updateTicket':
      ctx.body = ticketStorage.update(ctx.request.query.id, ctx.request.body);
      break;
    default:
      ctx.throw(404, 'Not found');
  }
});

router.delete('/', (ctx) => {
  switch (ctx.request.query.method) {
    case 'deleteTicket':
      ticketStorage.delete(ctx.request.query.id);
      ctx.body = { status: 'ok' };
      break;
    default:
      ctx.throw(404, 'Not found');
  }
});

const PORT = process.env.PORT || 7070;

app.listen(PORT, (error) => {
  if (error) {
    console.log(error);
    return;
  }

  console.log(`Server is listening on port ${PORT}`);
});
