import { Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { CreateUSerInput } from "./dto/create-user.input";
import { User } from "./models/user.model";



@Injectable()
export class UsersService {

    constructor(private prisma: PrismaService){}

    async createUser(data: CreateUSerInput): Promise<User>{
        return this.prisma.user.create({data})
    }

    async findUserById(id: string): Promise<User | null> {
        return this.prisma.user.findUnique({where: {id}})

    }

    async findUserByEmail(email: string): Promise<User | null>{
        return this.prisma.user.findUnique({where: {email}})
    }
}