import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCalenderInput } from './dto/create-calender.input';
import { Calender } from './models/calender.model';

@Injectable()
export class CalendarsService {
  constructor(private prisma: PrismaService) {}

  async createCalender(
    ownerId: string,
    data: CreateCalenderInput,
  ): Promise<Calender> {
    const calendar = await this.prisma.calendar.create({
      data: {
        name: data.name,
        description: data.description,
        color: data.color || '#4285F4',
        owner: {
          connect: { id: ownerId },
        },
      },
      include: {
        owner: true,
      },
    });
    return calendar as unknown as Calender;
  }

  async findCalenderById(id: string): Promise<Calender | null> {
    const calendar = await this.prisma.calendar.findUnique({
      where: { id },
      include: {
        owner: true,
        events: true,
      },
    });
    if (!calendar) {
      throw new NotFoundException(`Calender with ID ${id} not found`);
    }
    return calendar as unknown as Calender;
  }

  async findUserCalenders(userId: string): Promise<Calender[]> {
    const calendars = await this.prisma.calendar.findMany({
      where: { ownerId: userId },
      include: {
        owner: true,
      },
    });
    return calendars as unknown as Calender[];
  }
}
