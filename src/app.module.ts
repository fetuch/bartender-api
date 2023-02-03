import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { DrinksController } from "./Drinks.controller";
import { TypeOrmModule } from "@nestjs/typeorm";
import { Drink } from "./drink.entity";

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: "mysql",
      host: "127.0.0.1",
      port: 3306,
      username: "root",
      password: "example",
      database: "bartender",
      entities: [Drink],
      synchronize: true,
    }),
    TypeOrmModule.forFeature([Drink]),
  ],
  controllers: [AppController, DrinksController],
  providers: [AppService],
})
export class AppModule {}
