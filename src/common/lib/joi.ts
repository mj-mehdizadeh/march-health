import * as Joi from 'joi';
import { JoiPipe } from '../pipe/joi.pipe';

export const objectIdJoiSchema = Joi.string().hex().length(24);
export const requiredObjectIdParamJoiPipe = new JoiPipe(
  objectIdJoiSchema.required(),
  'param',
);
