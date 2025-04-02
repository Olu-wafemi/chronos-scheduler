import { Field, ID, ObjectType } from '@nestjs/graphql';
import { User } from '../../users/models/user.model';
import { Event } from '../../events/models/event.model';

@ObjectType()
export class Calender {
    @Field(() => ID)
    id: string;

    @Field()
    name: string;

    @Field()
    description: string;

    @Field()
    color: string;

    @Field(() => User)
    owner: User;

    @Field()
    ownerId: string;

    @Field(() => [Event], { nullable: true })
    events?: Event[];

    @Field()
    createdAt: Date;

    @Field()
    updatedAt: Date;
}