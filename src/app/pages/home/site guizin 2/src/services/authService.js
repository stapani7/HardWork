// Serviço de autenticação usando LocalStorage
import mockAPI from './mockAPI';

const AUTH_KEY = 'guizin_auth';
const USER_KEY = 'guizin_user';

class AuthService {
  // Login
  async login(email, password) {
    try {
      const response = await mockAPI.login(email, password);
      
      if (response.success) {
        // Salva no LocalStorage
        localStorage.setItem(AUTH_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return { success: true, user: response.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'Erro ao fazer login' };
    }
  }

  // Registro
  async register(name, email, password) {
    try {
      const response = await mockAPI.register(name, email, password);
      
      if (response.success) {
        // Salva no LocalStorage
        localStorage.setItem(AUTH_KEY, response.token);
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return { success: true, user: response.user };
      }
      
      return { success: false, message: response.message };
    } catch (error) {
      return { success: false, message: 'Erro ao registrar' };
    }
  }

  // Logout
  logout() {
    localStorage.removeItem(AUTH_KEY);
    localStorage.removeItem(USER_KEY);
  }

  // Verifica se está autenticado
  isAuthenticated() {
    const token = localStorage.getItem(AUTH_KEY);
    return !!token;
  }

  // Obtém o token
  getToken() {
    return localStorage.getItem(AUTH_KEY);
  }

  // Obtém o usuário atual
  getCurrentUser() {
    const userStr = localStorage.getItem(USER_KEY);
    if (userStr) {
      try {
        return JSON.parse(userStr);
      } catch (error) {
        return null;
      }
    }
    return null;
  }

  // Verifica e valida o token
  async validateToken() {
    const token = this.getToken();
    if (!token) {
      return { success: false };
    }

    try {
      const response = await mockAPI.verifyToken(token);
      if (response.success) {
        // Atualiza dados do usuário
        localStorage.setItem(USER_KEY, JSON.stringify(response.user));
        return { success: true, user: response.user };
      } else {
        this.logout();
        return { success: false };
      }
    } catch (error) {
      this.logout();
      return { success: false };
    }
  }
}

export default new AuthService();


