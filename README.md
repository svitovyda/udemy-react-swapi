# Udemy-React-SWAPI

A project inspired by example in one of React courses on udemy, reworked
on `typescript` to use some other React
cool features than were used in the course.

A test application that renders data about Star Wars characters, planets and
starships.
Depends on fork of Paul Hallett https://github.com/phalt/swapi
- https://swapi.dev/.

In a first iteration I created oldschool plane classes that handle some
lifecycle business logic; wrote all the components
as functional, on TypeScript.

In next iterations I want to use Contexts, more of the hooks combination and
possibly Redux.

## Requires

- `node v16.10.0`
- `yarn v1.22.10`

optional - `http-server`, `depcheck` tools

## Uses

- `react` with `emotion` styling
- `webpack` module bundler with `babel-loader` `preset-typescript` for 
 `typescript` compilation
- `yarn` package manager
- `Lefthook`/`Prettier`/`ESLint` code/formatting checking
- `jest` unit testing

## How to use

- clone
- run `yarn` in the root

`yarn start` to run in dev mode

Set the environment variables `ENV_NAME` and `APP_VERSION` and run `yarn build`
to get the publish version in the `output` folder. Or run `yarn build:prod`.
Optional: `npx http-server ./output` and navigate to `http://127.0.0.1:8080` to
check how production vesion works.

`yarn test` to run unit tests

`yarn test:full` to get the code tests coverage report

To debug tests in VS,
see https://code.visualstudio.com/docs/editor/debugging#_launch-configurations

_Note:_ having `yarn.lock` in the repository helps team to make sure everyone
uses absolutely the same packages versions

## Assets and styles

- Death Star SVG by Nichole Kazarinoff from the Noun Project
- Darkly from https://bootswatch.com/
