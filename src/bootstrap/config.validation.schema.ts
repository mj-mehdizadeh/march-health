import * as Joi from 'joi';

export default Joi.object({
  APP_NAME: Joi.string().default('n/a'),
  APP_ENV: Joi.string()
    .valid('development', 'production')
    .default('development'),
  PORT: Joi.number().default(4200),
  MONGO_URL: Joi.string()
    .required()
    .regex(/^mongodb/),
  JWT_SECRET: Joi.string().required(),
  JWT_TTL: Joi.number().default(9000),
  PAYMENT_BASE_URL: Joi.string().default('https://stripe.com/payment'),
  MAIL_HOST: Joi.string().required(),
  MAIL_PORT: Joi.number().required(),
  MAIL_USERNAME: Joi.string(),
  MAIL_PASSWORD: Joi.string(),
  MAIL_FROM_ADDRESS: Joi.string().email().required(),
});
