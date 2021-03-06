import * as dbConfig from 'src/core/database/database.config.js';
import { Sequelize } from 'sequelize-typescript';
import { SEQUELIZE, DEVELOPMENT, TEST, PRODUCTION } from '../constants';
import { User } from 'src/modules/users/entities/user.entity';

export const databaseProviders = [
  {
    provide: SEQUELIZE,
    useFactory: async () => {
      let config: any = dbConfig;
      switch (process.env.NODE_ENV) {
        case DEVELOPMENT:
          config = dbConfig.development;
          break;
        case TEST:
          config = dbConfig.test;
          break;
        case PRODUCTION:
          config = dbConfig.production;
          break;
        default:
          config = dbConfig.development;
      }

      const sequelize = new Sequelize(config);
      sequelize.addModels([
        User
      ])
      
      await sequelize.sync();
      return sequelize;
    }
  }
]