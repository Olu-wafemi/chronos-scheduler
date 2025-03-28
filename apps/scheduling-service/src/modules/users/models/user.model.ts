import {Field, FIELD_RESOLVER_MIDDLEWARE_METADATA, ID, ObjectType } from '@nestjs/graphql'

@ObjectType()

export class User {
    @Field(() => ID)
    id: string;;

    @Field()
    email: string

    @Field()
    name: string

    @Field()
    timeZone: string

    @Field()
    createdAt: string

    @Field()
    updatedAt: Date


}