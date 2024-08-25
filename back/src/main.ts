import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getStorage } from 'firebase/storage';
import { config as dotenvConfig } from 'dotenv';
dotenvConfig({ path: '.env.development' });

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:5173',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
  });

  const config = new DocumentBuilder()
    .setTitle('Instituto Murasaki')
    .setDescription('Back end de la aplicacion web del Instituto de idioma japones Murasaki')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  const firebaseApp = initializeApp({
    apiKey: "AIzaSyA8pXClGU5pe7sp0GwYrX5czuwIuAX-Rv8",
    authDomain: "instituto-murasaki.firebaseapp.com",
    projectId: "instituto-murasaki",
    storageBucket: "instituto-murasaki.appspot.com",
    messagingSenderId: "985050160926",
    appId: "1:985050160926:web:576240b65d6510eff8b30f",
    measurementId: "G-SHKHSPX6FD"
  });
  const storage = getStorage(firebaseApp)
  

  await app.listen(3000);
}
bootstrap();
