# QR Code - Desafio Técnico Supranet

Este projeto é um estúdio de criação de QR Codes, desenvolvido como parte do processo seletivo da Supranet. Ele permite aos usuários criar QR Codes personalizados, com opções de design e conteúdo variados.

## 🚀 Como Executar

1. **Clonar/baixar o projeto:** `git clone https://github.com/matheusgit1/SUPRANET-DEV-TEST`
2. **Build:** `docker build -t qr-code-studio .`
3. **Rodar:** `docker run -p 3000:3000 qr-code-studio`
4. **Acessar:** `http://localhost:3000`

## 🏗️ Arquitetura e decisões técnicas mais relevantes

- Aplicação construída com Nuxt 4 (SSR/SPA), composition API e TypeScript para tipagem forte.
- Estado de histórico gerenciado em Pinia (`store/qrCode.store.ts`) com persistência em `localStorage`.
- Componentização clara: formulario, preview, histórico e fallback de carregamento.
- Dockerfile baseado em Bun para garantir ambiente consistente e build reprodutível.

## 🌐 Integração com API do goQR.me

- A URL do QR Code é gerada dinamicamente usando parâmetros `data`, `size`, `color` e `format` conforme documentação oficial (https://goqr.me/api/).
- A requisição é direta do frontend, sem “hardcode”: cada geração monta URL única com configurações do usuário.
- Tratamento de erros inclui mensagens amigáveis para falha de rede/parâmetro inválido.

## 🛠️ Tecnologias

- Nuxt 4, Pinia, TypeScript, Bun e Docker.
