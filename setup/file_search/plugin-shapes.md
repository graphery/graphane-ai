---
outline: deep
---

# Plugin - Shapes

This plugin extends the functions of the `d` attribute of the `path` element by adding high-level
functions to create new shapes.

## Load

To load the plugin from the `g-composer` component we must use the URL:

```html
<script src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
```

```html
<g-composer>
  <script type="plugin"
          src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js">
  </script>
</g-composer>
```

## Use

### `:d="$$.regularPolygon(cx, cy, r, sides, [start = 0])"`

Creates an n-sided polygon based on a center (`cx` and `cy`) and a radius (`r`). Optionally, it is
possible to include a start position (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `sides`     - sides
- `start`     - initial angle (optional, default value `0`)

**Example**:

```html
<g-composer data="sides: 5, rotation: 0" id="regularPolygon">
  <script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
  <template>
    <svg viewBox="0 0 100 100">
      <path stroke="black" stroke-width="1" fill="none" 
            g-bind:d="$$.regularPolygon(50, 50, 50, sides, rotation)"/>
    </svg>
  </template>
  <script type="data">{
    slides: 7,
    rotation: 45
  }</script>
</g-composer>
```

### `:d="$$.arc(cx, cy, r, grades, [start = 0] )"`

Creates an arc (section of the circumference) based on a center (`cx` and `cy`), a radius (`r`),
positive or negative number of grades (`grades`), and optionally a start angle (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `grades`    - grades in degrees
- `start`     - start position in degrees (optional, default value `0`)

**Example**:

```html
<g-composer data="grades: 90, start: 0" id="arc">
  <script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
  <template>
    <svg viewBox="0 0 100 100">
      <path stroke="black" stroke-width="1" fill="none" 
            g-bind:d="$$.arc(50, 50, 48, grades, start)"/>
    </svg>
  </template>
  <script type="data">{
    grades: 90,
    start: 90
  }</script>
</g-composer>
```

### `:d="$$.barArc(cx, cy, r, width, grades, [start = 0] )"`

Creates a bar with arc form (section of the circumference) based on a center (`cx` and `cy`), a
radius (`r`), and width (`width`), positive or negative number of grades (`grades`), and optionally
a start angle (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `width`     - bar width
- `grades`    - grades in degrees
- `start`     - start position in degrees (optional, default value `0`)

**Example**:

```html
<g-composer data="grades: 90, start: 0" id="barArc">
  <script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
  <template>
    <svg viewBox="0 0 100 100">
      <path stroke="black" stroke-width="1" fill="none" 
            g-bind:d="$$.barArc(50, 50, 40, 10, grades, start)"/>
    </svg>
  </template>
  <script type="data">{
    grades: 90,
    start: 90
  }</script>
</g-composer>
```

### `:d="$$.circleSlice(cx, cy, r, grades, [start = 0] )"`

Creates a circle slice (section of the circle) based on a center (`cx` and `cy`), a radius 
(`r`), positive or negative number of grades (`grades`), and optionally a start angle (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `grades`    - grades in degrees
- `start`     - start position in degrees (optional, default value `0`)

**Example**:

```html
<g-composer data="grades: 90, start: 0" id="circleSlice">
  <script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
  <template>
    <svg viewBox="0 0 100 100">
      <path stroke="black" stroke-width="1" fill="none" 
            g-bind:d="$$.circleSlice(50, 50, 40, grades, start)"/>
    </svg>
  </template>
  <script type="data">{
    grades: 90,
    start: 90
  }</script>
</g-composer>
```

### `:d="$$.circle(cx, cy, r)"`

We recommend making the circles with the `circle` element of the SVG, but if you need to create a
circle inside a `path` element, you can use this function with a center (`cx` and `cy`), and a 
radius (`r`).

Parameters:

- `cx`    - center x
- `cy`    - center y
- `r`     - radius

**Example**:

```html
<g-composer data="r: 25, start: 0" id="circle">
  <script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
  <template>
    <svg viewBox="0 0 100 100">
      <path stroke="black" stroke-width="1" fill="none" 
            g-bind:d="$$.circle(50, 50, 30)"/>
    </svg>
  </template>
</g-composer>
```

### `:d="$$.star(cx, cy, r1, r2, points, [start=0])"`

This function allows creating a star in a `path` element. To do this you must pass a
center (`cx`, `cy`), an outer radius (`r1`), an inner radius (`r2`), the points of the
star (`points`), and optionally, the angle at which to start (in degrees).

Parameters:

`cx`        - center x
`cy`        - center y
`r1`        - external radius
`r2`        - internal radius
`sides`     - sides
`start`     - initial angle (optional, default value `0`)

**Example**:

```html
<g-composer data="r1: 25, r2:15, sides: 5, start: 0" id="start">
  <script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></script>
  <template>
    <svg viewBox="0 0 100 100">
      <path stroke="black" stroke-width="1" fill="none" 
            g-bind:d="$$.star(50, 50, r1, r2, sides, start)"/>
    </svg>
  </template>
  <script type="data">{
    grades: 90,
    start: 90
  }</script>
</g-composer>
```

## `$.polar2cartesian(cx, cy, r, angleDegrees)`

This helper is a utility that converts polar coordinates into Cartesian coordinates. Here's a
breakdown of its parameters and how it works:

Parameters:

- `cx`: The x-coordinate of the center point from which the radius is measured. This is the
  horizontal offset in the Cartesian coordinate system.
- `cy`: The y-coordinate of the center point from which the radius is measured. This is the vertical
  offset in the Cartesian coordinate system.
- `r`: The radius or distance from the center point to the point being calculated in polar
  coordinates.
- `angleDegrees`: The angle (in degrees) from the positive x-axis, measured counterclockwise. This
  angle determines the direction in which to move from the center point.

Returns:

- `{x : *, y : *}`

**Example**:

If you call `$.polar2cartesian(0, 0, 5, 90)`, it will calculate the point that is 5 units away from
the origin (0, 0) at an angle of 90 degrees. The result would be `(0, 5)`.

This function is particularly useful in graphical applications where you need to position elements
based on angles and distances, such as in circular layouts or when creating radial charts.

## `$.degrees2radians(degrees)`

This helper is a utility that converts an angle from degrees to radians. This conversion is
important in many mathematical and graphical applications, especially when working with
trigonometric functions, which typically use radians.

Parameters:

- `degrees` - the angle in degrees that you want to convert to radians.

Returns:

- The function returns the angle in radians.

**Example**:

If you call `$.degrees2radians(180)`, the result would be approximately `3.14159`.