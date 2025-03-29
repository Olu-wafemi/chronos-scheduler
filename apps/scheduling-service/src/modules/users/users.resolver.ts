import { Resolver, Mutation, Query, Args } from "@nestjs/graphql"
import { UsersService } from "./users.service"
import { User } from "./models/user.model"
import { CreateUSerInput } from "./dto/create-user.input"




@Resolver(()=> User)
export class UsersResolver {
    constructor(private usersService: UsersService){}

    @Mutation(()=> User)
    async createUser(
        @Args('createUserInput') createUserInput: CreateUSerInput,): Promise<User>{
            return this.usersService.createUser(createUserInput)
        }
        
    @Query(()=> User, {nullable: true})
    async user(@Args('id') id: string): Promise<User| null>{
        return this.usersService.findUserById(id)
    }
}
