# Frontend readme

* Packages
    * Run `yarn install` (please use yarn instead of npm) in the folder with package.json to install your dependencies
    * To add a new package `yarn add foo` 
    * Commit yarn-generated changes to package.json and yarn.lock with your PR
* Pages
    * Do all your work in the `pages` subfolder
    * The file name is automatically the route. For example, 
        * `index.tsx` is /
        * foo.tsx is /foo
        * bar/index.tsx is /bar
        * bar/mango.tsx is /bar/mango
* Run local (Development)
    * `yarn dev` 
    * When you run yarn dev it will run automatically on [http://localhost:3000](http://localhost:3000/) 
    * Changes to /pages while `yarn dev` is running are automatically reloaded, you don’t need to restart the server
* Pull request
    * Do all  your work on a  new branch using git ~ `git checkout -b my_work`
    * Make sure to `yarn format` to make sure that any code style issues can be autofixed
        * tip: you can use the provided `.editorconfig` file to automatically configure your editor style settings *just for this project* without having to change them normally. check your editor’s plugins repo for the .editorconfig support. VS code supports this!
    * Please start your pr title with [training-website]
        * Example: `[training-website] fix issue #32 which resolves a bug`
    * Make sure your branch contains all the fixes from `main` branch so there won’t be any merge conflict



