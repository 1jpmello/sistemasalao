# Andromeda Solutions - Beauty Salon Platform

## Overview

This platform contains **two separate systems**:

1. **Site de Vendas + Demo** (`/`, `/dashboard`, etc.) - Marketing landing page and demonstration system for potential customers. Contains premium modals, guided tours, and simulated features to showcase the software.

2. **Sistema Real do Cliente** (`/app/*`) - The actual product delivered to paying customers. Clean interface without demo restrictions, premium modals, or sales-focused UI elements.

## User Preferences

Preferred communication style: Simple, everyday language (Portuguese/Brazilian).

## System Architecture

### Two-System Structure

#### Sales Demo System (Original)
- **Routes**: `/`, `/dashboard`, `/agenda`, `/team`, `/services`, `/queue`, `/marketing`, `/finance`, `/clients`, `/mini-site`
- **Layout**: `client/src/components/layout/Layout.tsx` + `Sidebar.tsx`
- **Features**: Premium modals, guided tour, welcome modal, "Versão Demo" badge
- **Purpose**: Convert potential customers by showcasing capabilities

#### Client Production System (New)
- **Routes**: `/app`, `/app/agenda`, `/app/equipe`, `/app/servicos`, `/app/fila`, `/app/marketing`, `/app/financeiro`, `/app/clientes`, `/app/mini-site`
- **Layout**: `client/src/components/layout/AppLayout.tsx` + `AppSidebar.tsx`
- **Features**: Full functionality, light theme with gradients (unified with demo), "Plano Profissional" badge, functional CRUD operations
- **Purpose**: Actual product for paying customers
- **Authentication**: Backend-connected login at `/login` with real user registration and authentication

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state
- **Styling**: Tailwind CSS v4 with custom theme variables, shadcn/ui component library
- **Animations**: Framer Motion for transitions and interactions
- **Build Tool**: Vite with custom plugins

### Component Structure
- **Demo Layout**: `Layout.tsx` with responsive sidebar, welcome modal, tour overlay
- **App Layout**: `AppLayout.tsx` with clean light theme matching demo, functional logout
- **UI Components**: Full shadcn/ui component library with Radix UI primitives

### Design Patterns
- **Dual System Approach**: Same mock data, different UX for demo vs real product
- **Mock Data**: All data is simulated in `client/src/lib/mockData.ts`
- **Portuguese (Brazilian) UI**: Target market is Brazilian salon owners

### Backend Architecture
- **Server**: Express.js serving the Vite-built static files
- **Database Schema**: Drizzle ORM with PostgreSQL schema defined
- **Storage**: PostgreSQL database with Drizzle ORM queries

## External Dependencies

### Third-Party Services
- **Google Analytics 4**: Integrated for tracking user interactions
- **Google Fonts**: Playfair Display and Plus Jakarta Sans font families

### Key NPM Packages
- **UI Framework**: `@radix-ui/*` primitives, `class-variance-authority`, `clsx`, `tailwind-merge`
- **Charts**: `recharts` for financial visualizations
- **Date Handling**: `date-fns` with Portuguese locale
- **Forms**: `react-hook-form` with `@hookform/resolvers` and `zod` validation
- **Carousel**: `embla-carousel-react`
- **Animations**: `framer-motion`

### Database
- **ORM**: Drizzle ORM configured for PostgreSQL
- **Schema Location**: `shared/schema.ts`
- **Current Tables**: `users`, `staff`, `services`, `appointments`, `clients`, `automations`

### Deployment
- **Target Platform**: Replit / Netlify for production deployment
- **Analytics**: Only active in production (not localhost)
- **Build Output**: `dist/public` directory with static assets

## Recent Changes

### December 2024
- Added separate client production system at `/app/*` routes
- Created `AppLayout.tsx` and `AppSidebar.tsx` for clean client experience
- Created full set of app pages without premium modals: Dashboard, Agenda, Team, Services, Clients, Finance, Queue, Marketing, MiniSite
- Original demo/sales system preserved at original routes
- Unified visual identity: Updated all /app pages to use light theme with gradients (matching demo)
- Added functional CRUD operations with modals for: appointments, professionals, services, clients, transactions
- Implemented queue status management (start/finish/payment)
- Added toast notifications for user feedback on all operations
- Login system with backend authentication for accessing /app routes

### December 15, 2024
- Integrated frontend with PostgreSQL backend for real data persistence
- Added `automations` table with client selection support (`clientIds` array, `targetAll` boolean)
- Updated AppMarketing page to create/edit automations with option to select specific clients
- Fixed client creation error (database was not provisioned)
- Real user registration and login with password hashing (bcrypt)
