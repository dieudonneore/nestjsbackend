import { Document } from 'mongoose';

export interface IContinent extends Document {
  readonly Code: string;
  readonly Name: string;
}
