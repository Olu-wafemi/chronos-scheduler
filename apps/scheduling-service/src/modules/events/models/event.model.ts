import { Field, ID, ObjectType } from '@nestjs/graphql';
import { IsBoolean, IsOptional, IsString } from 'class-validator';

@ObjectType()
export class Event {
  @Field(() => ID)
  id: string;

  @Field()
  title: string;

  @Field({ nullable: true })
  description?: string;

  @Field()
  startTime: Date;

  @Field()
  endTime: Date;

  @Field()
  @IsString()
  @IsOptional()
  location?: string;

  @Field()
  @IsString()
  @IsOptional()
  calendarId?: string;

  @Field({ nullable: true })
  @IsOptional()
  recurrence?: string;

  @Field({ defaultValue: false })
  @IsBoolean()
  isAllDay?: boolean;
}
