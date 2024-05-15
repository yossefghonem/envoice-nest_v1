import { NestFactory } from '@nestjs/core';
import { Logger } from '@nestjs/common';
import { AppModule } from './app.module';
import * as morgan from 'morgan';
// import * as session from 'express-session';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  console.log('process.env.db_host', process.env.DB_HOST);

  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.enableCors({
    origin: '*',
  });

  app.use(morgan('dev'));

  const PORT = process.env.PORT || 3000;
  const config = new DocumentBuilder()
    .setTitle('Invoices')
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  // app.use(
  //   session({
  //     // store: new RedisStore({ client: redisClient }),
  //     secret: 'secret',
  //     resave: true,
  //     saveUninitialized: true,
  //   }),
  // );
  // app.use(passport.initialize());
  // app.use(passport.session());

  await app.listen(PORT, () => {
    Logger.verbose(`envoice server started at ${PORT}`, 'server');
    Logger.verbose(`http://localhost:${PORT}/api`, 'swagger');
  });
}

bootstrap();

