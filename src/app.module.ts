import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DrinksController } from './Drinks.controller';

@Module({
  imports: [],
  controllers: [AppController, DrinksController],
  providers: [AppService],
})
export class AppModule {}
