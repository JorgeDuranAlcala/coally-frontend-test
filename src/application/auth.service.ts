import { AuthRepository, AuthResponse, LoginCredentials, RegisterCredentials } from "../domains/ports/auth-repository";

export class AuthService {
  constructor(private authRepository: AuthRepository) {}

  login(credentials: LoginCredentials): Promise<AuthResponse> {
    return this.authRepository.login(credentials);
  }

  register(credentials: RegisterCredentials): Promise<AuthResponse> {
    return this.authRepository.register(credentials);
  }
}
