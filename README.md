### nextjs-starter-template

A robust and flexible Next.js starter template with TypeScript, Jest, Cypress, Auth.js, Prisma ORM, and more. This template provides everything you need to kickstart your modern web development projects with best practices and industry-standard tools.

### Features

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
- **next-seo** and **next-sitemap**: SEO and sitemap management for better search engine visibility.

### Getting Started

Clone the repository and start building your application with confidence!

```sh
git clone https://github.com/yourusername/nextjs-starter-template.git
cd nextjs-starter-template
npm install
```

### Usage

1. **Install Dependencies**:

   ```sh
   npm install
   ```

2. **Set Up Environment Variables**:

   Create a `.env.local` file in the root of your project and add your configuration:

   ```env
   DATABASE_URL=your-database-url
   GOOGLE_CLIENT_ID=your-google-client-id
   GOOGLE_CLIENT_SECRET=your-google-client-secret
   ```

3. **Run Prisma Migrations**:

   ```sh
   npx prisma migrate dev --name init
   ```

4. **Run the Development Server**:

   ```sh
   npm run dev
   ```

5. **Run Tests**:

   - **Unit and Integration Tests**:

     ```sh
     npm test
     ```

   - **End-to-End Tests**:

     ```sh
     npm run cypress:open
     ```

### License

This project is licensed under the MIT License.

### Contributing

Contributions are welcome! Please open an issue or submit a pull request.
