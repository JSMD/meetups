The summary blog post: [https://gurdiga.github.io/blog/2017/02/25/my-3-why-typescript/](https://gurdiga.github.io/blog/2017/02/25/my-3-why-typescript/).

Bulleted list:

- intro
  - eu
    - atitudinea istoric
    - conversia
  - TS
    - [visual](https://cdn-images-1.medium.com/max/800/1*8lKzkDJVWuVbqumysxMRYw.png)
    - superset: ES.Next + transpiler + type checker
    - open source
    - written in TS 👍
    - inference → optional types
    - ~[adjustable](https://www.typescriptlang.org/docs/handbook/compiler-options.html) level of strictness
- 1. read
  - because of types
- 2. write
  - types as design tool
  - ~no lock-in: compiles to clean JS
  - adjustable transpilation: tsc --target ESNext --lib dom,es6 ad-hoc.ts
- 3. change
  - because of [tsserver](https://github.com/Microsoft/TypeScript/wiki/Architectural-Overview")
  - demo (with log tail)
  - compare with a JS project
- outro
  - types are there anyway: implicit or explicit
  - type checker is a helpful assistant
  - tradeoffs 😸
    - missing type definitions ([out of DefinitelyTyped](https://github.com/DefinitelyTyped ))
    - need to learn to understand (and appreciate) type errors
  - 2 resources: handbook + book
