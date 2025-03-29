import {Injectable, NotFoundException} from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service' 
import { CreateCalenderInput } from './dto/create-calender.input'
import { Calender } from './models/calender.model'

@Injectable()
export class CalendarsService {
    constructor(private prisma: PrismaService){}

    async createCalender(ownerId: string, data: CreateCalenderInput): Promise<Calender>{
        return this.prisma.calender.create({
            data: {
                ...data,
                owner:{
                    connect: {id: ownerId}
                }
            }
            ,
            include:{
                owner: true
            }

        })
    }

    async findCalenderById(id: string): Promise<Calender| null>{
        const calender = await this.prismma.calnder.findUnique({
            where: {id},
            include:{
                owner: true,
                events: true
            }
        })
        if(!calender){
            throw new NotFoundException(`Calender with ID ${id} not found`)
        }
        return calender
    }

    async findUserCalenders(userId: string): Promise<Calender[]> {
        return this.prisma.calender.findMany({
            where: {id: userId},
            include:{
                owner: true
            }
        })
    }
}