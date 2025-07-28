import { supabase } from '../config/supabase.js'

export class AuthService {
  
  // Registrar usuário
  static async signUp(email, password, name) {
    try {
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      })
      
      if (error) throw error
      
      // Criar perfil automaticamente
      if (data.user) {
        const { error: profileError } = await supabase
          .from('profiles')
          .insert({
            id: data.user.id,
            name,
            email
          })
        
        if (profileError) throw profileError
      }
      
      return {
        success: true,
        user: data.user,
        message: 'Usuário criado com sucesso'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Login
  static async signIn(email, password) {
    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
      })
      
      if (error) throw error
      
      return {
        success: true,
        user: data.user,
        session: data.session,
        message: 'Login realizado com sucesso'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Logout
  static async signOut() {
    try {
      const { error } = await supabase.auth.signOut()
      if (error) throw error
      
      return {
        success: true,
        message: 'Logout realizado com sucesso'
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }

  // Obter usuário atual
  static async getCurrentUser() {
    try {
      const { data: { user } } = await supabase.auth.getUser()
      return {
        success: true,
        user
      }
    } catch (error) {
      return {
        success: false,
        error: error.message
      }
    }
  }
}
