# Screaming Architecture - Features

This project follows a **Screaming Architecture** pattern where the folder structure immediately communicates the main features and business domains of the application.

## 📁 Project Structure

```
src/
├── features/                    # Feature-based modules (Business Logic)
│   ├── landing/                # Landing page and onboarding
│   │   ├── components/         # Landing-specific components
│   │   ├── services/           # Landing-related API calls
│   │   ├── model.ts            # Landing types and state models
│   │   └── logic.ts            # Landing business logic and composables
│   │
│   ├── recommendations/        # Personal recommendations management
│   │   ├── components/         # Recommendation-specific components
│   │   ├── services/           # Recommendation-related API calls
│   │   ├── model.ts            # Recommendation types and state models
│   │   └── logic.ts            # Recommendation business logic
│   │
│   ├── watchlist/              # Personal watchlist management
│   │   ├── components/         # Watchlist-specific components
│   │   ├── services/           # Watchlist-related API calls
│   │   ├── model.ts            # Watchlist types and state models
│   │   └── logic.ts            # Watchlist business logic
│   │
│   └── community/              # Community posts and social features
│       ├── components/         # Community-specific components
│       ├── services/           # Community-related API calls
│       ├── model.ts            # Community types and state models
│       └── logic.ts            # Community business logic
│
├── shared/                     # Shared utilities and components
│   ├── ui/                     # Reusable UI components (Button, Modal, etc.)
│   ├── styles/                 # Global styles and themes
│   ├── hooks/                  # Reusable hooks/composables
│   ├── types/                  # Global TypeScript types
│   ├── constants/              # Application constants
│   └── utils/                  # Helper functions and utilities
│
└── app/                        # Application infrastructure
    ├── routes.ts               # Main application routes
    ├── App.tsx                 # App wrapper and navigation logic
    ├── store.ts                # Global state management
    └── index.tsx               # Application entry point
```

## 🎯 Features Overview

### 🚀 **Landing**

- **Purpose**: Welcome page and user onboarding
- **Components**: Hero section, features showcase, getting started flow
- **Key Functions**: First-time user experience, feature introduction

### 📝 **Recommendations**

- **Purpose**: Personal recommendation management
- **Components**: Recommendation cards, rating system, creation forms
- **Key Functions**: Create, view, edit, delete personal recommendations

### ⏰ **Watchlist**

- **Purpose**: Track items to watch later
- **Components**: Watchlist table, priority management, completion tracking
- **Key Functions**: Add items, set priorities, mark as completed

### 👥 **Community**

- **Purpose**: Social sharing and discovery
- **Components**: Community posts, comments, likes, filtering
- **Key Functions**: Share recommendations, discover new content, social interactions

### 🔧 **Shared**

- **Purpose**: Reusable components and utilities
- **Components**: Theme toggle, language selector, search bar, modals
- **Key Functions**: UI consistency, common functionality, global utilities

### 🏗️ **App**

- **Purpose**: Application infrastructure and routing
- **Components**: Main app wrapper, navigation logic, global state
- **Key Functions**: Route management, app initialization, global state

## 📋 Benefits of This Architecture

1. **🔍 Clear Intent**: Folder names immediately reveal what the app does
2. **🏗️ Scalable**: Easy to add new features without restructuring
3. **👥 Team Friendly**: Developers can quickly understand and contribute
4. **🔧 Maintainable**: Feature isolation makes debugging and updates easier
5. **📱 Business Focused**: Structure reflects actual user needs and workflows

## 🚀 Next Steps

1. **Move existing components** to their respective feature folders
2. **Implement feature-specific logic** in each `logic.ts` file
3. **Create feature-specific services** for API interactions
4. **Migrate shared components** to the `shared/ui` folder
5. **Set up proper exports** and barrel files for clean imports
