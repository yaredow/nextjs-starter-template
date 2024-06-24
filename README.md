---

# Buchi 🐾

Buchi is a comprehensive website dedicated to providing detailed information about various dog breeds. Whether you're looking to adopt a new furry friend or learn more about your current companion, Buchi has you covered. Explore breed characteristics, care tips, and more to ensure you and your dog live happily ever after.

## Table of Contents

- [Buchi 🐾](#buchi-)
  - [Table of Contents](#table-of-contents)
  - [Features](#features)
  - [Tech Stack](#tech-stack)
  - [Getting Started](#getting-started)
    - [Prerequisites](#prerequisites)
    - [Installation](#installation)
    - [Usage](#usage)
  - [Contributing](#contributing)
  - [License](#license)

## Features

- Detailed information on various dog breeds
- Adoption tips and care guides
- User-friendly and responsive design

## Tech Stack

- **Framework**: [Next.js](https://nextjs.org/)
- **Language**: [TypeScript](https://www.typescriptlang.org/)
- **CSS**: [Tailwind CSS](https://tailwindcss.com/)
- **Database**: [Prisma](https://www.prisma.io/) with [Neon DB](https://neon.tech/)

## Getting Started

To get a local copy up and running follow these simple steps.

### Prerequisites

Make sure you have the following installed on your local machine:

- [Node.js](https://nodejs.org/en/)
- [npm](https://www.npmjs.com/) or [yarn](https://yarnpkg.com/)

### Installation

1. Clone the repo:

   ```sh
   git clone https://github.com/yourusername/buchi.git
   ```

2. Navigate to the project directory:

   ```sh
   cd buchi
   ```

3. Install dependencies:

   ```sh
   npm install
   ```

   or

   ```sh
   yarn install
   ```

4. Set up environment variables:

   Create a `.env` file in the root directory and add your Prisma database URL.

   ```env
   DATABASE_URL="your_neon_db_url"
   ```

5. Run database migrations:

   ```sh
   npx prisma migrate dev
   ```

### Usage

To start the development server, run:

```sh
npm run dev
```

or

```sh
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Contributing

Contributions are what make the open-source community such an amazing place to learn, inspire, and create. Any contributions you make are **greatly appreciated**.

1. Fork the Project
2. Create your Feature Branch (`git checkout -b feature/AmazingFeature`)
3. Commit your Changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the Branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## License

Distributed under the MIT License. See `LICENSE` for more information.
