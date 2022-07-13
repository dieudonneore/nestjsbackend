import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ContinentDto } from 'src/dto/continent.dto';
import { UpdateContinentDto } from 'src/dto/update-continent.dto';
import { IContinent } from 'src/interface/continent.interface';

@Injectable()
export class ContinentService {
  constructor(
    @InjectModel('Continent')
    private continentModel: Model<IContinent>,
  ) {}

  async createContinent(continentDto: ContinentDto): Promise<IContinent> {
    const newContinent = await new this.continentModel(continentDto);
    return newContinent.save();
  }

  async updateStudent(
    continentId: string,
    updateContinentDto: UpdateContinentDto,
  ): Promise<IContinent> {
    const existingContinent = await this.continentModel.findByIdAndUpdate(
      continentId,
      updateContinentDto,
      { new: true },
    );
    if (!existingContinent) {
      throw new NotFoundException(`Continent #${continentId} not found`);
    }
    return existingContinent;
  }

  async getAllContinents(): Promise<IContinent[]> {
    const continentData = await this.continentModel.find();
    if (!continentData || continentData.length == 0) {
      throw new NotFoundException('Continent data not found!');
    }
    return continentData;
  }
  async getContinent(continentId: string): Promise<IContinent> {
    const existingContinent = await this.continentModel
      .findById(continentId)
      .exec();
    if (!existingContinent) {
      throw new NotFoundException(`Student #${continentId} not found`);
    }
    return existingContinent;
  }
  async deleteContinent(continentId: string): Promise<IContinent> {
    const deletedContinent = await this.continentModel.findByIdAndDelete(
      continentId,
    );
    if (!deletedContinent) {
      throw new NotFoundException(`Student #${continentId} not found`);
    }
    return deletedContinent;
  }
}
