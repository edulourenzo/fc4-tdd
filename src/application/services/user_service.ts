import { User } from "../../domain/entities/user";
import { UserRepository } from "../../domain/repositories/user_repository";
import { v4 as uuidv4 } from "uuid";

export class UserService {
  constructor(private readonly userRepository: UserRepository) { }

  async findUserById(id: string): Promise<User | null> {
    return this.userRepository.findById(id);
  }

  async createUser(name: string): Promise<User> {
    const id = uuidv4();
    const user = new User(id, name);
    await this.userRepository.save(user);
    return user;
  }
}