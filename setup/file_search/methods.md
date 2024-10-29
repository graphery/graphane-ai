---
outline: deep
---

# Methods

In Graphane, methods are powerful tools for handling data transformation, event handling, and
accessing and manipulating SVG elements and configurations. These methods are defined with the
keyword `function` within the **`<script type="methods">`** tag and provide essential logic for
interacting into the `g-composer`.

---

## Define methods

- **Description**: All functions defined using the **`function`** keyword are accessible. This
  includes event handlers, data manipulation functions, or any other logic needed for the template.
  Variables defined with **`var`**, **`let`**, **`const`**, and **arrow functions** are scoped to
  the `<script type="methods">` and are not directly accessible from the template.

**Example**:

```html
<script type="methods">
  let count = 0;
  function pos() {
    return count++;
  }
</script>
```

- **Note**: Statements like `import` and `export`, which are typically used in module-based
  JavaScript, cannot be used inside `<script type="methods">`.

---

## Inline Methods

- **Description**: Se puede incluir código javascript directamente en el tab
  `<script type="methods">`.

**Example**:

```html
<script type="methods">
  function data(originalData) {
    // Transform data before rendering
    return originalData.map(item => ({
      ...item,
      value: item.value * 2
    }));
  }
  function handleClick(event, item) {
    alert(`Value: ${item.value}`);
  }
</script>
```

---

## External Methods

You can also load methods from an external JavaScript file:

**Example**: Link to an external file directly in the `<script>` tag:

```html
<script type="methods" src="methods.js"></script>
```

**Example**: Load methods via `g-composer` attribute:

```html
<g-composer methods-src="methods.js"></g-composer>
```

---

## Data Transformation in Graphane

If a function called **`data()`** is defined in the `<script type="methods">`, this function is
called to transform the raw data before it is rendered in the template. This allows for
preprocessing or manipulation of the data before it is looped through or bound to SVG elements.

**Example**:

```html
<script type="methods">
  function data(originalData) {
    return originalData.map(item => ({
      ...item,
      scaledValue: item.value * 2
    }));
  }
</script>
```

---

## Using Functions in the Template

You can call functions defined in the `<script type="methods">` from any **Graphane directive**
expression:

- **`g-for`**: Loops over data or a function result.
  ```html
  <g g-for="n of someFunction()">
    ...
  </g>
  ```

- **`g-if`**: Conditionally render elements based on a function return.
  ```html
  <rect g-if="someFunction() > 50">
    ...
  </rect>
  ```

- **`g-bind`**: Dynamically bind attributes to the result of a function.
  ```html
  <rect :fill="getColor()"></rect>
  ```

- **`g-content`**: Set the content of an element to the return of a function.
  ```html
  <text g-content="getText()"></text>
  ```

- **`g-on`**: Bind event listeners to functions.
  ```html
  <circle @click="handleClick"></circle>
  ```

**Note**: If a function name is overwritten in the data context, you can still access it using
`$.methods.func()` from the template.

---

## Event Handlers in Graphane

When handling events using `g-on`, the `this` keyword refers to a **wrapper** of the SVG
element that triggered the event. This wrapper exposes all attributes and properties as methods,
allowing dynamic interaction with the element's properties (e.g., fill, stroke, position, etc.).

**Example**:

```html
<script type="methods">
  function handleClick() {
    this.fill(this.fill() === 'blue' ? 'red' : 'blue');
  }
</script>
```

---

## Accessing `$.data`

The `$.data` object provides direct access to the entire data structure from within methods. You
can use `$.data` to add, remove, or modify data elements dynamically.

**Example**:

```html
<script type="methods">
  function addNewItem() {
    $.data.push({ name: 'New Item', value: 40 });
  }
</script>
```

---

## Accessing `$.svg`

The **`$.svg`** object allows you to query and manipulate the entire SVG structure. This is useful
for accessing or modifying SVG elements that aren't directly exposed in the template.

**Example**:

```html
<script type="methods">
  function adjustSVG() {
    const rect = $.svg.querySelector('rect');
    rect.width(200).height(100).fill('green');
  }
</script>
```

---

## Accessing `$.config`

The `$.config` object gives you access to configuration settings defined in the 
`<script type="config">` section. This is useful for applying global settings like colors,
dimensions, or other customizable options.

**Example**:

```html
<script type="config">
  {
    "defaultColor": "green"
  }
</script>
<script type="methods">
  function setDefaultColor() {
    this.fill($.config.defaultColor);
  }
</script>
```

---
