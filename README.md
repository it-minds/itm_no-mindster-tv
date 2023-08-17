This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.tsx`. The page auto-updates as you edit the file.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Committing

This project uses [`husky`](https://typicode.github.io/husky/) to manage git hooks

The following commit hooks are run on `git commit`:
- `commitlint` to ensure that your commit message follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
- `npm run test` to ensure that your code passes all tests
- `commitlint` fixes linting errors with `eslint --fix` and formats your code with `prettier`

You should also adhere to the following rules when committing:
- The commit footer should contain the issue number in the format `fix #<issue number>` (with 4 digits and leading zero's). 
  For example, `fix #0001` or `re #0001` in the case of revisiting an issue.

You can use `npm run cm` to get an interactive CLI tool for composing commit messages.