import { Repository } from 'typeorm';
import { User } from './user.entity';
export declare class AuthService {
    private readonly userRepository;
    constructor(userRepository: Repository<User>);
    register(username: string, email: string, password: string): Promise<User | null>;
    login(username: string, password: string): Promise<User | null>;
}
export declare class AppModule {
}
