# Darts

## Prerequisites

Node.js v5 or later, including the corresponding version of npm. You can use the installer provided on [nodejs.org](https://nodejs.org/en) or you can use [nvm](https://github.com/creationix/nvm).

## Setup

```
npm install
```

Install all the dependencies.

## Developing

```
npm run develop
```

Start the application and watch files on changes to result into a recompilation of the project and automatic browser refresh. Just let this command run in the background and see the changes automatically pushed to your browser while you're developing.

## Programming task

At Oxynade we love to play darts, but until now we keep track of our scores on a big whiteboard. It would however be nice to have a complete history of all the games we play in a web application. For this we need to render a dart board on which we can highlight every region when it gets hovered by the mouse pointer.

To test the skills and knowledge of our developers as to modern JavaScript frameworks and development, we made this programming task to render a dart board using [webpack](https://webpack.github.io), [Babel](http://babeljs.io), [React](https://facebook.github.io/react) and [Redux](http://redux.js.org). Next to this we also test your skills with graphics technologies like SVG because these are needed when you want to render big seating plans in our front end code. You can find the example solution in the folder `build/index.html`.

In the repository you can find the files `src/components/dartboard.js` and `src/components/root.js` and `src/reducer/index.js` as a starting point, together with some helper files. The latest is a Redux container component, you can find more info about this concept  [here](http://redux.js.org/docs/basics/UsageWithReact.html). `src/components/dartboard.js` is a presentational component that is unaware of Redux and only depends on React.

Here an overview of all the files and their responsibility:

### 1. `src/components/dartboard.js`

The `dartboard.js` component should be a [functional stateless React component](https://facebook.github.io/react/docs/reusable-components.html#stateless-functions). At Oxynade we love functional stateless components because these components are pure functions of their input, which makes them very predictable and testable. Actually, we love [functional programming](https://en.wikipedia.org/wiki/Functional_programming) in general, which makes also big parts of the Redux framework, because immutability and pure functions are the key ingredients to write understandable and predictable code that lends itself well to testing and performance optimizations, together with virtual DOM frameworks like React. Because it should be a functional stateless React component, state should be kept somewhere, and that's where Redux comes into play.

This programming task consists of completing the `src/components/dartboard.js`, `src/components/root.js` and the `src/reducer/index.js` implementation. We provide you with a stripped down implementation of the component, accompanied with one example Redux action and reducer. The end result of this programming task should visually resemble the example solution and should also have the same dynamic behavior when hovering the different sections of the dart board. We make use of [SVG](https://www.w3.org/TR/SVG11/) to render all the visual shapes. SVG is XML embedded in HTML which allows us to draw complex vector graphics.

The `dartboard.js` component has the following interface:

```javascript
const Dartboard = (props) => {
  const {
    innerBullRadius,
    outerBullRadius,
    tripleRingInnerRadius,
    tripleRingOuterRadius,
    doubleRingInnerRadius,
    doubleRingOuterRadius,
    valuesRadius,
    totalRadius,
    sections,
    bull,
    onMouseOverSection,
    onMouseOverBull,
    onMouseOut
  } = props

  // Return React Element
  return <svg></svg>
}

Dartboard.propTypes = {
  innerBullRadius: React.PropTypes.number,
  outerBullRadius: React.PropTypes.number,
  tripleRingInnerRadius: React.PropTypes.number,
  tripleRingOuterRadius: React.PropTypes.number,
  doubleRingInnerRadius: React.PropTypes.number,
  doubleRingOuterRadius: React.PropTypes.number,
  valuesRadius: React.PropTypes.number,
  totalRadius: React.PropTypes.number,
  sections: React.PropTypes.array,
  bull: React.PropTypes.object,
  onMouseOverSection: React.PropTypes.func,
  onMouseOverBull: React.PropTypes.func,
  onMouseOut: React.PropTypes.func
}
```

You must not change this interface, it has all the properties needed to render a dart board React component. We also included the [proptypes](https://facebook.github.io/react/docs/reusable-components.html#prop-validation) as a means of documentation about the properties that are expected by this component. A lot of the properties describe some kind of radius. The implementation of our dart board is actually expressed as a function of the different radiuses that are visible on a dart board because it allows us to use basic trigonometric functions like the cosine and sine functions to describe the shape of the board.

Here also a picture of a dart board with some of the used terminology.

![dartsboard](https://upload.wikimedia.org/wikipedia/commons/thumb/5/57/Dartboard_diagram.svg/637px-Dartboard_diagram.svg.png)

### Dartboard props

Here some explanation about each property:

#### Data properties

The data properties contain all the information that a React component needs to visually render itself. These will be generated with `mapStateToProps` of the Redux [container](http://redux.js.org/docs/basics/UsageWithReact.html#container-components) (`src/components/root.js`) .

- `innerBullRadius`: Radius of the inner bullseye.
- `outerBullRadius`: Radius of the outer bullseye.
- `tripleRingInnerRadius`: Inner radius of the triple ring.
- `tripleRingOuterRadius`: Outer radius of the triple ring.
- `doubleRingInnerRadius`: Inner radius of the double ring.
- `doubleRingOuterRadius`: Outer radius of the double ring.
- `valuesRadius`: Radius that will be used to render the values outside the board (to put them closer or further away from the board).
- `totalRadius`: The total radius of the complete board, everything should be rendered within this radius.

Mathematically, the following predicate should always be true:

```
innerBullRadius < outerBullRadius
< tripleRingInnerRadius < tripleRingOuterRadius
< doubleRingInnerRadius < doubleRingOuterRadius
< valuesRadius < totalRadius
```

- `sections`: This is a JavaScript array containing information needed to render each section of the dart board. A normal dart board has 20 sections where each section consists of multiple regions. We have

  - a region that is part of the double ring,
  - a region part of the triple ring,
  - a region part of the outer ring (outside of the actual dart board),
  - a region part of the inner single ring (=ring between the bull and the double ring) and
  - a region part of the outer single ring (=ring between the double ring and triple ring).

The `sections` object is an array that looks like this:

```javascript
const sections = [
  {
    color: {
      double: 'red',
      triple: 'red',
      innerSingle: 'black',
      outerSingle: 'black'
    },
    value: 20
  }, {
    color: {
      double: 'green',
      triple: 'green',
      innerSingle: 'white',
      outerSingle: 'white'
    },
    value: 1
  },
  // etc.
]
```

Using this object, we can choose how many sections a dart board should have together with the value of each section, and also which colors every region of one section should have. This allows us to dynamically build a dart board that diverges from the traditional 20 sections of a dart board.

- `bull`: This is a JavaScript object containing the color information of the bull. It looks like this:

```javascript
const bull = {
  color: {
    double: 'red',
    single: 'green'
  }
}
```

#### Callback properties

Callback properties are functions that will be used to trigger some interesting events. These will be generated with `mapDispatchToProps` of the Redux container (`components/root.js`)  (http://redux.js.org/docs/basics/UsageWithReact.html#container-components).

- `onMouseOverSection`: This function will be called when the mouse pointer hovers a section of the dart board. It has the following signature ([Flow](https://flowtype.org/) is used for type descriptions):

```javascript
type onMouseOverSection = (arg: { ring: string, index: number }) => void
```

So, it accepts one object argument consisting of two properties: ring and index. `ring` is a string that can have the following values: `'single'`, `'double'`, `'innerSingle'`, `'outerSingle'`. This value defines which region of the section is hovered, and this information will be used to give this region a different color when it is hovered. `index` is a number that defines which section is hovered. It can be used to index the `sections` array.

- `onMouseOverBull`: This function will be called when the mouse pointer hovers the bull area of the dart board. It has the following signature:

```javascript
type onMouseOverBull = (arg: { ring: string }) => void
```

Here `ring` is also a string that can have the following values: `'single'`, `'double'`. This defines if the inner bull or the outer bull is hovered.

- `onMouseOut`: This function will be called when the mouse pointer moves outside the dart board area and this informs us that the dart board is not hovered anymore and that every shape should have it's normal default color. It has the following signature:

```javascript
type onMouseOut = () => void
```

#### Tips & tricks

To draw one region of a section, you can make use of a SVG `path` element consisting of 4 points. More info can be found in the [SVG reference](https://www.w3.org/TR/SVG11/paths.html). You can use the M (moveto), A (elliptical arc curve) and the L (lineto) commands to specify the shape of the path. With some basic trigonometric functions, you can calculate the 4 points of each region, and with the A (arc) commands you can set the center of the dart board equal to the center of the arc.

### 2. `src/components/root.js`

This file is the Redux [container](http://redux.js.org/docs/basics/UsageWithReact.html#container-components) component that will bind the Redux state to the React component. You still need to implement the `sections`, `onMouseOverSection` and `onMouseOut` props. We already implemented the other props, so you can check how we fetch state from the Redux store (for example `bull`) and pass it to the React `dartboard.js` component (mapStateToProps).

You can also check out how we call a Redux reducer when a callback prop (for example `onMouseOverBull`) is executed. This reducer will result in a state change, which will initiate a new render loop.

### 3. `src/reducer/index.js`

This file contains the Redux root reducer. Because this is a small application, we only need one reducer. We already implemented a `HIGHLIGHT_BULL` action, which will change the Redux state to resemble the highlighted section of the dart board.

Our initial Redux state looks like this:

```javascript
const initialState = {
  dartboard: {
    innerBullRadius: 10,
    outerBullRadius: 20,
    tripleRingInnerRadius: 80,
    tripleRingOuterRadius: 100,
    doubleRingInnerRadius: 180,
    doubleRingOuterRadius: 200,
    valuesRadius: 220,
    totalRadius: 240,
    values: [20, 1, 18, 4, 13, 6, 10, 15, 2, 17, 3, 19, 7, 16, 8, 11, 14, 9, 12, 5],
    highlight: {
      type: 'none', // 'none' || 'bull' || 'section'
      ring: null,
      index: null
    }
  }
}
```

This object describes all the state we need to render our dart board, and it is the responsibility of the Redux container (`src/components/root.js`) to map this state to the props needed by our React component. You can see that we define all the radiuses of the board, together with the amount of sections (this is implicit through the length of the `values` array) and its values.

Next to this, we have also a property `highlight` that defines which part of the board is highlighted when hovered. This property consists of an object with a `type` property that tells us which part is highlighted. Possible values are `'bull'`, `'section'` and `'none'`.

If the type is `'bull'`, then we also define which part of the bull is highlighted using the `ring` property. In case of the `'bull'`, this can have the value `'single'` (=inner bull) or `'double'` (=outer bull).

If the type is `'section'`, then we have to define which ring of the section is highlighted. The `ring` property can have the value `'innerSingle'`, `'outerSingle'`, `'double'` or `'triple'`. Next to this we also need to know which section should be highlighted, therefore we use the property `index`, which can be used to index the `values` array of the Redux state.

As you can see, the Redux state has all the information needed to construct the `sections` prop of `src/component/dartboard.js`.

#### Tips & tricks

The redux state should never be mutated, instead a reducer should return a new state using the old state and the information provided by the action. To make this less awkward, we make use of the [Lodash](https://lodash.com) merge function. We use lodash for functional programming (`lodash/fp`), because this build of lodash doesn't mutate objects, but return new objects instead, thereby following a functional style. More info can be found [here](https://github.com/lodash/lodash/wiki/FP-Guide).

## Remarks

* You're free to `npm install` whatever package you need from [npm](https://www.npmjs.com/).
* Try to avoid linting errors (execute `npm run lint` to check).
* Try to use ES2015 (and beyond) as much as possible. Babel is [configured](http://babeljs.io/docs/plugins) to make use of ES2015 and all experimental stage 0 features.
