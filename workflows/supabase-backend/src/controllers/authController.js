import { AuthService } from '../services/authService.js'

export class AuthController {
  
  // POST /auth/register
  static async register(req, res) {
    try {
      const { email, password, name } = req.body
      
      // Validação básica
      if (!email || !password || !name) {
        return res.status(400).json({
          success: false,
          error: 'Email, password e name são obrigatórios'
        })
      }
      
      const result = await AuthService.signUp(email, password, name)
      
      if (result.success) {
        res.status(201).json(result)
      } else {
        res.status(400).json(result)
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      })
    }
  }

  // POST /auth/login
  static async login(req, res) {
    try {
      const { email, password } = req.body
      
      if (!email || !password) {
        return res.status(400).json({
          success: false,
          error: 'Email e password são obrigatórios'
        })
      }
      
      const result = await AuthService.signIn(email, password)
      
      if (result.success) {
        res.status(200).json(result)
      } else {
        res.status(401).json(result)
      }
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      })
    }
  }

  // POST /auth/logout
  static async logout(req, res) {
    try {
      const result = await AuthService.signOut()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      })
    }
  }

  // GET /auth/me
  static async getProfile(req, res) {
    try {
      const result = await AuthService.getCurrentUser()
      res.status(200).json(result)
    } catch (error) {
      res.status(500).json({
        success: false,
        error: 'Erro interno do servidor'
      })
    }
  }
}
