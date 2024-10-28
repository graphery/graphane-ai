---
outline: deep
---

# Composer

At the heart of Graphane is the `<g-composer>` element, which serves as the main container for all
components of your visualization. This container encapsulates the template, data, methods,
configuration, and external plugins necessary to render interactive and customizable graphics.

## `<g-composer>` Element

The `<g-composer>` element is the foundational container in Graphane. It holds all the parts of your
visualization and is responsible for rendering the final SVG output.

- **Purpose**: Encapsulates the entire component, including the template, data, methods,
  configuration, and plugins.
- **Allowed Child Elements**:
  - `<template>`
  - `<script type="data">`
  - `<script type="methods">`
  - `<script type="config">`
  - `<script type="plugins">`

**Example Usage**:

```html
<g-composer id="unique-id">
  <template>
    <!-- SVG with directives -->
  </template>
  <script type="data">
    <!-- CSV, JSON or JSON5 Data -->
  </script>
  <script type="methods">
    <!-- Methods -->
  </script>
  <script type="config">
    <!-- Config -->
  </script>
  <script type="plugin" src="plugin-url.js"></script>
</g-composer>
```


---

## `<template></template>`

- **Purpose**: Contains the dynamic SVG structure and layout of the component.
- **Functionality**: Defines how visual elements are rendered and interact with the data.
- **Usage**: Incorporates SVG elements with Graphane directives to bind data and methods.

**Inline Template Example**:

```html
<template>
  <svg viewBox="0 0 100 100">
    <!-- SVG elements with Graphane directives -->
  </svg>
</template>
```

**External Template Example**:

```html
<g-composer svg-src="template.svg"></g-composer>
```

---

## `<script type="data"></script>`

- **Purpose**: Holds the dataset for the component.
- **Formats Supported**: JSON, JSON5, or CSV.
- **Functionality**: Provides data used to dynamically generate and update visual elements.

**Inline Data Example**:

```html
<script type="data">
  [
    { "x": 10, "y": 20, "value": 30 },
    { "x": 40, "y": 50, "value": 60 },
    { "x": 70, "y": 80, "value": 90 }
  ]
</script>
```

**External Data Examples**:

```html
<script type="data" src="data.json"></script>
```

```html
<g-composer data-src="data.json"></g-composer>
```

---

## `<script type="methods"></script>`

- **Purpose**: Defines JavaScript functions to manipulate data or handle events.
- **Special Function**: `data` function, called when the template is rendered for data
  transformation.
- **Functionality**: Methods can be invoked in the template or triggered by user interactions.
- **Note**: Only functions defined with `function` are accessible from the template. Variables
  defined with `var`, `let` or `const` are accessible within the code included in the script but are
  not directly accessible from the template.

**Inline Methods Example**:

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

**External Methods Examples**:

```html
<script type="methods" src="methods.js"></script>
```

```html
<g-composer methods-src="methods.js"></g-composer>
```

---

## `<script type="config"></script>`

- **Purpose**: Provides configuration settings for the component.
- **Functionality**: Contains static values, parameters, or constants used across the visualization.

**Inline Config Example**:

```html
<script type="config">
  {
    "circleColor": "#3498db",
    "circleRadius": 5
  }
</script>
```

**External Config Examples**:

```html
<script type="config" src="config.json"></script>
```

```html
<g-composer config-src="config.json"></g-composer>
```

---

## `<script type="plugins"></script>`

- **Purpose**: Includes external JavaScript plugins to extend functionality.
- **Functionality**: Enhances the component with additional features or customizations.

**Example**:

```html
<script type="plugins" src="plugin-url.js"></script>
```

---

## Aliases for `<script>` in CMS

If you need to include `<g-composer>` with `<script>` in a CMS that does not accept this type of
tag, you can use `<g-script>` as an alternative. For example, `<g-script type="data></g-script>`.

---
