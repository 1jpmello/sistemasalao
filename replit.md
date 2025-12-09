# Andromeda Solutions - Beauty Salon Demo Platform

## Overview

This is a demo/showcase web platform for beauty salon management software. The platform is designed to impress potential salon owners through a visually stunning, feature-rich interface with simulated data. It is **not a real production system** - there is no backend authentication, real database operations, or actual functionality. Everything is front-end only, meant to demonstrate what a full salon management system would look like.

The project serves as a sales tool for "Andromeda Solutions" to convert salon owners into customers by showing them an elegant demo of scheduling, client management, marketing automation, and financial tracking features.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter (lightweight React router)
- **State Management**: TanStack React Query for server state, React Context for UI state (TourContext)
- **Styling**: Tailwind CSS v4 with custom theme variables, shadcn/ui component library
- **Animations**: Framer Motion for transitions and interactions
- **Build Tool**: Vite with custom plugins for meta images and Replit integration

### Component Structure
- **Layout**: Single Layout component with responsive sidebar navigation
- **Pages**: Landing page (marketing), Dashboard, Calendar/Agenda, Team, Services, Clients, Finance, Marketing, Queue, MiniSite
- **UI Components**: Full shadcn/ui component library with Radix UI primitives
- **Premium Modals**: Reusable modal system to gate "premium" features and encourage upgrades (all simulated)

### Design Patterns
- **Demo-First Approach**: All data is mock/simulated in `client/src/lib/mockData.ts`
- **Premium Lock Pattern**: Restricted features trigger persuasive upgrade modals instead of actual functionality
- **Guided Tour System**: Welcome modal and step-by-step tour overlay to onboard users
- **AI-Generated Assets**: Images are AI-generated with disclosure tooltips

### Backend Architecture
- **Server**: Express.js serving the Vite-built static files
- **Database Schema**: Drizzle ORM with PostgreSQL schema defined (users table) but minimally used
- **Storage**: In-memory storage implementation (MemStorage class) - no real persistence
- **Purpose**: The backend exists primarily to serve the static frontend; no real API logic is implemented

### Key Design Decisions
1. **No Real Authentication**: The demo intentionally avoids real auth to reduce friction for potential customers exploring the platform
2. **Simulated Everything**: All dashboard metrics, appointments, clients, and financial data are hardcoded mock data
3. **Portuguese (Brazilian) UI**: Target market is Brazilian salon owners - all text is in Portuguese
4. **Mobile-Responsive**: Uses responsive breakpoints and mobile-specific components

## External Dependencies

### Third-Party Services
- **Google Analytics 4**: Integrated for tracking user interactions (requires Measurement ID configuration in `client/index.html` and `client/src/lib/analytics.ts`)
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
- **Current Tables**: `users` table only (minimal implementation)
- **Note**: Database is provisioned but barely utilized - most data is mock

### Deployment
- **Target Platform**: Netlify for production deployment
- **Analytics**: Only active in production (not localhost)
- **Build Output**: `dist/public` directory with static assets