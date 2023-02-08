import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { CategoriesModule } from "./categories/categories.module";
import { DrinksModule } from "./drinks/drinks.module";
import { ConfigModule } from "@nestjs/config";
import ormConfig from "./config/orm.config";
import ormConfigProd from "./config/orm.config.prod";
import { IngredientsModule } from "./ingredients/ingredients.module";
import { AuthModule } from "./auth/auth.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [ormConfig],
      expandVariables: true,
    }),
    TypeOrmModule.forRootAsync({
      useFactory:
        process.env.NODE_ENV !== "production" ? ormConfig : ormConfigProd,
    }),
    AuthModule,
    CategoriesModule,
    DrinksModule,
    IngredientsModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
