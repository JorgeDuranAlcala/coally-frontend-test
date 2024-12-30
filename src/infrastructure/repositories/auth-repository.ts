import { AuthRepository, LoginCredentials, RegisterCredentials, AuthResponse } from '../../domains/ports/auth-repository';
import axiosInstance from '../http/axios-instance';

export class AuthApiRepository implements AuthRepository {
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const { data } = await axiosInstance.post('/api/v1/login', credentials);
    localStorage.setItem('token', data.token);
    localStorage.setItem('userId', JSON.stringify(data.id));
    return data;
  }

  async register(credentials: RegisterCredentials): Promise<AuthResponse> {
    const { data } = await axiosInstance.post('/api/v1/register', credentials);
    return data;
  }
}
