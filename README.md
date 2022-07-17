# code-verifier-backend
Node Express project following OpenBootcamp's course for fullstack web dev. with MERN technologies.

## Dependencies Installed - Types of dependencies. 

There are two types of dependencies in our project (both specified in package.json file)  : **dependencies** and **devDependencies**, each of them with different purposes. 

In our **code-verifier-backend project** we are working with:

> dependecies

`Express` which is one of the most popular frameworks for NodeJS. 
`DotEnv`, a package that secures environmental variables such as secrets and app configurations  often set outside of a programm.  We are currently using just 	**PORT**.

> devDependencies

`TypeScript`. A superset of JavaScript that adds optional static typing to the language and transpiles it to a specific version of our choice. In our case ES6. Then we have @types for the different packages we are working with . `@types` are declaration files or predefined modules that describe the types of JavaScript present in a package so that TypeScript would be able to read and transpile it into JavaScript.

We are also using `ts-node`, a TypeScript execution engine for Node or in other words a NodeJS module that uses the TypeScript compiler to transpile TypeScript code and run it in Node.

Another addition to the TypeScript stack of packages is `ts-jest` that enables us to use Jest (javascript testing framework) to test code written in TypeScript. 

We have installed `supertest` as well, to be able to test HTTP.

`serve` package serves our code coverage report when testing and provides us with an interface.

For security reasons and to protect the app from web vulnerabilities such as XSS, Content Security Policy, and others, we have `helmet` , a collection of middleware functions that set security-related HTTP response headers. 

Following the line of security, the addition of `cors` package lets us enable CORS (cross origin resource sharing, a mechanism that supports secure cross origin requests and data transfers between browsers and servers by setting supplementary HTTP headers) and a couple of optional configurations like whitelisting certain domains or allowing only some HTTP methods to our app. 

In order to enforce styling and linting errors as we develop we use EsLint and a couple of plugins.  We are following the standard version. 

`nodemon` watches our files detecting changes in our code and helps us in the proccess of development.

`mongoose` ORM for mongodb and NodeJS that gives structure to mongodb collections and gives us extra features like validation, query building, type casting, etc.

And last but not least `webpack` to bundle JavaScript files for usage in a browser and compress the size of our code.

## Scripts in package.json

**build**: `npm run build`  transpiles TypeScript files into Javascript.
**start**: `npm run start` runs index.js in dist folder. This is the main file of our project.
**dev**: `npm run dev` executes concurrently so that we can watch for changes in our TypeScript files and transpile it into JavaScript and then with nodemon be able to restart the server and run our main project file again.
**test**: `npm run test`executes jest for testing.
**serve:coverage**: `npm run serve:coverage` runs our tests then accesses to the coverage report and serves it to an interface.
