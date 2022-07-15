import {
  Body,
  Controller,
  Delete,
  Get,
  HttpStatus,
  Param,
  Post,
  Put,
  Req,
  Res,
} from '@nestjs/common';
import { Request } from 'express';
import { ContinentDto } from 'src/dto/continent.dto';
import { UpdateContinentDto } from 'src/dto/update-continent.dto';
import { ContinentService } from '../services/continent.service';

@Controller('continent')
export class ContinentController {
  constructor(private readonly continentService: ContinentService) {}

  @Get('/filterContinent')
  async filterContinent(@Req() req: Request) {
    let options = {};
    const code: any = req.query.code;
    const name: any = req.query.name;
    const keyword: any = req.query.keyword;

    if (req.query.code) {
      options = {
        $or: [{ Code: new RegExp(code, 'i') }],
      };
    }

    if (req.query.name) {
      options = {
        $or: [{ Name: new RegExp(name, 'i') }, { Code: new RegExp(name, 'i') }],
      };
    }

    if (req.query.keyword) {
      options = {
        $or: [
          { Name: new RegExp(keyword, 'i') },
          { Code: new RegExp(keyword, 'i') },
        ],
      };
    }

    const data = this.continentService.findContinentByFilter(options);

    return data;
  }

  @Post()
  async createContinent(
    @Res() response,
    @Body() createContinentDto: ContinentDto,
  ) {
    try {
      const newContinent = await this.continentService.createContinent(
        createContinentDto,
      );
      return response.status(HttpStatus.CREATED).json({
        message: 'Continent has been created successfully',
        newContinent,
      });
    } catch (err) {
      return response.status(HttpStatus.BAD_REQUEST).json({
        statusCode: 400,
        message: 'Error: Continent not created!',
        error: 'Bad Request',
      });
    }
  }
  @Put('/:id')
  async updateContinent(
    @Res() response,
    @Param('id') continentId: string,
    @Body() updateContinentDto: UpdateContinentDto,
  ) {
    try {
      const existingContinent = await this.continentService.updateContinentt(
        continentId,
        updateContinentDto,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Continent has been successfully updated',
        existingContinent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Get()
  async getContinents(@Res() response) {
    try {
      const continentData = await this.continentService.getAllContinents();
      return response.status(HttpStatus.OK).json({
        message: 'All continents data found successfully',
        continentData,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
  @Get('/:id')
  async getContinent(@Res() response, @Param('id') continentId: string) {
    try {
      const existingContinent = await this.continentService.getContinent(
        continentId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Continent found successfully',
        existingContinent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }

  @Delete('/:id')
  async deleteContinent(@Res() response, @Param('id') continentId: string) {
    try {
      const deleteContinent = await this.continentService.deleteContinent(
        continentId,
      );
      return response.status(HttpStatus.OK).json({
        message: 'Continent deleted successfully',
        deleteContinent,
      });
    } catch (err) {
      return response.status(err.status).json(err.response);
    }
  }
}
