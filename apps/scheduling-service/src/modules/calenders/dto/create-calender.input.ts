import { Field, InputType } from '@nestjs/graphql';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

@InputType()
export class CreateCalenderInput {
    @Field()
    @IsString()
    @IsNotEmpty()
    @MaxLength(100)
    name: string;

    @Field({ nullable: true })
    @IsString()
    @MaxLength(500)
    description?: string;

    @Field({ defaultValue: '#4285F4' })
    @IsString()
    color?: string;
}