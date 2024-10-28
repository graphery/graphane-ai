---
outline: deep
---

# Template

## `<template></template>`

The `<template>` tag contains SVG code where dynamic elements are generated using Graphane
directives. Use standard SVG elements such as `<g>`, `<circle>`, `<rect>`, `<line>`, `<path>`,
`<text>`, and others, powered with Graphane directives.

The template can be inserted inline or loaded as an external resource:

**Inline Template Example**:

```html
<template>
  <!-- SVG with Graphane directives -->
</template>
```

**External Template Example**:

```html
<g-composer svg-src="template.svg"></g-composer>
```

---

## Directives

### `g-for`

**`g-for="expression"`**

- **Purpose**: `g-for` iterates over an array or object from the data source, generating SVG
  elements dynamically for each item. It is used to create multiple instances of SVG elements based
  on data.
- **Expression**: The syntax is similar to JavaScript `for` loops but works directly in the
  template.

---

#### `g-for="n of x"`

- **Description** : Loops X times and assigns the current iteration number to n. This is useful for
  creating a fixed number of elements.

**Example**:

```svg 

<g g-for="n of 10">
  <circle :cx="n * 20" :cy="50" r="10"/>
  <text :x="n * 20" :y="50" g-content="n"/>
</g>
```

---

#### `g-for="items of data"`

- **Description**: Iterates over a data array, assigning each element in the array to items. This is
  used for iterating through a list of items in the dataset.

**Example**:

```svg
<rect g-for="item of data"
      :x="item.x" :y="item.y" width="50" height="20"></rect>
```

---

#### `g-for="{x, y} of data"`

- **Description**: Destructures each element of data (assuming data is an array of objects) into
  variables `x` and `y`. This allows direct access to specific properties.

**Example**:

```svg
<circle g-for="{x, y} of data"
        :cx="x" :cy="y" r="10"></circle>`
```

---

#### `g-for="(item, index) of data"`

- **Description**: Iterates over data and provides both the current item and the current index. This
  is useful when you need both the data and the index for positioning or conditional logic.

**Example**:

```svg
<text g-for="(item, index) of data"
      :x="index * 20" :y="50" g-content="item.label"></text>
```

---

#### `g-for="({x, y}, index) of data"`

- **Description**: Destructures each element of data into x and y properties, and also provides the
  index. This is helpful when working with specific properties of objects while also needing the
  index

**Example**:

```svg
<circle g-for="({x, y}, index) of data"
        :cx="x" :cy="y" :r="index * 5 + 10"></circle>
```

---

#### `g-for="items of getData()"`

- **Description**: Iterates over the data returned by a method (in this case,
  `getData()`) from the `<script type="methods">` section. This allows dynamic data to be generated
  or manipulated before being rendered in the template

**Example**:

```svg
<rect g-for="item of getData()"
      :x="item. x" :y="item.y" width="50" height="20"></rect>
```

---

### `g-if`

**`g-if="expression"`**

- **Purpose**: `g-if` conditionally renders an SVG element based on a boolean expression.
- **Expression**: If the condition evaluates to true, the element will be created; otherwise, it
  will be hidden.

---

#### `g-if="item.isVisible"`

- **Description**: Renders the element only if the isVisible property of item is true. This is a
  straightforward boolean check

**Example**:

```svg
<circle g-if="item.isVisible"
        :cx="item.x" :cy="item.y" r="10"></circle>
```

---

#### `g-if="item.value > 50"`

- **Description**: Renders the element if item.value is greater than 50. This checks a numeric
  condition

**Example**:

```svg
<rect g-if="item.value > 50"
      :x="item.x" :y="item.y" width="100" height="50"></rect>
```

---

#### `g-if="index % 2 === 0"`

- **Description**: Renders the element only for even indices in a loop. This is useful when
  alternating behavior based on index (e.g., rendering every other element)

**Example**:

```svg
<line g-if="index % 2 === 0"
      :x1="item.x1" :y1="item.y1" :x2="item.x2" :y2="item.y2"></line>
```

---

#### `g-if="item.type === 'circle'"`

- **Description**: Renders the element only if item.type equals 'circle'. This checks a string
  condition, allowing the selection of elements based on a specific property value. 

**Example**:
```svg
<circle g-if="item.type === 'circle'" 
        :cx="item.x" :cy="item.y" r="20"></circle>
```

---

#### `g-if="!item.disabled"`

- **Description**: Renders the element if item.disabled is false (or not defined). This negation
  expression allows conditional rendering when a property does not meet a certain condition

**Example**:

```svg
<rect g-if="!item.disabled"
      :x="item.x" :y="item.y" width="100" height="50"></rect>
```

---

#### `g-if="getData().length > 0"`

- **Description**: Renders the element only if the function getData() returns a non-empty array.
  This is useful when rendering elements based on dynamic or fetched data.

**Example**:

```svg
<text g-if="getData().length > 0"
      x="50" y="50">Data is available
</text>
```

---

#### `g-if="data.status === 'active' && data.score >= 80"`

- **Description**: Renders the element only if data.status equals 'active' and data.score is greater
  than or equal to 80. This combines multiple conditions using logical AND (&&)

**Example**:

```svg
<rect g-if="data.status === 'active' && data.score >= 80"
      :x="data.x" :y="data.y" width="100" height="50"></rect>
```

---

#### `g-if="data.isValid || data.isNew"`

- **Description**: Renders the element if either data.isValid is true or data. isNew is true. This
  uses the logical OR (||) to render the element when one of the conditions is met

**Example**:

```svg
<circle g-if="data.isValid || data.isNew"
        :cx="data.x" :cy="data.y" r="10"></circle>
```

---

#### `g-if="isEligible(item)"`

- **Description**: Renders the element only if the function `isEligible(item)` returns true. This
  allows complex logic to be encapsulated in a function, making the template cleaner and more
  readable

**Example**:

```svg
<rect g-if="isEligible(item)"
      :x="item.x" :y="item.y" width="100" height="50"></rect>
`````

---

### `g-bind`

**`g-bind:attribute_name="expression`**

**`:attribute_name="expression"`**

- **Purpose**: `g-if` dynamically binds SVG element attributes (e.g., `x`, `y`, `width`, `height`,
  `stroke`, `fill`) to values or expressions from the data or methods. The shorthand `:` can be used
  as an alias for `g-bind`.
- **Expression**: The value returned by the expression is assigned as the value of the attribute.

---

#### `g-bind:x="item.x"`

- **Description**: Dynamically binds the x attribute of an SVG element (e.g., a rect or circle) to
  the x value from the item in the data

**Example**:

```svg
<rect :x="item.x" :y="item.y"
      width="100" height="50"></rect>
```

---

#### `g-bind:fill="item.color"`

- **Description**: Binds the fill color of an SVG element (e.g., rect or circle) to the color
  property of the data. This is useful for dynamically setting the color of elements based on data

**Example**:

```svg
<circle :fill="item.color"
        :cx="item.x" :cy="item.y" r="10"></circle>
```

---

#### `g-bind:cx="item.x + 10"`

- **Description**: Binds the cx (center x-coordinate) of a circle to a computed value, in this case,
  item.x + 10. This allows for arithmetic operations directly in the binding expression

**Example**:

```svg
<circle :cx="item.x + 10" :cy="item.y"
        r="10"></circle>
```

---

#### `g-bind:width="Math.max(item.value, 100)"`

- **Description**: Binds the width attribute to the result of the Math.max() function, ensuring the
  width is at least 100, regardless of the item.value. This demonstrates how to use JavaScript
  functions within binding expressions

**Example**:

```svg
<rect :width="Math.max(item.value, 100)"
      height="50" :x="item.x" :y="item.y"></rect>
```

---

#### `g-bind:r="getRadius(item)"`

- **Description**: Binds the r (radius) attribute of a circle to the result of the getRadius(item)
  function, allowing for complex logic to determine the radius

**Example**:

```svg
<circle :r="getRadius(item)"
        :cx="item.x" :cy="item.y"></circle>
```

---

#### `g-bind:y="index * 30"`

- **Description**: Binds the y attribute to a calculated value based on the index of the current
  item in the loop. This is useful for positioning elements vertically in a list or grid

**Example**:

```svg
<rect :x="item.x" :y="index * 30"
      width="100" height="20"></rect>
```

---

#### `g-bind:opacity="item.isVisible ? 1 : 0.5"`

- **Description**: Binds the opacity attribute to a conditional expression, making the element fully
  opaque (1) if item.isVisible is true, and semi-transparent (0.5) otherwise

**Example**:

```svg
<circle :opacity="item.isVisible ? 1 : 0.5"
        :cx="item.x" :cy="item.y" r="10"></circle>
```

---

#### List of values

- **Description**: Several SVG attributes expect a list of values, separated by spaces or commas. In
  these cases `g-bind` can directly receive a string of values or an array whose values will be
  included in the attributes separated by a comma.

##### `g-bind:viewBox="$.config.dimensions"`

- **Description**: The viewBox attribute defines the position and dimension of the SVG viewport. It
  expects four values: `min-x`, `min-y`, `width`, and `height`. This dynamically sets the `viewBox`
  attribute based on the dimension property from the config. The value of `$.config.dimensions`
  could be a string or an array

**Example**:

```svg
<svg :viewBox="$.config.dimensions">
```

---

##### `g-bind:viewBox="[0, 0, 100, data.length * 20]"`

- **Description**: The width is fixed at `500`, and the height dynamically adjusts based on
  `data.length`

**Example**:

```svg
<svg :viewBox="[0, 0, 100, data.length * 20]">
```

---

##### `g-bind:points="[[10, 10], [100, 10], [50, 100]]"`

- **Description**: The `points` attribute defines a list of points for a polygon or polyline. Each
  point is specified as a pair of `x`, `y` coordinates

**Example**:

```svg
<polygon g-bind:points="[[10, 10], [100, 10], [50, 100]]"></polygon>
```

#### style attribute

- Description : `g-bind` with the `style` attribute expects to receive an object with the keys/value
  to be applied as style. The behavior of this bind is additive, that is, the new values are added
  to the existing ones.

**Example**:
```svg
<circle style="fill: red" :style="{stroke: data.value}"
        cx="50" cy="50" r="40"/>
```

---

##### `g-bind:style="item.style"`

- **Description**: Binds the style attribute to an object stored in item.style. This allows the
  styles for the element to be dynamically controlled by the style object in the data

**Example**:

```svg
<rect :style="item.style"
      width="100" height="50"></rect>
```

---

##### `g-bind:style="{fill: item.color, stroke: item.border}"`

- **Description**: Dynamically binds the fill and stroke styles directly using properties from the
  data (item.color and item.border). This is useful for applying multiple dynamic styles in one
  expression

**Example**:

```svg
<rect :style="{fill: item.color, stroke: item.border}"
    width="100" height="50"></rect>
```

---

##### `g-bind:style="{fill: index % 2 === 0 ? 'red' : 'blue'}"`

- **Description**: Conditionally binds the fill style based on the index. If the index is even, the
  fill is set to red; otherwise, it is set to blue. This is useful for alternating styles in a loop

**Example**:

```svg
<circle :style="{fill: index % 2 === 0 ? 'red' : 'blue'}"
      r="10"></circle>
```

---

##### `g-bind:style="getCircleStyle(item)"`

- **Description**: Binds the style attribute using the result of the getCircleStyle(item) function.
  This allows for complex, custom logic to define the styles dynamically

**Example**:

```svg
<circle :style="getCircleStyle(item)" r="10"></circle>
```

---

#### class attribute

- **Description**: `g-bind` with the `class` attribute expects to receive a string or array of
  string with the classes to be applied. The behavior of this bind is additive, that is, the new
  values are added to the existing ones.


##### `g-bind:class="item.class"`

- **Description**: Binds the class attribute to a class name stored in item.class. The class can be
  dynamically set based on the data

**Example**:
```svg 
<rect :class="item.class" 
      width="100" height="50"></rect>
```

---

##### `g-bind:class="item.isActive ? 'active-class' : 'inactive-class'"`

- **Description**: Conditionally binds the class attribute based on the value of item.isActive. If
  isActive is true, the class `active-class` is applied; otherwise, `inactive-class` is used.

**Example**:

```svg
<rect :class="item.isActive ? 'active-class' : 'inactive-class'"
      width="100" height="50"></rect>
```

---

##### `g-bind:class="[item.class, $.config.class]"`

- **Description**: Binds multiple classes to the element by combining item.class and a class from
  the configuration ($.config.class). This allows combining data-driven and configuration-driven
  classes

**Example**:

```svg
<rect :class="[item.class, $.config.class]"
      width="100" height="50"></rect>
```

---

##### `g-bind:class="getCircleClasses(item)"`

- **Description**: Binds the class attribute using the result of the getCircleClasses(item)
  function. The function can return a class or an array of classes, allowing for complex class logic

**Example**:

```svg
<circle :class="getCircleClasses(item)" r="10"></circle>
```

---

#### General helpers 

- **Description**: The `g-bind` directive has several helper functions that can be used in
  expressions, which always begin with `$$.` followed by the name of the helper. These general
  helpers work with all attributes except for the special cases of `style` and `class`.

##### `$$.currentValue()`

**`g-bind:attribute_name="$$.currentValue()"`**

- **Description**: This helper function retrieves the current attribute value. It is useful when you
  need to access to the value into the expression. 

**Example**:

```svg
<circle r="10" :r="$$.currentValue() + item.r"
        cx="10" cy="10" fill="red"/>
```

---

##### `$$.dynamic()`

**`g-bind:attribute_name="$$.dynamic(value)"`**

- **Description**: This helper animates the transition of the value over time, creating smooth
  transitions for the attribute it is bound to. It is typically used to animate attributes like
  position, size, or color.

**Example**:

```svg
<circle r="0" :r="$$.dynamic(10)"
        cx="10" cy="10" fill="red"/>
```

**`g-bind:attribute_name="$$.dynamic(value, time)"`**

- **Description**: This helper animates the change of the value over a specified time interval. It
  is useful for controlling the speed of the animation, allowing for more refined and timed
  transitions.

**Example**:

```svg
<circle r="0" :r="$$.dynamic(10, 1000)"
        cx="10" cy="10" fill="red"/>
```

---

#### Transform helpers

- Description: The `g-bind` directive on the `transform` attribute has a number of helper functions
  that can be used to construct the transformation. It always starts with `$$.` followed by
  the name of the transformation. Transform functions can be chained together.

**Example**:
```svg
<rect g-bind:transform="$$.scale(2).translate(30, 30).skewY(30)"
      width="50" height="50" fill="pink"/>
```

##### `$$.scale()`

**`g-bind:transform="$$.scale(x, y)"`**

- **Description**: This helper applies a scale transformation, scaling the element by x along the
  horizontal axis and by y along the vertical axis. It is useful for resizing elements dynamically

**Example**:

```svg
<rect g-bind:transform="$$.scale(2, 1.5)"
      width="50" height="50" fill="blue"/>
```

---

##### `$$.translate()`

**`g-bind:transform="$$.translate(x, y)"`**

- **Description**: This helper applies a translation (movement) transformation, shifting the element
  by x units horizontally and y units vertically. It is used to move elements to a new position

**Example**:

```svg
<rect g-bind:transform="$$.translate(30, 50)"
      width="50" height="50" fill="green"/>
```

---

##### `$$.rotate()`

**`g-bind:transform="$$.rotate(a, x, y)"`**

- **Description**: This helper applies a rotation transformation. It rotates the element by a
  degrees around the point (x, y). If x and y are not provided, the rotation happens around the
  element’s center

**Example**:

```svg
<rect g-bind:transform="$$.rotate(45, 25, 25)"
      width="50" height="50" fill="red"/>
```

---

##### `$$.skewX()`

**`g-bind:transform="$$.skewX(a)"`**

- **Description**: This helper applies a skew transformation along the X-axis, skewing the element
  by a degrees. It distorts the shape horizontally

**Example**:

```svg
<rect g-bind:transform="$$.skewX(30)"
      width="50" height="50" fill="orange"/>
```

---

##### `$$.skewY()`

**`g-bind:transform="$$.skewY(a)"`**

- **Description**: This helper applies a skew transformation along the Y-axis, skewing the element
  by a degrees. It distorts the shape vertically

**Example**:

```svg
<rect g-bind:transform="$$.skewY(30)"
      width="50" height="50" fill="purple"/>
```

---

##### `$$.matrix()`

**`g-bind:transform="$$.matrix(a, b, c, d, e, f)"`**

- **Description**: This helper applies a matrix transformation using the six parameters (a, b, c, d,
  e, f), which define a combination of translation, scaling, rotation, and skewing in a single
  operation. It offers complete control over the element’s transformation

**Example**:

```svg
<rect g-bind:transform="$$.matrix(1, 0.5, 0, 1, 30, 50)"
      width="50" height="50" fill="yellow"/>
```

---

#### Path helpers

- **Description**: the g-bind directive over the d attribute of SVG paths can use several
  helpers for building complex geometrical forms dynamically. These helpers allow you to define
  movements, lines, curves, and other path elements. t always starts with `$$.` followed by
  the name of the path command. Path helpers can be chained together.

**Example**
```svg
<path :d="$$.M(50, 50).L(100, 50).L(100, 100).Z()"></path>
```

---

##### `$$.M()` `$$.m()` Move To

**`g-bind:d="$$.M(x, y)`**

- **Description**: Moves the pen to the coordinates (x, y) without drawing a line. This defines the
  starting point of the path.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50)" stroke="black"/>
```

---

**`g-bind:d="$$.m(dx, dy)`**

- **Description**: Moves the pen by a relative offset (dx, dy) from the current position without
  drawing a line.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).m(10, 20)"
      stroke="black"/>
```

##### `$$.L()` `$$.l()` Line To

**`g-bind:d="$$.L(x, y)`**

- **Description**: Draws a straight line from the current position to the new coordinates (`x`, 
  `y`).

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).L(100, 100)"
      stroke="black"/>
```

**`g-bind:d="$$.l(dx, dy)`**

- **Description**: Draws a relative line from the current position, offset by (`dx`, `dy`)

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).l(50, 50)"
      stroke="black"/>
```

---

##### `$$.H()` `$$.h()` Line To

**`g-bind:d="$$.H(x)`**

- **Description**: Draws a horizontal line to the x position.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).H(100)"
      stroke="black"/>
```

**`g-bind:d="$$.h(dx)`**

- **Description**: Draws a relative horizontal line by dx from the current position.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).h(50)"
      stroke="black"/>
```

---

##### `$$.V()` `$$.v()` Line To

**`g-bind:d="$$.V(y)`**

- **Description**: Draws a vertical line to the y position.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).V(100)"
      stroke="black"/>
```

**`g-bind:d="$$.v(dy)`**

- **Description**: Draws a relative vertical line by dy from the current position.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).v(50)"
      stroke="black"/>
```

---

##### `$$.C()` `$$.c()` Cubic Bézier curve

**`g-bind:d="$$.C(x1, y1, x2, y2, dx, dy)`**

- **Description**: Draws a cubic Bézier curve from the current point to (`x`, `y`), using (`x1`, 
  `y1`) as the control point for the start and (x2, y2) as the control point for the end.

**Example**:

```svg
<path g-bind:d="$$.M(0, 50).C(10, 10, 90, 90, 100, 50)"
      stroke="black" fill="none"/>
```

**`g-bind:d="$$.c(dx1, dy1, dx2, dy2, dx, dy)`**

- **Description**: Draws a relative cubic Bézier curve using relative offsets for control points and
  end point.

**Example**:

```svg
<path g-bind:d="$$.M(0, 50).c(10, -40, 90, 40, 100, 0)"
      stroke="black" fill="none"/>
```

---

##### `$$.S()` `$$.s()` Cubic Bézier curve

**`g-bind:d="$$.S(x2, y2, x, y)`**

- **Description**: Draws a smooth cubic Bézier curve to the point (`x`, `y`), using (`x2`, `y2`) as 
  the control point for the end. It assumes the second control point is a reflection of the first
  control point from the previous curve.

**Example**:

```svg
<path g-bind:d="$$.M(50, 30).S(0,60,50,100)" stroke="black" fill="none"/>
```

**`g-bind:d="$$.s(dx2, dy2, dx, dy)`**

- **Description**: Draws a relative smooth cubic Bézier curve using relative offsets for the control
  and end points.

**Example**:

```svg
<path g-bind:d="$$.M(50, 30).s(-50, 30, 0, 70)"
      stroke="black" fill="none"/>
```

---

##### `$$.Q()` `$$.q()` Quadratic Bézier curve

**`g-bind:d="$$.Q(x1, y1, x, y)`**

- **Description**: Draws a quadratic Bézier curve from the current point to (`x`, `y`), using
  (`x1`, `y1`) as the control point.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).Q(100, 50, 100, 100)"
      stroke="black" fill="none"/>
```

**`g-bind:d="$$.q(dx1, dy1, dx, dy)`**

- **Description**: Draws a relative quadratic Bézier curve using relative offsets for the control
  and end points.

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).q(50, 0, 50, 50)"
      stroke="black" fill="none"/>
```

---

##### `$$.T()` `$$.t()` Quadratic Bézier curve

**`g-bind:d="$$.T(x, y)`**

- **Description**: Draws a smooth quadratic Bézier curve to (`x`, `y`), assuming the control point is
  the reflection of the previous curve's control point.

**Example**:

```svg
<path :d="$$.M(10,50).Q(25,25,40,50).T(70,50).T(100,50).T(130,50).T(160,50).T(190,50)"
      stroke="black" fill="none"/>
```

**`g-bind:d="$$.t(dx, dy)`**

- **Description**: Draws a relative smooth quadratic Bézier curve to (`dx`, `dy`) using relative
  offsets.

**Example**:

```svg
<path :d="$$.M(10,50).Q(25,25,40,50).t(30,0,30,0,30,0,30,0,30,0)"
      stroke="black" fill="none"/>
```

---

##### `$$.A()` `$$.a()` Elliptical Arc

**`g-bind:d="$$.A(rx, ry, a, arcflag, sweepflag, x, y)`**

- **Description**: Draws an arc from the current position to (`x`, `y`) with the specified radii (
  `rx`, `ry`), rotation (`a`), and flags (`arcflag`, `sweepflag`).

**Example**:

```svg
<path g-bind:d="$$.M(50, 50).A(50, 50, 0, 0, 1, 100, 100)"
      stroke="black" fill="none"/>
```

**`g-bind:d="$$.a(rx, ry, a, arcflag, sweepflag, dx, dy)`**

- **Description**: Draws a relative arc using relative coordinates for the end point and specified
  radii and flags Example:
 ```svg    
<path g-bind:d="$$.M(50, 50).a(50, 50, 0, 0, 1, 50, 50)" 
      stroke="black" fill="none"/>
```

---

##### `$$.Z()` `$$.z()` Close Path

**`g-bind:d="$$.Z()"`**
 
**`g-bind:d="$$.z()`**

- **Description**: Closes the current path by drawing a straight line from the current position to
  the starting point of the path Example:

```svg
<path g-bind:d="$$.M(50, 50).L(100, 50).L(100, 100).Z()"
      stroke="black" fill="violet"/>
```


### `g-content`

**`g-content="expression`**

- **Purpose**: `g-content` dynamically inserts SVG content or text into an element. It can be used 
  to embed either raw SVG markup or plain text content, such as labels or annotations. This makes it
  versatile for managing both textual and graphical updates within SVG templates.
- **Expression**: The value returned by the expression is inserted as content of the tag replacing 
  the previous children.

---

#### `g-content="item.text"`

- **Description**: Dynamically inserts text content from the item.text property into an SVG text
  element. This is useful for displaying labels, annotations, or any dynamic text.

**Example**:

```svg
<text x="50" y="50" 
      g-content="item.text"></text>
```

---

#### `g-content="'Total: ' + item.value" `

- **Description**: Dynamically inserts a concatenated string that combines static text (`'Total: '`)
  with the dynamic `item.value` property. This is useful for displaying dynamic values with labels.

**Example**:

```svg
<text x="50" y="50" 
      g-content="'Total: ' + item.value"></text>
```

---

#### `g-content="`Total: ${ item.value }`" `

- **Description**: Dynamically inserts a template string that combines static text (`'Total: '`) 
  with the dynamic `item.value` property. This is useful for displaying dynamic values with labels.

**Example**:

```svg
<text x="50" y="50" 
      g-content="`Total: ${ item.value }`"></text>
```

---

#### `g-content="getLabel(item)"`

- **Description**: Displays the text returned from the `getLabel(item)` function. This is useful
  when complex logic is required to generate the text content.

**Example**:

```svg
<text x="50" y="50" 
      g-content="getLabel(item)"></text>
```

---

#### `g-content="item.icon"`

- **Description**: Dynamically inserts SVG content from the item.icon property. This allows SVG
  elements (e.g., paths, shapes) to be embedded dynamically into a container element such as `<g>`.

**Example**:

```svg
<g g-content="item.icon"></g>
```

---

#### `g-content="getSVGElement(item)"`

- **Description**: Dynamically inserts SVG content returned by the `getSVGElement(item)` function.
  This function can generate complex SVG elements based on the data.

**Example**:

```svg
<g g-content="getSVGElement(item)"></g>
```

---

#### `g-content="item.htmlContent"`

- **Description**: Inserts raw HTML item.htmlContent into a foreignObject SVG tag. This allows
  embedding HTML fragments.

**Example**:

```svg
<foreignObject x="20" y="20" width="160" height="160" 
               g-content="item.htmlContent"></foreignObject>
```

---


#### Helpers

- **Description**: The `g-content` directive has helpers functions that can be used in expressions, 
  which always begin with `$$.` followed by the name of the helper.

##### `$$.fromURL()`

**`g-content="$$.fromURL('resource')"`**

- **Description**: This helper loads content from a specified URL (resource). It is useful when you
  want to dynamically load external content, such as SVG files, images, or text, into the component
  at runtime.

**Example**:
```svg
<g g-content="$$.fromURL('https://example.com/content.svg')"></g>
```

##### `$$.currentContent()`

**`g-content="$$.currentContent()"`**

- **Description**: This helper retrieves the current content of the element, allowing you to use it
  in transformations, updates, or conditionally modifying it within the component. It is helpful
  when you want to work with the content dynamically and apply transformations or updates based on
  the existing state.

**Example**:
```svg
<text g-content="$$.currentContent() + ' updated'" x="50" y="50"></text>
```

### `g-on`

**`g-on:event_name="expression`**

**`@event_name="expression`**

- **Purpose**: `g-on`attaches event listeners (such as `click`, `mouseover`, `mouseout`) to an SVG 
  element. The shorthand `@` can be used as an alias for `g-on`.
- **Expression**: The function name defined in the methods section of the `g-composer` component.


#### `g-on:click="handleClick"`

- **Description**: Binds a click event to the `handleClick` method. When the element is clicked, the
  method is executed. This is useful for handling user interactions like button clicks or selecting
  elements.
- **Note**: the `click` event in SVG takes into account if the element has a `fill="none"` 
  attribute, in that case the event will only be triggered if the element's border is clicked. 
  On the contrary, if the element has a `fill="transparent"` attribute, the click event will be 
  triggered if you click anywhere inside the element.

**Example**:
```svg
<rect width="100" height="50" 
      @click="handleClick"></rect>
```

#### `g-on:mouseover="showTooltip(item)"`

- **Description**: Passes the `item` data object to the `showTooltip` method when the `mouseover`
  event is fired. This is useful for passing specific data to the event handler.

**Example**:
```svg
<circle r="10" cx="50" cy="50" 
        @mouseover="showTooltip(item)"></circle>
```

#### `g-on:click="this.r(this.r() + 10)"`

- **Description**: In the event expression `this` refers to a wrapper of the SVG element. This 
  wrapper allows getting the value of any attribute using a function with the attribute name 
  without parameters and setting a value to the attribute by passing a parameter to the function.

**Example**:
```svg
<circle @click="this.r(this.r() + 10)"
        r="10"
        cx="50" cy="50" fill="transparent" stroke="black"/>
```

#### `g-on:contextmenu ="(ev) => ev.preventDefault() || this.r(this.r() - 10)"`

- **Description**: It is possible to include arrow function or other JavaScript expressions inside 
  the `g-on` expression.

**Example**:
```svg
<circle @contextmenu ="(ev) => ev.preventDefault() || this.r(this.r() - 10)"
        @click="this.r(this.r() + 10)"
        r="10"
        cx="50" cy="50" fill="transparent" stroke="black"/>
```

#### `<svg g-on:init="intilizer">`

- **Description**: Executes the `initializer` function when the SVG is created and the Graphane
  `init` event is triggered. This event is fired only once when the `g-composer` template is
  created.

**Example**:
```svg
<svg viewBox="0 0 100 100" 
     @init="initializer"></svg>
```

#### `<svg g-on:render="updater">`

- **Description**: Executes the `updater` function when the SVG is rendered by Graphane and the
  `render` event is triggered. This event `render` is fired when the template is evaluated, for
  example, if any data changes.

**Example**:
```svg
<svg viewBox="0 0 100 100" 
     @init="updater"></svg>
```

