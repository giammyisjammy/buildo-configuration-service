import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigResourceModule } from './config-resource/config-resource.module';

@Module({
  /**
   * An array of the modules that we would like to import and use in this module.
   * The modules that we import like this will need to register their providers
   * as exports to access them in this module.
   */
  imports: [
    TypeOrmModule.forRoot({
      // TODO use .env variables
      type: 'mysql',
      host: 'localhost',
      port: 3306,
      username: 'root',
      password: 'root',
      database: 'test',
      autoLoadEntities: true,
      synchronize: process.env.NODE_ENV !== 'production', // otherwise you can lose production data.
    }),
    ConfigResourceModule,
  ],
  /**
   * An array of controllers in this module. As a reminder, controllers expose
   * our application's external-facing API (via rest, graphql, or other means).
   */
  controllers: [AppController],
  /**
   * An array of providers used by this module. Providers expose lower-level
   * functionality that controllers will call into. Providers are often injected
   * into our Controllers, but can also be injected into other providers.
   */
  providers: [AppService],
  /**
   * An array of the providers we would like to export from this module.
   * Once we have added a provider to this array, we can use it in another
   * module by importing this module.
   */
  // exports: [],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}
}
