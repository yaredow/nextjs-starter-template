# nextjs-starter-template

A robust and flexible Next.js starter template with TypeScript, Jest, Cypress, Auth.js, Prisma ORM, and more. This template provides everything you need to kickstart your modern web development projects with best practices and industry-standard tools.

## Features

- **TypeScript**: Strongly-typed language for better code quality and developer experience.
- **Next.js**: Powerful React framework with server-side rendering.
- **Jest**: Comprehensive unit and integration testing setup.
- **Cypress**: End-to-end testing for simulating real user interactions.
- **Auth.js**: Secure and easy-to-use authentication.
- **Prisma ORM**: Advanced ORM for seamless database management and querying.
- **Tailwind CSS**: Utility-first CSS framework for rapid UI development.
- **ESLint and Prettier**: Ensuring code quality and consistency.
- **Husky and Lint-Staged**: Pre-commit hooks to automate tests and linting.
- **dotenv**: Easy management of environment variables.

### Obtaining API Keys

- **Google**: [Generate your Google Auth ID and Auth Secret here](https://console.cloud.google.com).
- **Facebook**: [Get your Facebook Auth ID and Auth Secret here](https://developers.facebook.com).
- **Resend**: [Get your Resend key here](https://resend.com).

## Getting Started

Clone the repository and start building your application with confidence!

```sh
git clone https://github.com/your-username/nextjs-starter-template.git
cd nextjs-starter-template
npm install
```

````

### Usage

1. Clone the repository:

   ```
   git clone https://github.com/your-username/your-repo-name.git
   cd your-repo-name
   ```

2. Install dependencies:

   ```
   npm install
   ```

3. Create a `.env` file by copying the `.env.example` file:

   ```
   cp .env.example .env
   ```

4. Create a `.env.local` file by copying the `.env.local.example` file:

   ```
   cp .env.local.example .env.local
   ```

5. Open the `.env` and `.env.local` files and replace the placeholder values with your actual environment variable values.

6. Run the development server:

   ```
   npm run dev
   ```

7. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Running Tests

- **End-to-End Tests (Cypress)**:

  To run Cypress end-to-end tests, use the following command:

  ```
  npm run cypress
  ```

- **Unit Tests (Jest)**:

  To run Jest unit tests, use the following command:

  ```
  npm run test
  ```

## Running React Email in Development

To start the React Email development server, use the following command:

```
npm run email:dev
```

## Pre-commit Hook

This project uses [Husky](https://github.com/typicode/husky) to manage Git hooks. When you commit a change, Husky runs the following commands automatically:

```
npm run format:fix && npm run lint && npm test
```

- `npm run format:fix`: This command formats your code using a formatter (e.g., Prettier).
- `npm run lint`: This command runs the linter to check for code quality issues.
- `npm test`: This command runs the test suite to ensure that your changes do not break existing functionality.

These commands help maintain code quality and consistency across the project.

## License

This project is licensed under the MIT License.

## Contributing

Contributions are welcome! Please open an issue or submit a pull request.

````
