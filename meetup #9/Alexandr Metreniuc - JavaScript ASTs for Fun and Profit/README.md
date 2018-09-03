# JavaScript ASTs for Fun and Profit

    Since almost every JavaScript developer uses tools like Eslint or Babel it is nice to dive a bit into how things work under the hood. Abstract Syntax Trees are an useful representation of a program to work with.
    One more less known (but not less fun) tool that uses ASTs is codemod. Basically, it helps a large codebase to accomplish big changes through a script.
    The talk covers some general concepts and tools that will help to take advantage of ASTs now.

[**Slides**](https://slides.com/alexandrmetreniuc/jsasts/fullscreen)

## **Resources:**

- [Code Transformation and Linting with ASTs Workshop](https://www.youtube.com/watch?v=-iA7TAUGn2Y) from Kent C Dodds - a good intro into the whole AST stuff.
- [Babel Plugin Handbook](https://github.com/jamiebuilds/babel-handbook/blob/master/translations/en/plugin-handbook.md) - A good overview of how Babel works and a good set of guidelines on how to develop a Babel plugin.
- astexplorer.net - a perfect tool for exploring the AST and interactive development of a plugin.
- [Babel docs on its helpers](https://babeljs.io/docs/en/babel-types).
- [How writing custom Babel & ESLint plugins can increase productivity & improve user experience.](https://blog.kentcdodds.com/how-writing-custom-babel-and-eslint-plugins-can-increase-your-productivity-and-improve-user-fd6dd8076e26)
- [babel-codemod](https://github.com/square/babel-codemod) - a tool to run a Babel plugin as a codemod.
- [Videos about Babel and ASTs](https://babeljs.io/videos.html).
- Codemods:
  - JS codemods https://github.com/cpojer/js-codemod
  - React codemods https://github.com/reactjs/react-codemod
