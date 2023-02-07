import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ["error", "warn", "debug", "log"],
  });
  app.useGlobalPipes(new ValidationPipe());
  await app.listen(Number.parseInt(process.env.APP_PORT, 10));
}
bootstrap();
