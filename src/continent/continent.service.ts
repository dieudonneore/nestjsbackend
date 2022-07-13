import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { IContinent } from 'src/interface/continent.interface';

@Injectable()
export class ContinentService {
  constructor(
    @InjectModel('Continent')
    private continentModel: Model<IContinent>,
  ) {}
}
