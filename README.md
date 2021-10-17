# Udemy-React-SWAPI

A project inspired by example in one of React courses on udemy, reworked on `typescript` to use some other React
cool features than were used in the course.

A test application that renders data about Star Wars characters, planets and starships.
Depends on fork of Paul Hallett https://github.com/phalt/swapi - https://swapi.dev/


## Requires
- `node v16.10.0`
- `yarn v1.22.10`

optional - `http-server` `npm` package

## Uses
- `react` with `emotion` styling
- `webpack` module bundler with `ts-loader` for `typescript` compillation
- `yarn` package manager
- `Husky`/`Prettier`/`ESLint` code/formatting checking
- `jest` unit testing
- style - Darkly from https://bootswatch.com/

## How to use
- clone
- run `yarn` in the root

`yarn start` to run in dev mode

`yarn build` to get the publish version in the `output` folder.
Optional: `npx http-server ./output` and navigate to `http://127.0.0.1:8080` to check how it works.

`yarn test` to run unit tests

`yarn test:full` to get the code tests coverage report


To debug tests in VS, see https://code.visualstudio.com/docs/editor/debugging#_launch-configurations

_Note:_ having `yarn.lock` in the repository helps team to make sure everyone uses absolutely the same packages versions
