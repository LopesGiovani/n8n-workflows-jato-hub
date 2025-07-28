import express from 'express'
import authRoutes from './auth.routes.js'

const router = express.Router()

// Health check
router.get('/health', (req, res) => {
  res.json({ 
    status: 'operational',
    service: 'Supabase Automation Backend',
    timestamp: new Date().toISOString(),
    version: '1.0.0'
  })
})

// Módulos de rotas
router.use('/auth', authRoutes)

export default router
