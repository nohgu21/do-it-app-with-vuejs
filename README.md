# Do It Application
A modern, responsive todo application built with Vue.js 3 and TypeScript. This project demonstrates CRUD operations, routing, modal management, and API integration with a clean, dark-themed UI.

## Features

- Create, read, update, and delete todos
- Search and filter todos by status (All, Completed, Pending)
- Pagination for large todo lists
- Modern dark theme with Tailwind CSS
- Responsive design
- Real-time updates
- Vue Router for navigation
- Todo detail pages
- TypeScript for type safety

## Tech Stack

- Frontend Framework: Vue.js 3 (Composition API)
- Language: TypeScript
- Styling: Tailwind CSS
- Icons: Lucide Vue Next
- Routing: Vue Router 4
- API: DummyJSON (https://dummyjson.com)
- Build Tool: Vite

## Usage
### Main Features

- View Todos: Browse your todo list with pagination
- Add Todo: Click "Add Todo" button to create new tasks
- Search: Use the search bar to find specific todos
- Filter: Filter by All, Completed, or Pending status
- Edit: Click the edit icon to modify existing todos
- Delete: Click the delete icon to remove todos
- View Details: Click on any todo item to see detailed view

## Navigation

- Home (/): Main todo list page
- Todo Detail (/todos/:id): Individual todo details page

## API Integration
The application integrates with DummyJSON API for todo operations:

- GET /todos - Fetch all todos
- GET /todos/:id - Fetch specific todo
- POST /todos/add - Create new todo
- PUT /todos/:id - Update existing todo
- DELETE /todos/:id - Delete todo

## Component Architecture
Core Components

- App.vue: Router container
- TodoListPage.vue: Main layout with search, filters, and todo list
- todolist.vue: Handles todo display, pagination, and CRUD operations
- TodoDetail.vue: Shows individual todo details and allows editing

## Modal Components

- todomodal.vue: Add new todo modal
- edittodo.vue: Edit existing todo modal

## UI Components

- greeting.vue: Dynamic greeting header
- searchfilter.vue: Search input and status filters

## Key Features Implementation
1. Routing

- Vue Router 4 with TypeScript
- Dynamic routes for todo details
- Navigation guards and route parameters

2. State Management

- Reactive data with Vue 3 Composition API
- Local state management for todos
- Real-time UI updates

3. Modal System

- Custom modal components with backdrop
- Keyboard navigation (ESC to close, Enter to submit)
- Focus management for accessibility

4. API Integration

- Async/await pattern for API calls
- Error handling and loading states
- Optimistic UI updates

## Challenges Faced
### Routing Challenges

- Initial Setup: Configuring Vue Router 4 with TypeScript required understanding the new composition API patterns and proper type definitions
- Dynamic Routes: Implementing parameterized routes (/todos/:id) and accessing route parameters in components
- Navigation: Transitioning from component-based navigation to router-based navigation required restructuring the app architecture
- Route Guards: Ensuring proper navigation flow and handling edge cases when routes don't exist

### Modal Issues

- CSS Framework Dependencies: Initially used DaisyUI classes that weren't available, causing modals to render inline instead of as overlays
- Custom Modal Implementation: Had to build custom modal overlays using Tailwind CSS with proper positioning (fixed inset-0, z-index management)
- Focus Management: Implementing proper accessibility features like focus trapping and keyboard navigation
- Event Handling: Managing backdrop clicks, ESC key functionality, and preventing event bubbling

### API Integration

- Error Handling: Implementing robust error handling for network failures and API errors
- Loading States: Managing loading states across different components and API calls
- Data Synchronization: Keeping local state in sync with API responses, especially after CRUD operations
- TypeScript Integration: Defining proper interfaces for API responses and ensuring type safety throughout the data flow

### Getting Used to Vue Structure

- Composition API: Transitioning from options API patterns to the new Composition API with <script setup> syntax
- Reactivity System: Understanding Vue 3's reactivity with ref(), reactive(), and computed()
- Component Communication: Learning proper patterns for props, emits, and event handling in Vue 3
- Template Syntax: Adapting to Vue's template directives (v-for, v-if, @click) and two-way binding patterns
- TypeScript Integration: Defining proper types for props, emits, and component interfaces in Vue + TypeScript setup
- File Organization: Establishing a proper component structure and understanding Vue's single-file component architecture

