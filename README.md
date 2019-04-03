# PDX Urban Dashboard

## How to Deploy

#### Docker

In order to deploy the app in docker, you must have docker and docker-compose
installed. You must also export UID, so the processes in the container can run
as your user (this is important to prevent root from creating a bunch of files
in your project repo, do this by running `export UID`. Then run
`docker-compose up` to launch the container.

#### setup

To begin the project locally, you'll need to install a few global libraries.
The first being [NodeJS](https://nodejs.org/en/download/).

After NodeJS, you'll need to install a couple more libraries using `npm` which was
installed with NodeJS. We use `yarn` as a package manager and you'll need to install that
first using `npm install yarn -g`.

#### installation

Once these are installed, you'll need to run `yarn install` which will
go and fetch all of the project dependencies. At this point, you should be
ready to begin running the project. Below, you can find the various scripts available
to run.

## Available Scripts

In the project directory, you can run:

#### `yarn start`

Runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.<br>
You will also see any lint errors in the console.

#### `yarn build`

Builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.<br>
Your app is ready to be deployed!

#### `yarn test`

Runs all jest tests configured in the project. Jest tests are found
using the pattern `<filename>.test.js` or `<filename>.spec.js`.
You can also specify the test file you want to run using `yarn test <filename>`
where filename does not need to include the extension.

#### `yarn lint`

Runs the project linter and prints the errors to the console.

#### `yarn eject`

> Note: this is a one-way operation. Once you eject, you can’t go back!

If you aren’t satisfied with the build tool and configuration choices, you can eject at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (Webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except eject will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use eject. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.
