import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import passport from 'passport';
import morgan from 'morgan';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  });
  app.use(
    morgan(':method :url :status :res[content-length] - :response-time ms'),
  );
  app.use(passport.initialize());
  await app.listen(parseInt(process.env.PORT as string), () => {
    console.log('Server running on port 5000 ');
  });
}
bootstrap();
