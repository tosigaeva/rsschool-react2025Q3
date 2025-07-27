# React Search Application with Error Boundary

This is a React application that allows searching characters from the Star Wars universe. The project demonstrates functional components using React Hooks, routing with React Router, master-detail layout, pagination with URL synchronization, local storage usage, error boundaries, and more.

## API

This application uses the **Star Wars API** endpoint:

- Base URL: [https://swapi.py4e.com/api/people/](https://swapi.py4e.com/api/people/)

The API supports searching characters by name with query parameters, which are used for fetching and displaying search results.

## Technical Details

- **React version:** 19.1.0 (with React DOM)
- **React Router:** v7+ for navigation and routing
- **Build tool:** Vite v7.0.3
- **Custom Hooks:** For reusable logic
- **Language:** TypeScript ~5.8.3
- **Linting:**
    - ESLint v9.30.1
    - React Compiler plugin
    - Prettier integration
- **Formatting:** Prettier v3.6.2
- **Git hooks:** Husky v9.1.7 + lint-staged v16.1.2

## Setup

1. Clone the repository:
    ```bash
    https://github.com/tosigaeva/rsschool-react2025Q3.git
    ```
2. Navigate to the project folder:
    ```bash
    cd rsschool-react2025Q3
    ```
3. Switch to the `class-components` branch:
    ```bash
    git checkout class-components
    ```
4. Install dependencies:
    ```bash
    npm install
    ```
5. Start development server:
    ```bash
    npm start
    ```
6. Run tests:
    ```bash
    npm run test:run
    ```
7. Run test coverage:
    ```bash
    npm run test:coverage
    ```