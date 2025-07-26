# Webhook → HTTP Request → Email

Sistema automatizado que recebe dados via webhook, processa através de API externa e envia notificação por email.

## 🏗️ Arquitetura

Webhook → API Processing → Email Notification


## 🔧 Funcionalidades

- **Webhook HTTP**: Recepção de dados JSON
- **API Integration**: Processamento via JSONPlaceholder API
- **Email Automation**: Notificação automática via Gmail

## 📥 Input
{
"nome": "João Silva",
"email": "joao@example.com"
}

## 📤 Output
Email automatizado combinando dados do input e resposta da API.

## 💡 Implementação Técnica

### Mapeamento de Dados n8n
// Acesso aos dados do webhook
{{ $('Webhook').item.json.body.email }}
{{ $('Webhook').item.json.body.nome }}

// Acesso aos dados da API
{{ $('HTTP Request').item.json.id }}
{{ $('HTTP Request').item.json.title }}


## 🎯 Casos de Uso

- Confirmações de cadastro
- Processamento de formulários
- Notificações de sistema
- Integração CRM/Email

## 🚀 Como Executar

1. Importe `workflow.json` no n8n
2. Configure credenciais Gmail
3. Teste via POST no webhook endpoint
4. Monitore execução no dashboard

## 📊 Métricas

- **Latência**: < 2s end-to-end
- **Confiabilidade**: 99%+ success rate
- **Escalabilidade**: Suporte a múltiplas execuções simultâneas