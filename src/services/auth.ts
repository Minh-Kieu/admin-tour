import { clientLogin } from './axios';

const login = (body: LoginBody): Promise<LoginResponse> => clientLogin.post(`/api/auth/login`, body);
const register = (body: RegisterBody): Promise<RegisterResponse> => clientLogin.post(`/api/auth/regitster`, body);

const authService = {
  login,
  register,
};
export default authService;
