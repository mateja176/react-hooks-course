# React Hooks Course

## Table of contents

- [React Hooks Course](#react-hooks-course)
  - [Table of contents](#table-of-contents)
  - [Motivation](#motivation)
  - [Translating class patterns to functional components with hooks](#translating-class-patterns-to-functional-components-with-hooks)
    - [State management](#state-management)
      - [setState](#setstate)
      - [useState](#usestate)
      - [Multiple state fields with setState](#multiple-state-fields-with-setstate)
      - [Multiple state fields with useState](#multiple-state-fields-with-usestate)
      - [Async setState](#async-setstate)
      - [Async useState](#async-usestate)
    - [Reduced pattern](#reduced-pattern)
      - [useReducer](#usereducer)
      - [Reducer pattern with class components](#reducer-pattern-with-class-components)
      - [useReducer hook](#usereducer-hook)
      - [useReducer with reset](#usereducer-with-reset)
    - [React Context and Hooks](#react-context-and-hooks)
      - [Component.contextType](#componentcontexttype)
      - [Context.Consumer](#contextconsumer)
      - [useContext](#usecontext)
    - [Ref pattern](#ref-pattern)
      - [Mutable class properties](#mutable-class-properties)
      - [Accessing DOM node references](#accessing-dom-node-references)
      - [Accessing a class component instance](#accessing-a-class-component-instance)
      - [createRef](#createref)
      - [Refs and functional components](#refs-and-functional-components)
      - [useRef](#useref)
      - [useImperativeHandle](#useimperativehandle)
    - [Lifecycle methods](#lifecycle-methods)
      - [componentDidMount](#componentdidmount)
      - [useEffect on mount](#useeffect-on-mount)
      - [componentWillUnmount](#componentwillunmount)
      - [useEffect will unmount](#useeffect-will-unmount)
      - [componentDidUpdate](#componentdidupdate)
      - [useEffect did update](#useeffect-did-update)
      - [The why of dependencies](#the-why-of-dependencies)
      - [useLayoutEffect](#uselayouteffect)
    - [Properties and methods](#properties-and-methods)
      - [useMemo](#usememo)
      - [useCallback](#usecallback)
      - [useMemo vs React.memo](#usememo-vs-reactmemo)
      - [Is memoization worth it](#is-memoization-worth-it)
  - [Rules of hooks](#rules-of-hooks)
  - [useDebugValue](#usedebugvalue)
  - [Creating your own hooks](#creating-your-own-hooks)
    - [Implementing redux with useContext and useReducer](#implementing-redux-with-usecontext-and-usereducer)
    - [useFetch](#usefetch)
    - [usePagination](#usepagination)
    - [Going up a notch with middleware](#going-up-a-notch-with-middleware)
    - [Angular like services and dependency injection](#angular-like-services-and-dependency-injection)
  - [Hooks vs HOC's](#hooks-vs-hocs)
    - [Pros of hooks](#pros-of-hooks)
      - [Selecting a value from the state with HOC's](#selecting-a-value-from-the-state-with-hocs)
      - [Selecting a value from state with hooks](#selecting-a-value-from-state-with-hooks)
    - [Cons of hooks](#cons-of-hooks)
      - [Create multiple components with a single HOC](#create-multiple-components-with-a-single-hoc)
      - [Create multiple components with a single hook](#create-multiple-components-with-a-single-hook)
      - [Create multiple components with a single HOC 2](#create-multiple-components-with-a-single-hoc-2)
      - [Create multiple components with a single hook 2](#create-multiple-components-with-a-single-hook-2)
  - [Migrating common libraries to hooks](#migrating-common-libraries-to-hooks)
    - [react-redux](#react-redux)
    - [react-router](#react-router)
    - [material-ui](#material-ui)
    - [xstate](#xstate)
    - [styled-components](#styled-components)
    - [react-spring](#react-spring)
  - [Parting message](#parting-message)

To be able to get the most out of this course it's best if you are already familiar with JavaScript, React and Typescript, although not necessary to follow along, is strongly recommended.

## Motivation

In the words of the creators:

- It’s hard to reuse stateful logic between components
- Complex components become hard to understand
- Classes confuse both people and machines

If you want to read up on the why of hooks you may do so by following [this](https://reactjs.org/docs/hooks-intro.html#motivation) link.

There's even an [introductory video](https://youtu.be/dpw9EHDh2bM) on hooks by Dam Abramov

## Translating class patterns to functional components with hooks

### State management

#### setState

<!-- <iframe src="https://stackblitz.com/edit/react-setstate-example" width="100%" height="500px" /> -->

#### useState

<!-- <iframe src="https://stackblitz.com/edit/react-usestate-demo" width="100%" height="500px" /> -->

We immediately notice that the example relying on `useState` is slimmer. For example, we didn't have to declare the type of the name state since it was inferred based on the initial value which was once again `''`. We invoked `setName` with the new value for the name state instead of passing it an object.

However, there are a few things to note here. When `setName` is invoked the `HelloContainer` component is rerendered with the value passed to the setter. This means that even if `initialValue` had changed by the time of the rerender, it would not   affect the name state.

Wait a second, I got a call from the product owner. He said that the new requirement is that the greeting rendered by the `Hello` component should not change immediately as the user is typing into the input, but should instead update only when the user submits the update. Fear not, once again we can tackle the challenge using the `useState` hook. Let's delve deeper into exploration by answering the question of how to handle multiple state fields.

#### Multiple state fields with setState

<!-- <iframe src="https://stackblitz.com/edit/react-setstate-mutiple" width="100%" height="500px" /> -->

#### Multiple state fields with useState

<!-- <iframe src="https://stackblitz.com/edit/react-usestate-mutiple" width="100%" height="500px" /> -->

This was fairly easy. However, you might ask: Why did we have to add another `useState` hook. This brings us to another notable difference. Namely, the `useState` setter does not merge the argument with the rest of the state. Meaning that  you would have to spread the current state in order to perform a partial update. Hence it is generally recommended to combine your state fields into an object if they are being set simultaneously.

Wait, it's the product owner again. The new business rule states that greeting should only update a second after the user submitted. And on top of that, if the user updates the value during the second after submitting, the name should be updated with the most recent value. This sounds complicated, but it is in fact easy to implement! Similarly to `setState`, the setter function which is the second element of the array returned by the `useState` also accepts a callback function which guaranteed to be invoked with the latest value. Enough of the talk.

#### Async setState

<!-- <iframe src="https://stackblitz.com/edit/react-async-setstate" width="100%" height="500px" /> -->

#### Async useState

<!-- <iframe src="https://stackblitz.com/edit/react-async-usestate" width="100%" height="500px" /> -->

Notice that we invoked `setName` inside the callback passed to `setValue`. The alternative would have been to combine the two state fields into an single object. However, this would mean that in order to update either `value` or `name`, we would have to spread the current state along with providing a new value for the given field. But wait, it's not the product owner this time, instead it is a colleague from the development team.

> What if the state update logic becomes complex or the state involves multiple sub-values? Is this the point where we reach for redux?

I'm glad you asked my friend, and the answer is no, not necessarily. Let's consider the following hook which is a close cousin to the `useState` hook in the next section.

### Reduced pattern

#### useReducer

As mentioned above and as it is said in the official [docs](https://reactjs.org/docs/hooks-reference.html#usereducer):

> `useReducer` is usually preferable to `useState` when you have complex state logic that involves multiple sub-values or when the next state depends on the previous one.
> `useReducer` also lets you optimize performance for components that trigger deep updates because [you can pass  `dispatch`  down instead of callbacks](https://reactjs.org/docs/hooks-faq.html#how-to-avoid-passing-callbacks-down).

Now, this pattern is not something which was carried over from the class component pattern, however we can still implement it using class components. And below is an example of what a possible implementation may look like.

#### Reducer pattern with class components

<!-- <iframe src="https://stackblitz.com/edit/react-reducer-pattern" width="100%" height="500px" /> -->

The above approach is quite verbose however is more scalable. Now let's pay a visit to the man of the hour, low and behold the `useReducer` hook.

#### useReducer hook

<!-- <iframe src="https://stackblitz.com/edit/react-usereducer-example" width="100%" height="500px" /> -->

First of all, you may have noticed that the `reducer` function is declared outside out the component and as such it is not coupled to the component. This means that the logic for updating the state is replaced and reused in other places, it is effectively abstracted away from the component. On top that, the update logic is easier to maintain, since adding and updating of individual cases is straightforward. However, there's more to it as we will discuss in the **Creating your own hooks** section. In a nutshell, our reducer is a pure function. Hence the missing puzzle piece is the ability to perform side effects. Luckily for us the redux architecture is easily extensible with [middleware](https://redux.js.org/glossary#middlewareh). In the case of the `useReducer` hook, we can create quasi [thunks](https://www.npmjs.com/package/redux-thunk) and [epics](https://redux-observable.js.org/docs/basics/Epics.html) and more. Let's first complete our tour of available React hooks. With a very powerful effectful pattern.

#### useReducer with reset

As an added bonus, let's go through an example of how to reset the reducer state.

<!-- <iframe src="https://stackblitz.com/edit/react-usereducer-with-reset" width="100%" height="500px" /> -->

It's nothing too crazy.

### React Context and Hooks

If `useReducer` impressed you just wait until you see the next hook which is related to a very powerful React API, namely, the [Context API](https://reactjs.org/docs/context.html). We'll soon be exploring the examples, however first comes a practical refresher how to use the Context API. It all starts with the context creation using `React.createContext`. It's straightforward, the `createContext` function accepts an initial value. Based on the shape of the initial value, React is going to determine the type of the context, or the other way around - if you provide a type argument React is going to enforce the type of the initial value and all future values whom you're going to set the context with.

#### Component.contextType

<!-- <iframe src="https://stackblitz.com/edit/react-contextype" width="100%" height="500px" /> -->

#### Context.Consumer

<!-- <iframe src="https://stackblitz.com/edit/react-context-consumer-example" width="100%" height="500px" /> -->

#### useContext

<!-- <iframe src="https://stackblitz.com/edit/react-usecontext-example" width="100%" height="500px" /> -->

### Ref pattern

The ref pattern commonly is utilized to access DOM node references. However, a ref object is generic and can hold a reference to basically anything. The reference is mutable and we can reassign values to it over time.

> Something which changes over time. But, wait, isn't the practically the definition of **state**?! Does this mean that refs and state are the same thing?

Yes, they are similar concepts, however there is a key difference. That difference lies in the fact that mutating a ref does not cause a rerender, unlike setting the state does.

Practically, there's an significant difference when it comes to interaction between refs and the `useEffect` hook, compared to state and `useEffect`, but let's not get too fast ahead of ourselves.

Now with that behind us. Since class fields are mutable by default , the simplest way to implement the ref pattern with class components is to just declare a class property. Bear in mind that the class field syntax in not yet part of the JavaScript spec, however it is one step away from. To quote MDN:

> Public and private field declarations are an  [experimental feature (stage 3)](https://github.com/tc39/proposal-class-fields)  > proposed at  [TC39](https://tc39.github.io/beta/), the JavaScript standards committee. Support in browsers is limited, but ?> the feature can be used through a build step with systems like  [Babel](https://babeljs.io/).

   The good news for React developers who are using `create-react-app` is that we are able to use more than just ES2015 language features. One of these additional language features happens to be class fields, however [here](https://create-react-app.dev/docs/supported-browsers-features/#supported-language-features) is a complete list.

#### Mutable class properties

<!-- <iframe src="https://stackblitz.com/edit/react-usereducer-example" width="100%" height="500px" /> -->

*Note* if the `handleChange` property from the above example were a method instead, in the form of:

```tsx
handleChange() {
  /* handle change */
}
```

Then the would not work correctly because the callback is invoked in the global context instead of the context of the class component. What this means piratically is that `this` would refer to the global object which in case of the browser is the `window` instance, whose value can be anything.  Alternatively, we could have bound the method in the constructor:

```tsx
this.handleChange.bind(this)
```

Which was a common practice before the introduction arrow functions and the class field syntax.

"What's the difference with arrow functions?" You may ask. Basically arrow functions do not have a dynamic context. Instead  they "capture" the outer context in which they are declared in.  Regardless of the context our `handleChange` function is invoked reference to `this` inside it's body is going to refer to the component class context.

With that in mind, that above example is still not going to function as intended. It demonstrates the difference between state and refs. The `console.log` gives us a little more insight what's happening. Namely, the event target's value is assigned to the name field. In the beginning the name property is equal to "Jane". Furthermore, if you enter the letter "a" with your cursor positioned at the end of the input, the `handleChange` method is invoked with an event whose target's value is "Janea". Next, if you enter the letter "e", the `handleChange` method is again going to be invoked. The question is, what is the name field's value going to be after the assignment? Pause for a second to think about it. I'll list out a few options:

1. Jane
2. Janeae
3. Janea
4. Janee

<details>
  <summary>
     So what's the correct option?
  </summary>
  It may still be a little confusing and that is normal, but if you analyze the event step by step , like we did before, everything becomes clear. The event target's value is going to be "Janee" because the components render method hasn't been invoked since (granted that the parent component hasn't been rerendered either). Having established this the rest is the same as before. Namely the value of the target (input) at the time of the keyboard event taking place is "Jane" and the character "e" which was entered is appended to the end. Finally, the name value "Janee" is assigned to the name field.
</details>

<br />

Now with that out of the way. We can use this property of refs to our advantage. In certain situations you may not want to have the component rerender, but you may still want to be able to react to the user's input. In the following scenario we'll keep track of the number of time the user clicked on the plus button until the count reaches 5, at which point the Count component is going to unmount and rely the information about the number of clicks to it's parent

<!-- <iframe src="https://stackblitz.com/edit/ref-pattern-mutable-class-properties" width="100%" height="500px" /> -->

There's one important detail to note here. Namely, in the `Count` component's render method it is imperative not to destructure the count field. This is because, in JavaScript, numbers  are among value types which. In contrast to reference types like objects, when a value type is assigned to a constant or variable, a new value is created and the constant or variable which is being assigned to becomes a reference to the newly created object. In this case, since we want to mutate the class property, hence we may to access the reference to the variable through the `this` object.

#### Accessing DOM node references

Bear in mind the example we are about to see can be improved upon and we will do so in a subsequent section.

<!-- <iframe src="https://stackblitz.com/edit/accessing-dom-node-references" width="100%" height="500px" /> -->

In the example above we used the [getBindingClientRect](https://developer.mozilla.org/en-US/docs/Web/API/Element/getBoundingClientRect) method on the [HTMLDivElement](https://developer.mozilla.org/en-US/docs/Web/HTML/Element/div) instance to get the element's width and height, in pixel units, at moment in time. Next, we set the component state causing the render method to be invoked once again, this time with the updated width and height values.

#### Accessing a class component instance

The ref prop is a special prop in the sense that you cannot access it inside a component by typing `this.props.ref` in case of class components. Although, if you pass a ref to a class component's instance you'll have access the instance object. Meaning that you will be able to imperatively invoke methods on the component and access public properties.

> When would this be useful?

A prime example is setting the focus on an input element. Consider the text editor library [draft-js](https://npmjs.org/package/draft-js). From my experience, the library has a hockey stick like learning curve. Meaning that it is difficult to learn at first, but once you grasp the basic concepts and mechanisms it becomes rather easy to do more complicated stuff with it. To quote the official [draft-js docs](https://draftjs.org/docs/advanced-topics-managing-focus/#__docusaurus)

> Managing text input focus can be a tricky task within React components. The browser focus/blur API is imperative, so setting or removing focus via declarative means purely through  `render()`  tends to feel awkward and incorrect, and it requires challenging attempts at controlling focus state.
> With that in mind, at Facebook we often choose to expose  `focus()`  methods on components that wrap text inputs. This breaks the declarative paradigm, but it also simplifies the work needed for engineers to successfully manage focus behavior within their apps.

<!-- <iframe src="https://stackblitz.com/edit/accessing-class-component-instance" width="100%" height="500px" /> -->

The editor component is basically a `textarea`, except that it isn't a text area but instead relies on [contentEditable](https://developer.mozilla.org/en-US/docs/Web/Guide/HTML/Editable_content) which brings with itself a whole class of issues like cross browser inconsistencies. If you're interested in this topic you can check out [video](https://youtu.be/feUYwoLhE_4) by Isaac from the draft team. Luckily for us, the draft team has overcome these obstacles and presented draft-js users with a nice API.

#### createRef

In the section **Accessing DOM node references** I told you that the example can be improved upon and the time has come to see how.

<!-- <iframe src="https://stackblitz.com/edit/react-create-ref" width="100%" height="500px" /> -->

> That's it? Doesn't seem like much of an improvement

Indeed, it's not a quantum leap. However, we didn't have to explicitly type the `editorRef` property. Instead we  passed the type of object whose reference we'd like to store.

> Why did you pass `EditorState | null`, instead of just `EditorState`

Thanks for the question, this ties in with the constructor which too is newly added. Inside the body of the constructor method the value of `this.editorRef` is logged. At which point the ref is equal to `{ current: null }`. We already mentioned that at the time of `componentDidMount` being invoked, refs will already have been updated. This means that the refs are updated somewhere in between the constructor phase and the before the mount phase.

The life cycle doesn't finished there though. In the above example there's also an additional `componentWillUnmount` method along with the App component which renders a button, which when clicked mounts or unmounts the `MyEditor` component. Pay attention to an extra difference between manually creating a ref object compared to using `React.createRef`. Namely, React is going to take care of setting the ref object, returned by invoking `React.createRef`, to back to `{ current: null }` again.

> Why is this a good thing?

Simply, the DOM node whose reference is stored in the class property does not exist in the DOM anymore after the component has been unmounted. React plays the role of your friend telling you that the coupon for the Indian restaurant which you were planning to spend is no longer valid because the restaurant already closed down. So going to the restaurant would be a waste.

In conclusion, when using the `React.createRef` API to access a DOM node's reference. Initially the ref object's current property is going to be equal to `null`. After the constructor phase and before `componentDidMount` is invoked, the ref object's current property is going to be a reference to the given DOM node. Finally, before `componentWillUnMount` is invoked the ref object's current property is once again going to equal to `null`.

#### Refs and functional components

Functional components do not support refs out of the box, since they are stateless and not produce object instances like classes. We can however forward a ref from a functional component.

<!-- <iframe src="https://stackblitz.com/edit/refs-and-functional-components" width="100%" height="500px" /> -->

The first type parameter of forwardRef is the type of HTML element the ref is going to be forwarded to. Whereas the second one represents the props of the component. Furthermore, the callback passed to the forwardRef function now received an additional second argument which is the ref to be forwarded. To which element the ref is going to be forwarded exactly is up to the functional component to decide.

Furthermore, if you've ever searched the web for a React component library chances are that you've come across [material UI](https://material-ui.com) at some point. According to the following npm trends [chart](https://www.npmtrends.com/@material-ui/core-vs-antd-vs-react-bootstrap-vs-reactstrap-vs-semantic-ui-react) material ui is the most popular React component library. Popularity aside, material ui is a set of react components which implement the [material design spec](https://material.io/design). If you've used any of Google's products chances are that you've got a taste of the material design look and feel. Apart from that material ui has a wide assortment of component you can choose from which is ever evolving through [@material-ui](https://npmjs.org/package/@material-ui/lab). All of the components are well documented with lots of examples and there's even a theming system and a `Box` component primitive. There's also a few quirks here and there as demonstrated above.

As a side note, I haven't been payed to promote them, I laid out the major benefits of the library so that some of you may resonate with them.

#### useRef

There was a lot to take in when in comes to refs however if you've come this far you may indulge in the ergonomics of the `useRef` hook.

<!-- <iframe src="https://stackblitz.com/edit/react-use-ref" width="100%" height="500px" /> -->

Once again, the code is quite a bit more concise. However, the `editorRef` declaration looks eerily similar to the above example where we used `createRef`.

> Then, what's the difference between between `useRef` and `createRef`? What would happen if we replaced the `useRef` call above with an `createRef` invocation?

You wouldn't immediately notice a difference, however, it's not recommended to use `createRef` inside the body of a functional component because of performance reasons. That is because `createRef` returns a new reference each time it is invoked, in this case being every time the FC is rendered. In the context of a single component life cycle, `useRef`, is always going to return the same reference.

What a build up and culmination, but I feel like something is missing...

Up until now, we talked about how refs can represent DOM node instances or class component instances. However we also talked about how refs can be basically anything. Furthermore, being able to access public properties on class component instance and imperatively invoke the methods seems like quite an advantage. This is, after all, a very common pattern in frameworks like Angular. This section is dedicated to the ones who asked themselves how this mechanism could be applied to functional components.

It might not seems perfectly clear how to go forward, but for starters, we know how to forward a ref to a functional component. In a sense, a functional component is equivalent to class component instance's render method. As such, it may be difficult to imagine how a FC can harbor properties and method. The answer  is simple. Constants and variables declared inside the function body may represent properties and functions may represent method.

> But, what about a shared context, through `this`?

Guess what, the body of a functional component represents already context which is shared across variables and functions.

Taking this idea a step further, in contrary to class components everything inside a FC's body is private by default. Meaning that the outside world has no knowledge of any variables or functions declared inside it. However, we do want to expose certain variables and functions. and we can easily do so by mutating the ref's `current` property.

<!-- <iframe src="https://stackblitz.com/edit/react-use-imperative-handle" width="100%" height="500px" /> -->

It works exactly like you'd expect it to. However, there are a few things to note here. Starting with the `if (ref)` inside the `Hello` component. It seems excessive according to the type signature of the `ref` which is `((instance: IHello) => void) | React.MutableRefObject<IHello>`. There is no mentioned of `null` or `undefined`, however if you do not pass a ref to the component upon instantiation, like `<Hello />`,  then the `ref` will simply be `null` when you try to access it in the scope of the `Hello` component. Although, it's not likely that the consumer of the `Hello` component is going to omit the ref prop it is still a very real possibility considering that the TypeScript compiler issues no warnings or errors if you instantiate the component without providing a ref. This detail may lead to a runtime error and if we don't test how the `Hello` component renders, the error may split by development unnoticed.

> Okay, but what's up with the `((instance: IHello) => void)` part?

To quote the [React docs](https://reactjs.org/docs/refs-and-the-dom.html#callback-refs):

> React also supports another way to set refs called “callback refs”, which gives more fine-grain control over when refs are set and unset.
> Instead of passing a  `ref`  attribute created by  `createRef()`, you pass a function. The function receives the React component instance or HTML DOM element as its argument, which can be stored and accessed elsewhere.

You may not need to use the option, but it's nice to know that it exists. Although don't shy away from pointing out TypeScript's shortcomings, and the shortcomings of type declarations provided by library authors and developers, the main point is that TypeScript still enables us to have an insight as to how a symbol can be used based on it's type signature. I am a very lazy person by nature and I don't always like looking up documentation. Ideally, I like to find out how to a third part function by simply hovering over the symbol in [VSCode](https://code.visualstudio.com/). As a cherry on top, VSCode also has first class support for [JSDoc](https://jsdoc.app/about-getting-started.html), meaning that information which is difficult if not impossible to convey through types at the moment can be expressed in plain English with a comment. This way you can annotate both function, classes, object, interfaces and so on.

> But, wait, even if I use JavaScript in VSCode I am able to look at the type signature of the ref.

That's true, but under the hood VSCode is running a TypeScript [server](https://github.com/microsoft/TypeScript/wiki/Standalone-Server-(tsserver)) to be able to do any type checking.

To get back to the main branch of discussion. If the `ref` exists and `ref.current` is not of type "function", then we can feel free to assign an object which has a clear property to `ref.current`.

On the other hand, each time the component renders the variables and functions which are declared inside it are redeclared. The assignment to `ref.current` also needlessly happens each time. And those if checks are not very nice to look at. Not to beat around the bush anymore, there is a dedicated hook, created by the React team, for exactly this purpose.

#### useImperativeHandle

<!-- <iframe src="https://stackblitz.com/edit/react-useimperativehandle-hook" width="100%" height="500px" /> -->

It covers all of the edge cases which we mentioned before and it provides a nice outward facing API.

Importantly, being an imperative API, `useImperativeHandle` is not meant to be a tool which you rely on constantly because it's not in line with React's philosophy of functional, declarative programming. It's not bad per se, however there is probably a more elegant and idiomatic way to perform a given task.

### Lifecycle methods

Hooks are used inside functional components and we already established, from the pre-hooks era, that there is no such thing as a functional component instance because it has no life cycle. There is no difference between the first render of a functional component as it is first mounted in the DOM (before it was not present in the virtual DOM hierarchy nor in the real DOM) and the last render, where the component is removed from the DOM. However, if we want to put class components aside and only use functional components, to implement the state pattern and life cycle pattern there has to be a way for developers to track the life cycle of FC's. At least the mounting, updating and unmounting phases. Hooks bridge that gap and one such essential hook is the `useEffect` hook.

A very important thing to note is that every hook is effectful and functional components which consume a hook are impure. A function which doesn't perform a side effect, even if it has "use" in its name, is not a hook but a pure function.

The convention to prefix each hook with "use" was proposed by the React team, similarly how each higher order component was prefixed with "with". Khm `connect`, shame on you `react-redux`. The goal of the naming convention is to communicate to developers that a function has some special properties. In the case of hooks, it is the impure nature as well as the ability to trigger rerender among others. This is especially important in the case of hooks compared to HOC's, since higher order components were distinguishable by their type signature which is:

```tsx
type HOC = <InputProps, OutputProps>(component: React.ComponentType<InputProps>) => React.ComponentType<Output>
```

Whereas, the type signature of hooks is more generic and less recognizable:

```tsx
type Hook = (...args: []) => any
```

In fact, the above is a type signature of any function for that matter. Based on the type signature alone, any function may or may not be a hook. However if you prefix your custom hooks with "use" is an important gesture towards your future self and other developers who are going to be working with your code. Furthermore, the highlight of this series is the **Creating your own hooks** section, where we'll learn how to build world class custom hooks.

Before we start going through all of the examples, let me ask you this.

<details>
  <summary>What the functional programmer answer to any object oriented pattern? </summary>
  Of course, it's <i>a function</i> every time.
</details>

<br />

> How does this tie in into life cycle methods?

Simply, the answer to any life cycle method in the context of hooks is [useEffect](https://reactjs.org/docs/hooks-reference.html#useeffect).

To understand the `useEffect` hook in it's entirety took me quite a bit of time. Apart from reading the through the documentation I experimented a lot with the hook and through  many iterations I was able to say that I have a thorough grasp of the hook.

In this section, we are going to go through a lot of examples step by step and incrementally learn everything you need to know to become a `useEffect` ninja.

One more heads up before we start. Thinking in terms of utilizing the `useEffect` hook can be difficult at first since it requires a shift in perspective. However, do not beat yourself up about it. After enough practice you will build up a solid intuition.

#### componentDidMount

<!-- <iframe src="https://stackblitz.com/edit/react-componentdidmount-example" width"100%" height="500px" /> -->

#### useEffect on mount

<!-- <iframe src="https://stackblitz.com/edit/react-useeffect-on-mount" width="100%" height-"500px" /> -->

This is easy! The first argument passed to `useEffect`, as with the `componentDidMount` callback, represents a function which will be invoked by React. Now, when it is going to be invoked is more obvious in the case of `componentDidMount` based on its name. On the other hand, when it comes to `useEffect`,  when the callback is going to be invoked depends entirely on the second argument, which represents the dependencies array. The gist of it is simple. Each time a dependency changes, React will invoke the callback.

Although React is not going to complain about it, it's important that you pass a second argument to the `useEffect` callback. Else the callback you passed as the first argument would be invoked each time the component renders.

However, there is a difference between invoking a function inside of the body of a FC, compared to passing a callback function to `useEffect`, even if you do not pass a second argument to `useEffect`. That being the first invocation. Namely, the naked function call is going to be invoked before the `usEffect` callback, before the component has been mounted. You may draw a parallel between the constructor invocation which happens before `componentDidMount` is called. This means that is it safer to perform any DOM related side effects as part of t `useEffect` callback.

This topic ties into server side rendering. Entailing that your component is not going to be mounted when React is rendering your App to a string, hence `useEffect` callbacks will not be invoked during the process of server side rendering. This is a limiting circumstance at the moment because you will not be able to hydrate your app with data during server side rendering, since you cannot perform a side effect like fetching a resource inside the `useEffect` callback.

Fortunately, with the introduction of the new [React Concurrent Mode](https://reactjs.org/docs/concurrent-mode-adoption.html), looking at the [feature comparison](https://reactjs.org/docs/concurrent-mode-adoption.html#feature-comparison), there will be first class support for server side rendering and hydration.

If you've never heard of the new `Concurrent Mode`, don't feel bad about it, since it's pretty much brand new at the moment and it hasn't yet fully caught on. However, `Concurrent Mode` is the future for React application since it offers so many things which were previously impossible to accomplish. Basically, the reason why it is called concurrent is because React is now able to render your app in a separate thread, without blocking the main thread. This is significant because React is not able to fully render your application's new state before committing the update to the DOM. You can read up  e details [here](https://reactjs.org/docs/concurrent-mode-intro.html) and even fiddle around with the Suspense API among others. Furthermore, If you guys are interested, I'd be happy to create a series, similar to this one oriented towards React's `Concurrent Mode` .

For now let's focus on the topic at hand. Above I mentioned that the `useEffect` callback is going to be invoked when one of your dependencies changes. What does that mean exactly? Let's dissect the following example to get more insight.

<!-- <iframe src="https://stackblitz.com/edit/react-useeffect-change-detection" width="100%er wi ein rendering, the switch is turned on and clicking on `Turn on` is not going to rerender the App component, since the `isOn` state is being set to the same state as the current. Naturally, the Switch component's `useEffect` callback is not going to fire either.  Secondly, if you click on the `Toggle on` button, the App is going to rerender followed by the Switch component. This time, since the value of the `isOn` is different compared to the previous render, React is going to invoke the `useEffect` callback.  Thirdly, if you them click on the `Turn on` button, the cycle rerenders is going to repeat. Now comes the interesting part though. The value of the `isOn` state is `true` at the moment and if you click on `Turn on` again, the App is going to rerender, as seen by the `console.log`. On the other hand, the `useEffect` callback is not invoked since the value of the `isOn` prop passed to the `Switch` component has not changed compared to the its value during the previous render. -->

#### componentWillUnmount

<!-- <iframe src="https://stackblitz.com/edit/react-component-will-unmount" width="100%" height="500px" /> -->

This was pretty straight forward, with nothing out of the ordinary. Next up, we'll see how the pattern translates to functional components and hooks.

#### useEffect will unmount

<!-- <iframe src="https://stackblitz.com/edit/react-useeffect-will-unmount" width="100%" height="500px" /> -->

Couldn't be easier, could it? I feel like a broken record, but once again the code is more simpler and more concise.

Now, as to what the important details in the above example are. As you probably noticed the `useEffect` callback is returning a function. This function being returned is usually aptly called the cleanup function and this is where you perform your your cleanup duties, like unsubscribing from a data source.  React will invoke that function each time the `useEffect` callback is ran, expect for the first time (this gave me a lot of confusion on the past). There's one more exception to the rule, specifically, the cleanup function is also invoked when the component is about to be unmounted.

#### componentDidUpdate

Now that you know what React does with the dependency array in relation to the callback function and the cleanup function this section should be a breeze.

<!-- <iframe src="https://stackblitz.com/edit/react-componentdidutpdate-example" width="100%" height="500px" /> -->

In case that we want to perform a side effect like logging to new value of a prop to the console, each time the given prop changes, we can easily do so by utilizing the `componentDidUpdate` hook. React will invoke the callback each time any of the props change thus executing our code. This entails that the responsibility for comparing props or performing any other logic for that matter is completely up to us. You'll soon see why this was brought up.

#### useEffect did update

<!-- <iframe src="https://stackblitz.com/edit/react-useeffect-did-update" width="100%" height="500px" /> -->

The dependency management mechanism is inverted in this case. Meaning that the callback is not going to be invoked unless a dependency is stated explicitly. Additionally, we do not have to perform a comparison of the props anymore, however the downside is that we do not have access to the previous props either. Although there exists a simple workaround and we going to be implementing in a section to come.

Let's first talk a bit more the dependencies. At this point, we know what the dependencies represent and how React manages the dependency array which we provide. Now, we are going to touch upon the why and the best practices around managing dependencies.

#### The why of dependencies

So, why does the dependency array even exist. If you think about it, the compiler could conclude what the dependencies of `useEffect` callback are based on the variables which we refer to in the callback. It is possible and the React documentation even states:

> The array of dependencies is not passed as arguments to the effect function. Conceptually, though, that’s what they represent: every value referenced inside the effect function should also appear in the dependencies array. In the future, a sufficiently advanced compiler could create this array automatically.

This insert hints at the total removal of the dependency array. However, there would still be a need for a way to convey the information that a certain effect should be run only once. Otherwise, it would come down to an if statement inside the callback whose responsibility would be to determine whether based on the current state of the world. Something along the lines of:

```tsx
React.useEffect(() => {
  if (status === 'initial') {
    setStatus('loading')
    fetchResource()
  }
})
```

#### useLayoutEffect

The following hook, called `useLayoutEffect`, is similar to `useEffect`. In some situations the 2 of them will be interchangeable. In which case the React team recommends using `useEffect`. What follows is a great tip from the official docs:

> If you’re migrating code from a class component, note  `useLayoutEffect`  fires in the same phase as  `componentDidMount`  and  `componentDidUpdate`. However,  **we recommend starting with  `useEffect`  first**  and only trying  `useLayoutEffect`  if that causes a problem.
> If you use server rendering, keep in mind that  _neither_  `useLayoutEffect`  nor  `useEffect`  can run until the JavaScript is downloaded. This is why React warns when a server-rendered component contains  `useLayoutEffect`. To fix this, either move that logic to  `useEffect`  (if it isn’t necessary for the first render), or delay showing that component until after the client renders (if the HTML looks broken until  `useLayoutEffect`  runs).
> To exclude a component that needs layout effects from the server-rendered HTML, render it conditionally with  `showChild && <Child />`  and defer showing it with  `useEffect(() => { setShowChild(true); }, [])`. This way, the UI doesn’t appear broken before hydration.

It's important to note that `useLayout` fire synchronously after all DOM mutations and gives you a chance to execute a callback at the cost of blocking rendering by preventing the browser from painting. So do not perform any blocking or heavily computational operations inside the hook if you want your component to be visible on the screen as soon as possible. Don't even use the `useLayoutEffect` hook if you don't have to.

> So what's the hook even good for, anyway?

You will know when the time comes to use it. For example, if your component needs to be aware of it's size and position before it is rendered for the first time. If part B of the layout depends on the dimensions of part A of the layout and you want to avoid a flash of unstyled content.

Let's see the example:

 <!-- <iframe src="https://stackblitz.com/edit/react-uselayouteffect" width="100%" height="500px" /> -->

This might seem like a niche use case. Regardless, the React team has got us covered. This is one of those moments which instills confidence in React as a tool all encompassing tool for building web applications.

Lastly, you may already be familiar with the usage of `React.Fragment`, it's a way to be able to return  multiple elements at once. They are still wrapped in a `React.Fragment` however the fragment is stripped at build time and is not present in the DOM. You may also have seen the newer syntax for fragments which is more concise, `<>/\* content \*/</>`. Yes, they look like empty HTML tags. However the Stackblitz React TypeScript template does not support it at the moment and fails to parse the symbols. Fragments are a nice way to avoid having [div soups](https://www.chillybin.com.sg/would-you-like-another-bowl-of-div-soup/). Nevertheless, like any other good thing, don't overuse them. Believe me, I got burned once when I ended up with a broken layout. Long story short, by wrapping two sections in a fragment instead of a div. The 2 sections distributed evenly across the parent flex container, instead of splitting 1 fraction among themselves. Luckily for me, it was easily noticeable.

### Properties and methods

We talked about how functional component, with the additional of hooks, stand toe to toe with class component in almost any field. However, up until now you may have noticed that something is not quite there. In other words, if we declare a constant or function inside a functional component it gets redeclared and recomputed each time the FC renders. The re-declaration entices referential inequality and re-computation spends additional resources. The downsides of these two factors is usually not detrimental, but there is a solution for this conundrum as well. The solution comes in the form of the `useMemo` hook and it's specialized version called `useCallback`. Let's first explore the elder of the two siblings.

#### useMemo

As its name suggests, the point of the `useMemo` hook is to enable [memoization](https://en.wikipedia.org/wiki/Memoization), preventing needless recalculation.

> What does this mean exactly ?

As you might know, every pure function have certain neat properties. Starting with the fact that they always return the same output for a given input. They are just pure data transformations. Based on this, you could create a table of mapping certain inputs to certain outputs, for any input (given that the function is also total - for every input there's a well defined output) and any pure function ever. `useMemo` takes advantage of this property and memoizes the callback. Under the hood, it creates a table of know input and output mapping. If at any point it receives a known input, the input is mapped to an output and returned without the need to invoke the callback.

So pay attention to the mentioned of pure part, even though the signature of `useMemo` looks similar to `useEffect` - side effect don't belong in `useMemo`
callbacks. Effectful functions do not exhibit the same properties.

Without further ado, let's see what the `useMemo` hook can offer us.

<!-- <iframe src="https://stackblitz.com/edit/react-usememo-example" width="100%" height="500px" /> -->

The first usage of `useMemo` is trivial. What's more, the first argument passed to `useMemo` is a callback which when invoked return the ordinal which is the result of casting the text representation of the input's value to a number using th `Number` constructor. It doesn't save us much computational resources however it prevents the ordinal constant from being redeclared each time the App renders.

> Is this really worth it?

That's a good question. Since the usage of `useMemo` impacts readability, I'd rather not write use it everywhere unless there's a fathomable benefit to using it. There are plenty of ways to measure the impact of the `useMemo` hook and soon we are going to see for ourselves. However, let's first get acquitted with the little brother of `useMemo`.

#### useCallback

As its name says, `useCallback` is often used to wrap callbacks. And the docs say a little more about it:

> Pass an inline callback and an array of dependencies. `useCallback` will return a memoized version of the callback that only changes if one of the dependencies has changed. This is useful when passing callbacks to optimized child components that rely on reference equality to prevent unnecessary renders (e.g. `shouldComponentUpdate`).

At its heart `useCallback(fn, deps)` is equivalent to `useMemo(() => fn, deps)`.

Here's an example which you may come across in the wild, debouncing an effectful function which depends on an input value.

<!-- <iframe src="https://stackblitz.com/edit/react-usecallback-example" width="100%" height="500px" /> -->

We aren't passing an inline lambda function to `useCallback` because the return type of higher order `debounce` function is a function. Higher order function means exactly, a function which also returns a function. This is similar to another familiar concept which we will be discussing called higher order components. Even if you weren't sure before, applying the same logic you already know what higher order components are. Back to the debounce example, be careful not to debounce the value setter else the input will appear broken.

#### useMemo vs React.memo

It is worth mentioning that `useMemo` and `React.memo`, despite having a similar name, have many things in common apart from that. Let's look at the signatures of each function, starting with `useMemo`:

```tsx
type useMemo = <Value>(callback: () => Value, dependencies: any[]) => void
```

Compared to `React.memo`:

```tsx
import React from 'react'
type memo = <Props extends {}>(component: (props: Props) => React.ReactNode, arePropsEqual: (prevProps, nextProps) => boolean) => void
```

Firstly, `memo` doesn't accept a dependencies array, but instead accept a function as the second argument. When the function returns true, it signals to React that the props are equal to the previous props by the criteria you establish, and a rerender is unnecessary. Although, the comparison function represent an optional argument, and if it's not provided a shallow comparison is performed by React.

And also noticeably, the callback param of `useCallback` doesn't any parameters.Let's now spice things up by use [rxjs](https://npmjs.org/package/rxjs) to subscribe to a service which return a new value every second. With subscriptions you're probably used to unsubscribing in the unmounting phase, from which point on the component instance no longer exists and keeping the subscription running would be a memory leak. This is even suggested by React's error message during development, when there's an attempt to update the state of a component which has been unmounted.

#### Is memoization worth it

[Profiling](https://reactjs.org/docs/profiler.html)

## Rules of hooks

I shall share with you a summary the dedicated section in the official docs, called [Rules of Hooks](https://reactjs.org/docs/hooks-rules.html). Both principles which we are going to discuss revolve around the same requirement and that is to **not** change the order in which the hooks are rendered at any point of the components life cycle. Else undefined behavior is likely to happen. If you're interested to find out why, here's a great [example](https://reactjs.org/docs/hooks-rules.html#explanation). The first principle says:

> **Don’t call Hooks inside loops, conditions, or nested functions.**  Instead, always use Hooks at the top level of your React function. By following this rule, you ensure that Hooks are called in the same order each time a component renders. That’s what allows React to correctly preserve the state of Hooks between multiple  `useState`  and  `useEffect`  calls.

It is important to remember that the principles are there to protect you. They may even overprotect you, but up to a point it's still better than being under-protecting. An example of an overprotective principle is:

> Don’t call Hooks inside nested functions

The point is that it's imperative to respect the requirement that hooks are to be called in the same order, from render A to render Z. Invoking hooks inside nested functions does not jeopardizing the requirement, unless you use a loop or a conditional inside it. Heck, even using a loop or conditional statement without breaking the contract. However, in the case of a conditional like an if statement, a hook may not get called during a given render causing other hooks to be rendered out of order. As with loops, like `forEach`, the length of the array may vary, which entails the same negative effects pertaining to conditionals. To demonstrate the benevolence of hooks inside nested functions I created the following stress test:

<!-- <iframe src="https://stackblitz.com/edit/react-hooks-nested-function" width="100%" height="500px" /> -->

Feel free to experiment yourself.

> Then, why did the React team declare hooks inside nested functions as an anti-pattern?

It's easier to check whether a given piece of code, which uses hooks, is doing something which may upset the hook invocation order if you forbid hooks inside nested functions entirely. On this occasion, the React team was probably cornered and had to make a decision. They chose the safer path, which is understandable. Taking into account React's widespread adoption and the fact that bugs introduced by not following the consistent hook order requirement are difficult to debug and reproduce, it's safer to have false positives than undetected issues.

Based on the research, it goes without saying, that using hooks in async functions are part of the same, code red, category as loops and conditionals. Because there's a high chance that the order in which hooks are invoked is going to change from one render to another.

And the second principle states:

> **Don’t call Hooks from regular JavaScript functions.**  Instead, you can:

- ✅ Call Hooks from React function components.
- ✅ Call Hooks from custom Hooks (we’ll learn about them  [on the next page](https://reactjs.org/docs/hooks-custom.html)).

To clarify the point:

> Don’t call Hooks from regular JavaScript functions

If a JavaScript function invokes a hooks inside its body. Firstly, you may consider prefixing its name with "use", if that is not already the case. Secondly, and more importantly, the rules of hooks now apply to the function which consumes another hook. Furthermore, if you use the newly created custom hook inside another function, it too becomes a hook inheriting the naming convention and rules. And so on, and so forth.

As for remembering the rules, luckily for us lazy developers who are not fond of learning all the things by heart. Khm, like we had to do at school. The React team created an [eslint plugin](https://www.npmjs.com/package/eslint-plugin-react-hooks) which encompasses the above mentioned rules and basically teaches your IDE how to point out when you are doing something borderline. Just to see if the `useState` hook inside a callback is something that you did on purpose or a prank. Unfortunately, the IDE doesn't much of a sense of humor.

Finally, remember how we talked about rules of hooks being overprotective at time... In occasions where the order of hooks is guaranteed between renders and eslint still raises an error or a warning, you may disable the specific rule for the line which is the locus. For arguments sake let's that you want to disable a complaint about a hook inside a nested function, in which case you'd target the `react-hooks/rules-of-hooks` rule:

`// eslint-disable-line react-hooks/rules-of-hooks`
or
`// eslint-disable-next-line react-hooks/rules-of-hooks`

One more example where the hooks eslint plugin is being overprotective, which I commonly come across, is the `react-hooks/exhaustive-deps` rule. So what's the eslint rule about. It is pretty straightforward:

```tsx
import React from 'react'

const Hello: React.FC<{ name, fetchName: () => void }> = ({ name, fetchName }) => {
  React.useEffect(() => {
    fetchName()
  }, [])
  return <div>{name}</div>
}
```

Similarly to the previous example it is a case of a rule sanity check rule. With the assumption that it is more likely that you forgot to declare a dependency, in which case your effect is not going to run as often as it may should, depending on the use case. Compared to the scenario where you purposefully didn't declare a dependency because you want a certain function to be invoked only once, when the component has been mounted. Same as before, you may suppress the warning like so:

```tsx
import React from 'react'

const Hello: React.FC<{ name, fetchName: () => void }> = ({ name, fetchName }) => {
  React.useEffect(() => {
    fetchName()
  }, []) // eslint-disable-line react-hooks/exhaustive-deps
  return <div>{name}</div>
}
```

## useDebugValue

The last among the hooks, but not least is the `useDebugValue` hook. In the words of the React team:

> We don’t recommend adding debug values to every custom Hook. It’s most valuable for custom Hooks that are part of shared libraries.

Since we are going explore creating out own hooks in the next section, the `useDebugValue` hook is going to get some shine. This is especially true when you start creating more complex hooks. Being able to easily debug them is going to make life a lot easier.

`useDebugValue` can be used to display a label for custom hooks in [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi?hl=en). So let's see what it's all about.

<!-- <iframe src="https://stackblitz.com/edit/react-usedebugvalue" width="100%" height="500px" /> -->

## Creating your own hooks

Now that we have mastered the basics we are able to move onto more advanced topics. Imagine yourself as the painter who has acquired all the necessary colors on his or her palette and is ready to paint a masterpiece.

### Implementing redux with useContext and useReducer

Are you used to having a global immutable data store which serves as your app single source of truth?
I am too! So let's implement a basic version of redux using just 2 hooks that we mentioned before.

### useFetch

useState and useEffect

### usePagination

It's getting ever more exiting! In the next section we are going to built upon the example from the previous section, however not only that. We are also going to take the idea one step further by implementing pagination.

useState and useEffect and IntersectionObserver API

Check out [react-query](https://npmjs.org/package/react-query) and/or [swr](https://npmjs.org/package/swr) and react-window and/or react-virtualized

### Going up a notch with middleware

Now we are shifting into the fifth gear when.

If you haven't done so already check out [redux-thunk](https://npmjs.org/package/redux-thunk) and [redux-observable](https://npmjs.org/package/redux-thunk)

You may have noticed that this approach conflicts with relying on a hook similar to `useFetch`. I've been a proponent of using `redux-observable` for long time now, because performing side effects like network requests in epics, using [rxjs](https://npmjs.org/package/rxjs) gives you a lot of freedom. You are able to denounce, throttle, cancel requests and more.

However, more recently, I've been looking into relying on libraries like `react-query` to handle "server state" related matters. There are many carefully though out mechanisms which are at your services, out of the box, when using both `react-query` and `swr`. Let's go over the major concepts, which although possible to implement solely using redux-observable and rxjs, require quite a bit of additional effort.

However, I've considered creating a library which would bridge that gap for `redux-observable`. If you are aware of something similar which already fulfills such a role, pray let me know.

### Angular like services and dependency injection

Imagine that you are building an app which is using JWT based authentication. The JWT has to be stored on the client after the user logs in. However, we cannot store the token as part of the global state or any component state for that matter because both concepts are tied to individual sessions. Meaning that once the user closes the tab in which your app once resided, the information about the token is gone. In case that the token has not yet expired, it would be inefficient to ask the user to log in once they return to the app. We can provide a better user experience by storing the token in a place which persists through sessions and let the server decide when a token has expired and it's time to reauthenticate. Luckily for us there are many options to choose from which fit this description however a popular option is to use the `localStorage` API.

`useState` and `useEffect`

## Hooks vs HOC's

You can read about what the creator of [recompose](https://github.com/acdlite/recompose), the de facto React HOC's library, had say about hooks at the top of the repository's README file. However, in a nutshell, React is heading towards hooks and recompose is no longer actively maintained.

### Pros of hooks

- Easier and faster to set up. Take the example of selecting a value from the redux store:

#### Selecting a value from the state with HOC's

```tsx
import React from 'react'
import { connect } from 'react-redux'
import { State, selectName } from '../store'

const Hello: React.FC<{ name: string }> = ({ name }) => (
  <div>Hello {name}</div>
)

export const HelloContainer = connect((state: State) => ({
  name: selectName(state)
}))(Hello)
```

#### Selecting a value from state with hooks

```tsx
import React from 'react'
import { useSelector } from 'react-redux'
import { State, selectName } from '../store'

const Hello: React.FC = ({ name }) => {
  const name = useSelector(selectName)
  return (
    <div>Hello {name}</div>
  )
}
```

### Cons of hooks

- Hooks are more difficult to reuse if you want to keep a clear separation between container and presentation components. Let's revisit the previous example

#### Create multiple components with a single HOC

```tsx
import React from 'react'
import { connect } from 'react-redux'
import { State, selectName } from '../store'
import { Hello } from './Hello'
import { Hello1 } from './Hello1'

const connectWithName = connect((state: State) => ({
  name: selectName(state)
}))

export const HelloContainer = connectWithName(Hello)

export const Hello1Container = connectWithName(Hello1)
```

Notice that we didn't even import `React` in the example above. Because there is no need to, since importing `React` is only required your file contains `JSX` or `TSX`. What's more, the file extension may be shortened from `tsx` to `ts`.

#### Create multiple components with a single hook

```tsx
import React from 'react'
import { connect } from 'react-redux'
import { State, selectName } from '../store'
import { Hello } from './Hello'
import { Hello1 } from './Hello1'

export const HelloContainer = () => {
  const name = useSelector(selectName)
  return <Hello name={name} />
}

export const Hello1Container = () => {
  const name = useSelector(selectName)
  return <Hello1 />
}
```

Code-wise there's not much of a difference, however if we take a more holistic approach the point becomes more obvious. Not seldom, will you want inject a certain prop or props and spread the rest.

#### Create multiple components with a single HOC 2

```tsx
import { connect } from 'react-redux'
import { State, selectName } from '../store'
import { Dashboard } from './Dashboard'
import { Sidebar } from './Sidebar'

const connectWithName = connect((state: State) => ({
  name: selectName(state)
}))

export const DashboardContainer = connectWithName(Dashboard)

export const SidebarContainer = connectWithName(Sidebar)
```

The above example has the exact same structure as before.

#### Create multiple components with a single hook 2

```tsx
import React from 'react'
import { connect } from 'react-redux'
import { State, selectName } from '../store'
import { Dashboard } from './Dashboard'
import { Sidebar } from './Sidebar'

export const DashboardContainer = (props: Omit<React.ComponentProps<typeof Dashboard>, 'name'>) => {
  const name = useSelector(selectName)
  return <Dashboard {...props} name={name} />
}

export const SidebarContainer = (props: Omit<React.ComponentProps<typeof Sidebar>, 'name'>) => {
  const name = useSelector(selectName)
  return <Sidebar {...props} name={name} />
}
```

Now the difference is more obvious. There's some boilerplate which is repeated from one case to another. Nevertheless, we already know how to easily abstract away such boilerplate code. Yes, we can create a higher order component which utilizes a hooks or hooks inside it's body. In the case of `react-redux` you may simply reach for the `connect` HOC. What's more, creating a HOC which utilizes a custom hook is trivial.

```tsx
import React from 'react'
import { Sidebar } from './Sidebar'

export const withModal = <Props extends {}>(Component: React.ComponentType<Props>) => {
  const ComponentWithModal = (props: Omit<React.ComponentProps<typeof Dashboard>, 'isModalOpen' | 'toggleOpenModal'>) => {
    const modal = React.useContext(ModalContext)
    return <Component {...props} isModalOpen={modal.isOpen} toggleOpenModal={modal.toggleOpen} />
  }
  ComponentWithModal.displayName = `withModal(${Component.displayName || Component.name})`
  return ComponentWithModal
}

export const SidebarContainer = withModal(Sidebar)
```

The part where we a assign a `displayName` to the new component is optional, However, it aids debugging through the usage of [React DevTools](https://chrome.google.com/webstore/detail/react-developer-tools/fmkadmapgofadopljbjfkapdkoienihi)

Observing things from this perspective, HOC's and hooks can coexist with each other in a state of harmony.

> But, why bother writing pure components?

First of all, you can easily instantiate the component with randomly generated props with the help of a library like [faker](https://nomjs.org/package/faker).

Moreover, many benefits are derived from the above fact.

Firstly your component is easy to unit test using [react testing library](https://npmjs.org/package/@testing-library/react) or [enzyme](https://npmjs.org/package/enzyme).

Secondly, you can easily reuse a pure component across projects by publishing it using a tool like [bit](https://npmjs.org/package/@bit/cli)

Thirdly, you may effortless develop and display your components in [storybook](https://npmjs.org/package/@storybook/react) or a similar environment etc.

 As a side note, you can still test an impure component which consumes a hook, without actually performing any side effects like network calls by mocking the function. For example, using [jest](https://jestjs.io/docs/en/mock-functions.html).

 Before we cover the next section, which is really important, let's first glance over the following terms.

[Serializeable](https://en.m.wikipedia.org/wiki/Serialization) - A message is serializeable if it can be stringified to JSON - which is not possible in the case of recursive structures.

[CQRS](https://en.m.wikipedia.org/wiki/Command%E2%80%93query_separation) - Command Query Responsibility Segregation, states that every method should either be a command that performs an action, or a query that returns data to the caller, but not both.

There is, however, a third approach inspired by microservices. Namely, if you think redux as a message broker and your components as services. In a nutshell, the main selling point of a microservice architecture is that it enables you to keep your services decoupled. For example service A, which depends on service B, doesn't have to know how to communicate with service B directly. Else if service B were to be replaced with service C which behaves completely the same as B, despite the fact, service A would have to be altered. Namely, the reference which A holds to B would have to be replaced with a reference to C. A message broker solves this issue by having the individual service dispatch messages which are usually serializeable. The message broker is now responsible for passing the messages between services and the services themselves just have to know which actions they want to listen to and dispatch. You may have noticed that we haven't entirely decoupled our services from the rest of the world (else the service would turn into a pure function), we just narrowed down it's dependencies to a minimum. The only reference the services have to hold is a reference to the message broker. Specifically how to read and write (select and dispatch actions). Following the principles of CQRS it is preferable to keep these two operations separate. Fortunately, the message broker is not something which is often replaced. Even if it did, due to the fundamental simplicity of a message broker, the upgrade would be large scale but not very complicated. This means that it could be automated.

In conclusion, hooks are a great addition to the react ecosystem and there are plenty of use cases for hooks. Similarly to HOC's hooks may encapsulate logic and/or side effects and keep out code DRY. On top of that, hooks can be used inside the body of functional component. Taking that into consideration, never again do you have to write a class component. Currently, however, with the notable exception of error boundaries. For more information about this limitation, check out [why is X not a hook?](https://overreacted.io/why-isnt-x-a-hook/).

## Migrating common libraries to hooks

All of the major react libraries, which have previously relied on HOC's, have migrated or are in the of migrating to hooks.

> But does this mean that I have to relearn every single one of them.

The short answer is no. There may be some differences here and there, but having come this far into the course, you are absolutely equipped for tackling such migrations. Nevertheless, in this section we are going to cover some of the most prevalent cases and what better way is there to kick off this section than to talk about the react integration of redux. Give it up for `react-redux`.

### react-redux

I bet that you'll rarely ever want to connect another component using the higher order component API after you've got a taste for the the hooks `react-redux` has to offer.

`connect`

`useSelector`

`useDispatch`

Reading this section left a bad aftertaste and if you're like me, the immediate though that crossed my mind was: "Lemme implement the `useActions` hook." I'll let you in on a secret. Once I implemented the `useActions` I never looked back. So as an added bonus I'll show you to implement the `useActions` in a type safe manner.

`useActions`

### react-router

`withRouter`

`useHistory`

`useParams`

`useRouter`

### material-ui

Material UI is using [jss](https://npmjs.org/package/jss) under the hood and exposes a similar API compared to [react-jss](https://npmjs.org/package/react-jss) hence if you learn one you have learned the other the a significant extent safe for certain caveats.

`makeStyle`

> This is too easy.

I agree. So for the next section let's do something more difficult by implementing a prop based animation. In order to make this work we are going to overcome a few hurdles along the way, but have faith.

### xstate

### styled-components

### react-spring

## Parting message

Continue to learn and explore. Don't be afraid to dig into documentation, but never stop practicing. And the sky is the limit for you.
