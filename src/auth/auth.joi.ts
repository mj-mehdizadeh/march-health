import { JoiPipe } from '../common/pipe/joi.pipe';
import * as Joi from 'joi';

export const registerBodyJoi = new JoiPipe(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
);

export const sendCodeBodyJoi = new JoiPipe(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
  }),
);
export const loginBodyJoi = new JoiPipe(
  Joi.object({
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    totp: Joi.string().length(6).required(),
  }),
);
