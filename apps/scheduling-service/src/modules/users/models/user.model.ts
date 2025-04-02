import { Field, ID, ObjectType } from '@nestjs/graphql';

@ObjectType()
export class User {
    @Field(() => ID)
    id: string;

    @Field()
    username: string;

    @Field()
    email: string;

    @Field()
    name: string;

    @Field()
    timeZone?: string;

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}