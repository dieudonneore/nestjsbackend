import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ContinentSchema } from './schemas/continent.schema';
import { ContinentService } from './continent/services/continent.service';
import { ContinentController } from './continent/controllers/continent.controller';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/ContinentDATABASE'),
    MongooseModule.forFeature([{ name: 'Continent', schema: ContinentSchema }]),
  ],
  controllers: [AppController, ContinentController],
  providers: [AppService, ContinentService],
})
export class AppModule {}
