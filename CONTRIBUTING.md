# Contribute

## Testing

This project uses [`jest`](https://jestjs.io/) and [`react-testing-library`](https://testing-library.com/) for testing.
It is intended that all developers do test-driven development (TDD) when working on this project. Therefor,
coverage rules are high. The exact rules are defined in `jest.config.js`.

You can run tests and coverage with the following commands:
- `npm run test` to run tests
- `npm run coverage` generates a coverage report
- `npm run coverage:changed` generates a coverage report for changed files after the last commit
- `npm run coverage:last-commit` generates a coverage report for the files changed in the last commit

## Storybook

This project uses [`storybook`](https://storybook.js.org/) to develop and document components in isolation.
It is intended that all developers use storybook to develop components. Therefor, all components should have
a storybook story. This is to ensure that components are developed in isolation and are documented.

You can run storybook with the following command:
- `npm run storybook` to run storybook

*NB:* As of writing, the storybook setup does not properly host the correct fonts. This is a known issue and
will be fixed in the future.

## Committing

This project uses [`husky`](https://typicode.github.io/husky/) to manage git hooks

The following commit hooks are run on `git commit`:
- `commitlint` to ensure that your commit message follows the [conventional commits](https://www.conventionalcommits.org/en/v1.0.0/) format.
- `npm run test` to ensure that your code passes all tests
- `lintstaged` fixes linting errors with `eslint --fix` and formats your code with `prettier`

You should also adhere to the following rules when committing:
- The commit footer should contain the issue number in the format `fix #<issue number>` (with 4 digits and leading zero's).
  For example, `fix #0001` or `re #0001` in the case of revisiting an issue.

You can use `npm run cm` to get an interactive CLI tool for composing commit messages.

## Component framework

This project uses [`NextUI`](https://nextui.org/) as a component framework. 
NextUI is built on top of [`tailwindcss`](https://tailwindcss.com/).

### Importing components

**Rule:**
Importing components from NextUI should be from `@nextui-org/<component-name>`
and not from `@nextui-org/react`. This is to ensure components work with server-side rendering.

**Exception:**
If you need to import something else from `@nextui-org/react` (e.g. `NextUIProvider`)
you need to disable the eslint rule for that line with:
```
/*
* Working around NextUI import rule by disabling the rule for this line.
* See `CONTRIBUTING.md` for more information.
*/
/* eslint-disable-next-line no-restricted-imports */
```


### Tips
Most popular IDEs have plugins for tailwindcss that provide intelligent auto-completion
relative to the tailwindcss theme configuration.

## Environment variables

This project has multiple environment variables checked in to source control as these
does not contain any sensitive information yet. If you need to add a secret environment
variable, you should create and add it to `.env.local` or `.env.{environment}.local` and
exclude it from source control with `.gitignore`.

## Docker

This project uses [`docker`](https://www.docker.com/) to run the application in a containerized environment.
The production docker file is a multi-stage build to limit the size of the image.

To build the docker image, run `docker build -t <image name> .` in the root of the project.
To run the docker image, run `docker run -p 3000:3000 <image name>`.

## Deployment

We deploy to azure with github actions whenever pushed to the `main` branch. 
You can also deploy manually. You will need to install the azure cli first.

**Deploy manually**
```
az login
az acr login --name mindstertv

docker build -t mindstertv.azurecr.io/mindster-tv .

docker push mindstertv.azurecr.io/mindster-tv
```

*NB:* You will need azure access to deploy manually
