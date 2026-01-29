# 🍺 Império Bebidas e Conveniência

Aplicativo mobile para **Império Bebidas e Conveniência** - uma loja de bebidas localizada em Araçatuba, SP. Desenvolvido com React Native e Expo para oferecer uma experiência de compra rápida e intuitiva.

## 📱 Sobre o Projeto

App mobile-first com design moderno e interface otimizada para uso com uma mão, seguindo as diretrizes do Apple Human Interface Guidelines. O aplicativo permite aos clientes navegarem pelo catálogo de produtos, adicionarem itens ao carrinho e finalizarem pedidos diretamente pelo WhatsApp.

### ✨ Funcionalidades

- 📦 **Catálogo de Produtos**: 32 produtos organizados em 4 categorias (Cervejas, Destilados, Vinhos, Refrigerantes)
- 🔍 **Filtros por Categoria**: Navegação rápida entre categorias
- 🛒 **Carrinho de Compras**: Adicionar, remover e ajustar quantidades
- 💬 **Integração WhatsApp**: Finalização de pedidos via WhatsApp com mensagem formatada
- 📍 **Localização**: Integração com Google Maps para encontrar a loja
- ⭐ **Avaliações**: Sistema de rating para produtos
- 📊 **Detalhes Completos**: Informações de volume, preço, descrição e produtos relacionados

## 🎨 Design

### Paleta de Cores

- **Preto** (#000000): Background e texto principal
- **Branco** (#FFFFFF): Superfícies e texto secundário
- **Dourado** (#D4AF37): Destaques e elementos premium
- **Cinza** (#666666): Texto terciário e elementos desabilitados

### Características

- Orientação portrait (9:16) otimizada para mobile
- Elementos interativos na parte inferior da tela (one-hand friendly)
- Tipografia moderna com sombras e espaçamento aprimorado
- Imagens responsivas com proporções otimizadas

## 🚀 Tecnologias

- **React Native** 0.76.5
- **Expo SDK** 52
- **TypeScript**
- **Expo Router** (file-based routing)
- **React Query** (@tanstack/react-query)
- **Lucide Icons** (lucide-react-native)
- **Expo Location** (Google Maps)
- **Expo Linking** (WhatsApp)

## 📁 Estrutura do Projeto

```
imperio-bebidas/
├── app/
│   ├── tabs/
│   │   ├── _layout.tsx      # Tab navigation
│   │   ├── index.tsx         # Home screen
│   │   ├── catalog.tsx       # Catálogo com filtros
│   │   ├── cart.tsx          # Carrinho de compras
│   │   └── location.tsx      # Mapa e informações
│   ├── product.tsx           # Detalhes do produto
│   └── _layout.tsx           # Root layout
├── components/
│   ├── ProductCard.tsx       # Card de produto
│   └── CartItemCard.tsx      # Item do carrinho
├── context/
│   └── CartContext.tsx       # Context API para carrinho
├── mocks/
│   └── products.ts           # Dados dos produtos
├── types/
│   └── index.ts              # TypeScript interfaces
├── constants/
│   └── Colors.ts             # Paleta de cores
├── assets/
│   ├── image/
│   │   ├── logo-imperio.png
│   │   ├── icon-imperio.png
│   │   └── favicon-imperio.png
│   └── products/             # 22 imagens de produtos
└── hooks/
    └── useColorScheme.ts
```

## 🛠️ Instalação e Execução

### Pré-requisitos

- Node.js 18+
- npm ou yarn
- Expo Go app (iOS/Android)

### Passos

1. **Clone o repositório**

```bash
git clone https://github.com/seu-usuario/imperio-bebidas.git
cd imperio-bebidas
```

2. **Instale as dependências**

```bash
npm install
```

3. **Inicie o servidor Expo**

```bash
npx expo start
```

4. **Execute no dispositivo**
   - Escaneie o QR code com o app Expo Go (Android)
   - Escaneie o QR code com a câmera (iOS)

### Comandos Úteis

```bash
# Limpar cache e reiniciar
npx expo start --clear

# Modo offline (sem tunnel)
npx expo start --offline

# Build para Android
npx expo build:android

# Build para iOS
npx expo build:ios
```

## 📦 Produtos

O catálogo inclui:

- **Cervejas**: Heineken, Brahma, Skol, Stella Artois, Corona, Budweiser, etc.
- **Destilados**: Johnnie Walker, Jack Daniel's, Absolut Vodka, Smirnoff, Havana Club
- **Vinhos**: Concha y Toro, Salton, Casa Perini
- **Refrigerantes**: Coca-Cola, Pepsi, Guaraná Antarctica, Sprite, Fanta

## 📍 Informações da Loja

- **Nome**: Império Bebidas e Conveniência
- **Endereço**: R. Porangaba, 310 - Araçatuba, SP, Brasil
- **Telefone**: (18) 99734-0064
- **WhatsApp**: Link direto para pedidos

## 🌐 Deploy na Vercel

### ⚠️ Importante: Limitação do Expo na Web

Este é um app React Native otimizado para **mobile** (Expo Go). A versão web tem limitações significativas:

- 🚫 Imagens locais com `require()` não funcionam na web
- 🚫 Componentes nativos (Maps, Haptics) não têm equivalente web
- ✅ Funciona apenas como **preview/demo** da interface

### Recomendação

Para produção, use:

- **Mobile**: Expo Go ou build com EAS (`expo build`)
- **Web**: Considere criar uma versão separada Next.js/React

### Deploy na Vercel (Demo apenas)

Se ainda quiser fazer deploy da versão web como demo:

1. **Criar repositório no GitHub**

```bash
git init
git add .
git commit -m "feat: implementa app completo Império Bebidas e Conveniência"
git branch -M main
git remote add origin https://github.com/seu-usuario/imperio-bebidas.git
git push -u origin main
```

2. **Conectar na Vercel**
   - Acesse [vercel.com](https://vercel.com)
   - Faça login com GitHub
   - Clique em "Import Project"
   - Selecione o repositório `imperio-bebidas`
   - A Vercel usará automaticamente o `vercel.json`
   - Build command: `npx expo export:web`
   - Output: `dist`

3. **Teste local da versão web**

```bash
npm run build-web
npx serve dist
```

**Nota**: A versão web será apenas uma **demonstração visual**. Funcionalidades completas requerem o app mobile.

## 🔧 Configurações Importantes

### Metro Bundler

O projeto utiliza caminhos relativos para `require()` de imagens devido às limitações do Metro Bundler:

```typescript
// ✅ Correto
image: require("../assets/products/produto.png");

// ❌ Incorreto (@ alias não funciona com require)
image: require("@/assets/products/produto.png");
```

### Imagens

- Todas as imagens de produtos em **lowercase** (.png)
- Uso direto de `source={product.image}` sem `{ uri: }`
- Dimensionamento responsivo baseado em `Dimensions.get("window").width`

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é privado e pertence à **Império Bebidas e Conveniência**.

## 👨‍💻 Desenvolvedor

Desenvolvido com ❤️ para Império Bebidas e Conveniência

---

**Status**: ✅ Em produção - Testado no Expo Go
