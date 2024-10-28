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

### `:path="$$.regularPolygon(cx, cy, r, sides, [start = 0])"`

Creates an n-sided polygon based on a center (`cx` and `cy`) and a radius (`r`). Optionally, it is
possible to include a start position (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `sides`     - sides
- `start`     - initial angle (optional, default value `0`)

<ClientOnly>
<g-composer data="sides: 5, rotation: 0" id="regularPolygon">
  <g-script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></g-script>
  <svg viewBox="0 0 100 100">
    <path stroke="black" stroke-width="1" fill="none" 
          g-bind:d="$$.regularPolygon(50, 50, 50, sides, rotation)"/>
  </svg>
</g-composer>
<p>
  <label>sides: 
    <input id="rpSidedRange" type="range" min="3" max="25" value="4"
           oninput="document.querySelector('#regularPolygon').data.sides = document.querySelector('#rpSidedNumber').value = Number(this.value)">
    <input id="rpSidedNumber" type="number" min="3" max="25" value="4"
           oninput="document.querySelector('#regularPolygon').data.sides = document.querySelector('#rpSidedRange').value = Number(this.value)">
  </label>
</p>
<p>
  <label>start: 
    <input id="rpStartRange" type="range" min="-360" max="360" value="0"
           oninput="document.querySelector('#regularPolygon').data.rotation = document.querySelector('#rpStartNumber').value = Number(this.value)">
    <input id="rpStartNumber" type="number" min="-360" max="360" value="0"
          oninput="document.querySelector('#regularPolygon').data.rotation = document.querySelector('#rpStartRange').value = Number(this.value)">
  </label>
</p>
<g-editor href="#regularPolygon"></g-editor>
</ClientOnly>


### `:path="$$.arc(cx, cy, r, grades, [start = 0] )"`

Creates an arc (section of the circumference) based on a center (`cx` and `cy`), a radius (`r`),
positive or negative number of grades (`grades`), and optionally a start angle (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `grades`    - grades in degrees
- `start`     - start position in degrees (optional, default value `0`)

<ClientOnly>
<g-composer data="grades: 90, start: 0" id="arc">
  <g-script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></g-script>
  <svg viewBox="0 0 100 100">
    <path stroke="black" stroke-width="1" fill="none" 
          g-bind:d="$$.arc(50, 50, 48, grades, start)"/>
  </svg>
</g-composer>
<p>
  <label>grades:
    <input id="arcGradesRange" type="range" min="-360" max="360" value="90"
           oninput="document.querySelector('#arc').data.grades = document.querySelector('#arcGradesNumber').value = Number(this.value)">
    <input id="arcGradesNumber" type="number" min="-360" max="360" value="90"
           oninput="document.querySelector('#arc').data.grades = document.querySelector('#arcGradesRange').value = Number(this.value)">
</label>
</p>
<p>
  <label>start: 
    <input id="arcStartRange" type="range" min="-360" max="360" value="0"
           oninput="document.querySelector('#arc').data.start = document.querySelector('#arcStartNumber').value = Number(this.value)">
    <input id="arcStartNumber" type="number" min="-360" max="360" value="0"
           oninput="document.querySelector('#arc').data.start = document.querySelector('#arcStartRange').value = Number(this.value)">
  </label>
</p>
<g-editor href="#arc"></g-editor>
</ClientOnly>

### `:path="$$.barArc(cx, cy, r, width, grades, [start = 0] )"`

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

<ClientOnly>
<g-composer data="grades: 90, start: 0" id="barArc">
  <g-script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></g-script>
  <svg viewBox="0 0 100 100">
    <path stroke="black" stroke-width="1" fill="none" 
          g-bind:d="$$.barArc(50, 50, 40, 10, grades, start)"/>
  </svg>
</g-composer>
<p>
  <label>grades:
    <input id="barGradesRange" type="range" min="-360" max="360" value="90"
           oninput="document.querySelector('#barArc').data.grades = document.querySelector('#barGradesNumber').value = Number(this.value)">
    <input id="barGradesNumber" type="number" min="-360" max="360" value="90"
           oninput="document.querySelector('#barArc').data.grades = document.querySelector('#barGradesRange').value = Number(this.value)">
</label>
</p>
<p>
  <label>start: 
    <input id="barStartRange" type="range" min="-360" max="360" value="0"
           oninput="document.querySelector('#barArc').data.start = document.querySelector('#barStartNumber').value = Number(this.value)">
    <input id="barStartNumber" type="number" min="-360" max="360" value="0"
           oninput="document.querySelector('#barArc').data.start = document.querySelector('#barStartRange').value = Number(this.value)">
  </label>
</p>
<g-editor href="#barArc"></g-editor>
</ClientOnly>

### `:path="$$.circleSlice(cx, cy, r, grades, [start = 0] )"`

Creates a circle slice (section of the circle) based on a center (`cx` and `cy`), a radius 
(`r`), positive or negative number of grades (`grades`), and optionally a start angle (in degrees).

Parameters:

- `cx`        - center x
- `cy`        - center y
- `r`         - radius
- `grades`    - grades in degrees
- `start`     - start position in degrees (optional, default value `0`)

<ClientOnly>
<g-composer data="grades: 90, start: 0" id="circleSlice">
  <g-script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></g-script>
  <svg viewBox="0 0 100 100">
    <path stroke="black" stroke-width="1" fill="none" 
          g-bind:d="$$.circleSlice(50, 50, 40, grades, start)"/>
  </svg>
</g-composer>
<p>
  <label>grades:
    <input id="sliceGradesRange" type="range" min="-360" max="360" value="90"
           oninput="document.querySelector('#circleSlice').data.grades = document.querySelector('#sliceGradesNumber').value = Number(this.value)">
    <input id="sliceGradesNumber" type="number" min="-360" max="360" value="90"
           oninput="document.querySelector('#circleSlice').data.grades = document.querySelector('#sliceGradesRange').value = Number(this.value)">
</label>
</p>
<p>
  <label>start: 
    <input id="sliceStartRange" type="range" min="-360" max="360" value="0"
           oninput="document.querySelector('#circleSlice').data.start = document.querySelector('#sliceStartNumber').value = Number(this.value)">
    <input id="sliceStartNumber" type="number" min="-360" max="360" value="0"
           oninput="document.querySelector('#circleSlice').data.start = document.querySelector('#sliceStartRange').value = Number(this.value)">
  </label>
</p>
<g-editor href="#circleSlice"></g-editor>
</ClientOnly>

### `:path="$$.circle(cx, cy, r)"`

We recommend making the circles with the `circle` element of the SVG, but if you need to create a
circle inside a `path` element, you can use this function with a center (`cx` and `cy`), and a 
radius (`r`).

Parameters:

- `cx`    - center x
- `cy`    - center y
- `r`     - radius

<ClientOnly>
<g-composer data="r: 25, start: 0" id="circle">
  <g-script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></g-script>
  <svg viewBox="0 0 100 100">
    <path stroke="black" stroke-width="1" fill="none" 
          g-bind:d="$$.circle(50, 50, r)"/>
  </svg>
</g-composer>
<p>
  <label>radius:
    <input id="circleRange" type="range" min="0" max="50" value="25"
           oninput="document.querySelector('#circle').data.r = document.querySelector('#circleNumber').value = Number(this.value)">
    <input id="circleNumber" type="number" min="0" max="50" value="25"
           oninput="document.querySelector('#circle').data.r = document.querySelector('#circleRange').value = Number(this.value)">
  </label>
</p>
<g-editor href="#circle"></g-editor>
</ClientOnly>

### `$$.star(cx, cy, r1, r2, points, [start=0])`

This function allows to create a star in a `path` element. To do this you must pass a
center (`cx`, `cy`), an outer radius (`r1`), an inner radius (`r2`), the points of the
star (`points`), and optionally, the angle at which to start (in degrees).

Parameters:

`cx`        - center x
`cy`        - center y
`r1`        - external radius
`r2`        - internal radius
`sides`     - sides
`start`     - initial angle (optional, default value `0`)

<ClientOnly>
<g-composer data="r1: 25, r2:15, sides: 5, start: 0" id="start">
  <g-script type="plugin" src="https://cdn.graphery.online/graphane/1.0.0-beta/plugins/shapes.js"></g-script>
  <svg viewBox="0 0 100 100">
    <path stroke="black" stroke-width="1" fill="none" 
          g-bind:d="$$.star(50, 50, r1, r2, sides, start)"/>
  </svg>
</g-composer>
<p>
  <label>r1: 
    <input id="star_r1_Range" type="range" min="0" max="50" value="25"
           oninput="document.querySelector('#start').data.r1 = document.querySelector('#star_r1_Number').value = Number(this.value)">
    <input id="star_r1_Number" type="number" min="0" max="50" value="25"
           oninput="document.querySelector('g-composer#start').data.r1 = document.querySelector('#star_r1_Range').value = Number(this.value)">
    </label>
</p>
<p>
  <label>r2: 
    <input id="star_r2_Range" type="range" min="0" max="50" value="15"
           oninput="document.querySelector('#start').data.r2 = document.querySelector('#star_r2_Number').value = Number(this.value)">
    <input id="star_r2_Number" type="number" min="0" max="50" value="15"
           oninput="document.querySelector('g-composer#start').data.r2 = document.querySelector('#star_r2_Range').value = Number(this.value)">
  </label>
</p>
<p>
  <label>sides: 
    <input id="star_sides_Range" type="range" min="0" max="50" value="5"
           oninput="document.querySelector('#start').data.sides = document.querySelector('#star_sides_Number').value = Number(this.value)">
    <input id="star_sides_Number" type="number" min="0" max="50" value="5"
           oninput="document.querySelector('g-composer#start').data.sides = document.querySelector('#star_sides_Range').value = Number(this.value)">
  </label>
</p>
<p>
  <label>start: 
    <input id="star_start_Range" type="range" min="-360" max="360" value="0"
           oninput="document.querySelector('#start').data.start = document.querySelector('#star_start_Number').value = Number(this.value)">
    <input id="star_start_Number" type="number" min="-360" max="360" value="0"
           oninput="document.querySelector('g-composer#start').data.start = document.querySelector('#star_start_Range').value = Number(this.value)">
  </label>
</p>
<g-editor href="#start"></g-editor>
</ClientOnly>


## `$.polar2cartesian(cx, cy, r, angleDegrees)`

This helper returns an `x,y` point from an angular value, a center point and a radius.

Parameters:

- `cx`           - center x
- `cy`           - center y
- `r`            - radius
- `angleDegrees` - angle in degrees

Returns:

- `{x : *, y : *}`

## `$.degrees2radians(degrees)`

This helper converts an angle from degrees to radians.

Parameters:

- `degrees` - angle in degrees

Returns:

- angle in radians