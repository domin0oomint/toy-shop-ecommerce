import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { AppModule } from './app.module';
import { join } from 'path';
import session from 'express-session';
import livereload from 'livereload';
import connectLivereload from 'connect-livereload';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
  );

  // EJS
  app.setBaseViewsDir(
    join(__dirname, '..', 'views'),
  );

  app.setViewEngine('ejs');

  // Static files (CSS)
  // Static files (CSS)
app.useStaticAssets(
  join(__dirname, '..', 'public'),
);

// Static files (Payment Slips)
app.useStaticAssets(
  join(__dirname, '..', 'uploads'),
  {
    prefix: '/uploads/',
  },
);

  // Session
  app.use(
    session({
      secret: 'toy-shop-secret',
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 1000 * 60 * 60,
      },
    }),
  );
  // LiveReload
  if (process.env.NODE_ENV !== 'production') {

    const liveReloadServer = livereload.createServer();

    liveReloadServer.watch([
      join(__dirname, '..', 'views'),
      join(__dirname, '..', 'public'),
    ]);

    app.use(connectLivereload());
  }

  await app.listen(
    process.env.PORT ?? 3000,
  );
 
}

bootstrap();
