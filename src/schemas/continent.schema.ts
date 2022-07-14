import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';

@Schema()
export class Continent {
  @Prop()
  Code: string;
  @Prop()
  Name: string;
  @Prop()
  translation: [];
}
export const ContinentSchema = SchemaFactory.createForClass(Continent);
