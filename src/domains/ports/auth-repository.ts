export interface LoginCredentials {
    email: string;
    password: string;
  }
  
  export interface RegisterCredentials extends LoginCredentials {
    name: string;
  }
  
  export interface AuthResponse {
    token: string;
    user: {
      id: string;
      name: string;
      email: string;
    };
  }
  
  export interface AuthRepository {
    login(credentials: LoginCredentials): Promise<AuthResponse>;
    register(credentials: RegisterCredentials): Promise<AuthResponse>;
  }
  