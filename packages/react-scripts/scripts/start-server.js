const fs = require('fs-extra');
const path = require('path');

require("@babel/register")({
    presets: ["@babel/preset-env", "@babel/react"]
});

const NODE_ENV = process.env.NODE_ENV || "production";

var dotenvFiles = [
    `.env.${NODE_ENV}.local`,
    `.env.${NODE_ENV}`,
    // Don't include `.env.local` for `test` environment
    // since normally you expect tests to produce the same
    // results for everyone
    NODE_ENV !== 'test' && `.env.local`,
    '.env',
].filter(Boolean);
  
// Load environment variables from .env* files. Suppress warnings using silent
// if this file is missing. dotenv will never modify any environment variables
// that have already been set.  Variable expansion is supported in .env files.
// https://github.com/motdotla/dotenv
// https://github.com/motdotla/dotenv-expand
dotenvFiles.forEach(dotenvFile => {
    if (fs.existsSync(dotenvFile)) {
        require('dotenv-expand')(
            require('dotenv').config({
                path: dotenvFile,
            })
        );
    }
});
  

// Import the rest of our application.
const appDirectory = fs.realpathSync(process.cwd());
const resolveApp = relativePath => path.resolve(appDirectory, relativePath);

module.exports = require(resolveApp(process.env.SERVER_INDEX + '.js'));