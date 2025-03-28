import {Field, InputType}from '@nestjs/graphql';

import {IsEmail, IsNotEmpty, IsString} from 'class-validator'

@InputType()
export class CreateUSerInput{
    @Field()
    @IsEmail()
    @IsNotEmpty()
    email: string

    @Field()
    @IsString()
    @IsNotEmpty()
    name: string

    @Field({nullable: true, defaultValue: "UTC"})
    @IsString()
    timeZone?: string
}