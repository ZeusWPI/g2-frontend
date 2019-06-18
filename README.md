# G2 Front-end
The goal of this part of G2 is to provide a front-end application which interacts with a JSON back-end and renders beautiful pages.

## Getting started

### Prerequisites
You will need to install [node.js](https://nodejs.org). Make sure that your node.js installation includes [NPM](https://www.npmjs.com/)

You will also need to install [yarn](https://yarnpkg.com/). You either install it from the official website, your package manager, or use the NPM command:
~~~
npm install yarn -g
~~~

You will also need to install the [Vue CLI](https://cli.vuejs.org/)
~~~
npm install -g @vue/cli
~~~

### Installing
1. Clone the repository.
2. Enter the created directory.
3. Execute the following command to install the projects dependencies:
   ~~~
   yarn install
   ~~~

### Running
To start a development server, run:
~~~
yarn serve
~~~
This should start an instance of the server on a given port.

### Building
To compile the production build,  run:
~~~
yarn build
~~~

## Conventions

### Styling
We try to follow the [BEM conventions](http://getbem.com/naming/) for naming css classes.

Inline styling should be avoided at all cost!

## Contact
If you have any questions about setting up the project or about the codebase you can contact @maartenvn or @abeformatter on [mattermost](chat.zeus.gent)
