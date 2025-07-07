# Sykell Challenge - Frontend

A modern React-based frontend for the URL Management System. Built with TypeScript, PrimeReact UI components, and Tailwind CSS for a responsive and user-friendly interface.

## Features

### User Interface
- Clean, modern design with PrimeReact components
- Responsive layout that works on desktop and mobile
- Dark/light theme support
- Toast notifications for user feedback

### Authentication
- User registration and login forms
- JWT token management
- Protected routes for authenticated users
- Automatic token refresh handling

### URL Management
- Create, edit, and delete URLs
- View URL details and processing status
- Tag management for URL categorization
- Link analysis visualization

### Search & Analytics
- Real-time URL search
- Fuzzy search capabilities
- URL statistics dashboard
- Data visualization with charts

## Technology Stack

- **React** 19
- **TypeScript** for type safety
- **PrimeReact** UI component library
- **Tailwind CSS** for styling
- **Rsbuild** as build tool
- **Biome** for linting and formatting

## Project Structure

```
frontend/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable React components
│   ├── pages/          # Page components
│   ├── hooks/          # Custom React hooks
│   ├── services/       # API service functions
│   ├── types/          # TypeScript type definitions
│   ├── utils/          # Utility functions
│   ├── styles/         # Global styles
│   ├── App.tsx         # Main App component
│   └── index.tsx       # Application entry point
├── package.json
├── tsconfig.json
├── rsbuild.config.ts
├── biome.json
└── postcss.config.mjs
```

## Environment Setup

### Prerequisites

- Node.js 18+
- npm or yarn or pnpm
- Git

### Development Setup

1. **Clone the repository**
   ```bash
   git clone <frontend-repo-url>
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```bash
   REACT_APP_API_URL=http://localhost:8080
   NODE_ENV=development
   ```

4. **Start the development server**
   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

   The application will be available at http://localhost:3000

### Docker Development

1. **Build the development Docker image**
   ```bash
   docker build -f Dockerfile.dev -t sykell-frontend-dev .
   ```

2. **Run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

### Production Build

1. **Build for production**
   ```bash
   pnpm build
   # or
   npm run build
   # or
   yarn build
   ```

2. **Preview production build**
   ```bash
   pnpm preview
   # or
   npm run preview
   # or
   yarn preview
   ```

3. **Build production Docker image**
   ```bash
   docker build -f Dockerfile -t sykell-frontend .
   ```

## Environment Variables

- `REACT_APP_API_URL` - Backend API URL (default: `http://localhost:8080`)
- `NODE_ENV` - Environment mode (development/production)

## Available Scripts

- `pnpm dev` - Start development server with hot reload
- `pnpm build` - Build for production
- `pnpm preview` - Preview production build locally
- `pnpm lint` - Run Biome linter
- `pnpm lint:fix` - Fix linting issues automatically
- `pnpm format` - Format code with Biome
- `pnpm type-check` - Run TypeScript type checking

## Configuration

### Rsbuild Configuration

The project uses Rsbuild for fast builds and development. Configuration is in `rsbuild.config.ts`:

```typescript
import { defineConfig } from '@rsbuild/core';
import { pluginReact } from '@rsbuild/plugin-react';

export default defineConfig({
  plugins: [pluginReact()],
  html: {
    template: './public/index.html',
  },
  server: {
    port: 3000,
  },
});
```

### Tailwind CSS

Tailwind CSS is configured in `postcss.config.mjs` and integrated with PrimeReact themes.

### Biome Configuration

Code formatting and linting rules are defined in `biome.json`:

```json
{
  "formatter": {
    "enabled": true,
    "indentStyle": "space"
  },
  "linter": {
    "enabled": true
  }
}
```

## Component Architecture

### Pages
- **Login/Register**: Authentication forms
- **Dashboard**: Main application dashboard
- **URLs**: URL management interface
- **Analytics**: Statistics and charts

### Components
- **Layout**: Navigation and page structure
- **Forms**: Reusable form components
- **Tables**: Data display components
- **Modals**: Dialog and popup components

### Services
- **API Client**: Centralized API communication
- **Authentication**: Token management
- **Local Storage**: Data persistence utilities

## Styling

The application uses a combination of:
- **Tailwind CSS** for utility-first styling
- **PrimeReact themes** for component styling
- **Custom CSS** for specific design requirements

### Theme Customization

PrimeReact themes can be customized in the main CSS file:

```css
/* Custom theme overrides */
:root {
  --primary-color: #your-primary-color;
  --surface-card: #your-surface-color;
}
```

## State Management

The application uses React's built-in state management with:
- **useState** for local component state
- **useContext** for global state (authentication, theme)
- **Custom hooks** for complex state logic

## API Integration

All API calls are centralized in the `services/` directory:

```typescript
// Example API service
export const urlService = {
  getUrls: () => api.get('/urls'),
  createUrl: (data: CreateUrlRequest) => api.post('/urls', data),
  updateUrl: (id: number, data: UpdateUrlRequest) => api.put(`/urls/${id}`, data),
  deleteUrl: (id: number) => api.delete(`/urls/${id}`),
};
```

## Deployment

### Static Hosting (Recommended)

1. Build the application:
   ```bash
   pnpm build
   ```

2. Deploy the `dist/` folder to your hosting provider:
   - Vercel
   - Netlify
   - AWS S3 + CloudFront
   - GitHub Pages

### Docker Deployment

```bash
# Build production image
docker build -f Dockerfile -t sykell-frontend .

# Run container
docker run -p 80:80 sykell-frontend
```

## Development Guidelines

### Code Style
- Use TypeScript for all new files
- Follow the existing component structure
- Use PrimeReact components when available
- Keep components small and focused

### Testing
- Write unit tests for utility functions
- Test component rendering and interactions
- Mock API calls in tests

### Performance
- Lazy load pages with React.lazy()
- Optimize images and assets
- Use React.memo for expensive components

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)

## Learn more

To learn more about Rsbuild, check out the following resources:

- [Rsbuild documentation](https://rsbuild.rs) - explore Rsbuild features and APIs.
- [Rsbuild GitHub repository](https://github.com/web-infra-dev/rsbuild) - your feedback and contributions are welcome!

## License

This project is part of the Sykell technical challenge.
