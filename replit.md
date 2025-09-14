# SmartClass Schedule Manager

## Overview

SmartClass is a comprehensive school timetable management system built with React, TypeScript, and Express.js. The application enables educational institutions to manage classes, teachers, students, and room assignments through an intuitive web interface. It features a full-stack architecture with real-time scheduling capabilities, conflict detection, and drag-and-drop timetable management.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture
- **Framework**: React 18 with TypeScript for type safety
- **Routing**: Wouter for lightweight client-side routing
- **State Management**: TanStack Query for server state management and caching
- **UI Components**: Radix UI primitives with custom shadcn/ui components
- **Styling**: Tailwind CSS with custom CSS variables for theming
- **Build Tool**: Vite for fast development and optimized production builds

### Backend Architecture
- **Runtime**: Node.js with Express.js framework
- **Database ORM**: Drizzle ORM for type-safe database operations
- **API Design**: RESTful API with CRUD operations for all entities
- **Validation**: Zod schemas for runtime type validation
- **Development**: TypeScript with hot reload via TSX

### Database Schema
The application uses PostgreSQL with the following core entities:
- **Teachers**: Store teacher information, subjects, and active status
- **Students**: Manage student enrollment and grade information
- **Rooms**: Track room capacity, type, equipment, and availability status
- **Classes**: Schedule class sessions with time slots and enrollment limits
- **Class Enrollments**: Many-to-many relationship between students and classes

### Authentication and Authorization
Currently implements a basic session-based approach using connect-pg-simple for session storage. The system is designed to be extended with proper authentication mechanisms.

### UI/UX Design Patterns
- **Glass morphism**: Semi-transparent cards with backdrop blur effects
- **Dark theme**: Modern dark color scheme with accent colors
- **Responsive design**: Mobile-first approach with breakpoint-based layouts
- **Drag and drop**: Interactive timetable management with visual feedback
- **Real-time updates**: Optimistic updates with error handling and rollback

### Data Flow Architecture
- **Client-Server Communication**: RESTful API calls with React Query for caching
- **Form Management**: React Hook Form with Zod validation
- **Error Handling**: Centralized error boundaries and toast notifications
- **Loading States**: Skeleton loaders and loading indicators throughout the UI

## External Dependencies

### Core Framework Dependencies
- **@tanstack/react-query**: Server state management and caching
- **wouter**: Lightweight React router
- **react-hook-form**: Form state management and validation
- **@hookform/resolvers**: Zod integration for form validation

### Database and ORM
- **drizzle-orm**: Type-safe ORM for PostgreSQL
- **drizzle-kit**: Database migration and schema management tools
- **@neondatabase/serverless**: Serverless PostgreSQL driver
- **connect-pg-simple**: PostgreSQL session store for Express

### UI Component Libraries
- **@radix-ui/react-***: Unstyled, accessible UI primitives (accordion, dialog, dropdown, etc.)
- **tailwindcss**: Utility-first CSS framework
- **class-variance-authority**: Component variant management
- **clsx**: Conditional CSS class utility

### Development and Build Tools
- **vite**: Fast build tool and dev server
- **typescript**: Static type checking
- **tsx**: TypeScript execution for Node.js
- **esbuild**: Fast JavaScript bundler for production builds

### Additional Utilities
- **zod**: Runtime type validation and schema definition
- **date-fns**: Date manipulation utilities
- **embla-carousel-react**: Carousel component implementation
- **cmdk**: Command palette component
- **lucide-react**: Icon library with React components