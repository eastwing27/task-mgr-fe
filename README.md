# Task Manager Frontend

A task management application built with Nuxt.js and Vue 3.

## Architecture Overview
I was trying to follow the standard Nuxt.js project structure with the following key directories:
- `components/` - Reusable Vue components like task list, task form, buttons, etc.
- `pages/` - At the moment there are only the landing page placeholder, the task list and task detail page. The latter is not in use and can only be accessed manually as it is replaced with modal. It is there just to demonstrate routing.
- `composables/` - Vue composables for API interactions (fetching, creating, updating, deleting tasks).
- `types/` - TypeScript type definitions for Task and API responses.
- `assets/css/` - Global styles.
- `utils/` - Utility functions.

## Possible Improvements
- Implement pagination for task list if there are many tasks.
- Add user authentication and authorization; possibility to set the task performer.
- At the moment, task list page fetches all the task on every task change. It can be optimized by updating only the changed task after successful result got from the API call.
- Real-time updates with WebSockets.
- Better UX:
  - Loading indicators for API calls.
  - Confirmation dialogs for deleting tasks.
  - Error handling and user feedback for API calls.
  - All the columns can be made sortable.
  - Better looking dropdowns.
  - Date pickers for deadline input are require time entered manually. This should be improved.

## Prerequisites

- Node.js 18+ 
- npm or yarn

## Getting Started

1. **Install dependencies**
   ```bash
   npm install
   ```

2. **Set up environment variables**
   ```bash
   # Create .env file (optional)
   API_URL=http://localhost:3000/api/v1
   ```

3. **Start development server**
   Make sure the backend API is available on `API_URL` before starting the frontend.

   ```bash
   npm run dev
   ```
   
   The application will be available at [http://localhost:3001](http://localhost:3001)


