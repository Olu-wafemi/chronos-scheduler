import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import * as Joi from 'joi';

@Module({
    imports: [
        ConfigModule.forRoot({
            envFilePath: [
                `.env.${process.env.NODE_ENV || 'development'}`,
                '.env'
            ],
            isGlobal: true,
            validationSchema: Joi.object({
                NODE_ENV: Joi.string()
                    .valid('development', 'production', 'staging')
                    .default('development'),
                DATABASE_URL: Joi.string().required(),
                PORT: Joi.number().default(3000)
            })
        })
    ]
})
export class EnvironmentModule {}