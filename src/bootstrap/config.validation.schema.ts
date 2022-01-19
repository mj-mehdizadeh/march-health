import * as Joi from 'joi';

export default Joi.object({
  APP_NAME: Joi.string().default('n/a'),
  APP_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  APP_URL: Joi.string().default('http://localhost:9000'),
  PORT: Joi.number().default(4200),
  MONGO_URL: Joi.string()
    .required()
    .regex(/^mongodb/),
  JWT_SECRET: Joi.string().required(),
  ACCESS_JWT_TTL: Joi.number().required(),
  REFRESH_JWT_TTL: Joi.number().required(),
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_USERNAME: Joi.string(),
  MAIL_PASSWORD: Joi.string(),
  MAIL_FROM_ADDRESS: Joi.string().email().required(),
});
