# gladknee 😄🦵

Gladknee is an open-source utility library of 100+ useful functions written in TypeScript.<br><br>

#### What this library includes...

<ul>
<li>Abstractions of commonly needed functionality (i.e. lowerCaseNoSpaces, debounce, pause, etc)</li>
<li>Safe alternatives to JavaScript weirdness (i.e. sorting negative numbers)</li>
<li>Abstractions of common browser-related functionality (i.e. cookies, geolocation, saving files, etc)</li>
<li>Abstractions of computer-sciency things (i.e. sorting algorithms, queues, stacks, etc)</li>
</ul>

#### What this library does not include...

<ul>
<li>Custom classes that are just re-hashings of existing classes (i.e. "Sequence" instead of array)</li>
<li>Custom functions that are just re-hashings of existing functions (i.e. array.includes())</li>
<li>Abstractions of things you don't need a library for (i.e. get element from array at index N)</li>
<li>Type checking in JavaScript</li>
</ul>
<br>

#### Installation

To add to your project, just run `npm install gladknee`

#### Usage

To use any functions from the library, simply import the specific function(s) you wish to use where needed.

```typescript
import { memoize } from "gladknee"

const memoizedFunction = memoize(someFunction)
```

### Documentation

You can read the full documentation with a complete list of functions with examples at <a href="https://gladknee.readme.io/">https://gladknee.readme.io/</a>
