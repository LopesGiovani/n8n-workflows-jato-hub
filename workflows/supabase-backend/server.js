import express from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './src/routes/index.js'

dotenv.config()

const app = express()
const PORT = process.env.PORT || 3000

// Middlewares globais
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({ extended: true }))

// Log de requisições
app.use((req, res, next) => {
  console.log(`${new Date().toISOString()} - ${req.method} ${req.path}`)
  next()
})

// Rotas principais
app.use('/api', routes)

// Rota raiz
app.get('/', (req, res) => {
  res.json({
    message: 'Supabase Automation Backend API',
    status: 'running',
    version: '1.0.0',
    endpoints: {
      health: '/api/health',
      auth: '/api/auth/*'
    }
  })
})

// Middleware de erro global
app.use((err, req, res, next) => {
  console.error('Error:', err)
  res.status(500).json({
    success: false,
    error: 'Erro interno do servidor'
  })
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(` 
Servidor rodando na porta ${PORT}
Health check: http://localhost:${PORT}/api/health
Auth endpoints: http://localhost:${PORT}/api/auth/*
Environment: ${process.env.NODE_ENV || 'development'}
  `)
})
