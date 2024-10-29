---
outline: deep
---

# Config

In Graphane, the `<script type="config">` section is used to define configuration settings that are
shared across your component. These configuration settings can include default colors, dimensions,
and other customizable parameters that are applied globally throughout the template.

## Inline Configuration

- **Description**: You can define configuration settings directly inside the
  `<script type="config">` tag.

**Example**:
```html
<script type="config">
  {
    "circleColor": "blue",
    "rectColor": "green"
  }
</script>
```
---

## External Configuration

- **Description**: You can load configuration settings using the **`src`** attribute of
  `<script type="config">`.

**Example**:

```html
<script type="config" src="config.json"></script>
```

- **Description**: You can load configuration settings from an external file using the **`config-src`** attribute of 
`<g-composer>`.

**Example**:

```html
<g-composer config-src="config.json"></g-composer>
```

---

## Access to Config from the Template

- **Description**: You can access the configuration values directly in the template using
  `$.config`. These values can be bound to any attribute using `g-bind` or used in directives like
  `g-if` and `g-content`.

**Example**:

```html
<circle cx="50" cy="50" r="40" g-bind:fill="$.config.circleColor"></circle>
```

---

## Using Config in Methods

- **Description**: Inside the `<script type="methods">` block, the `$.config` object is available
  for use or modification. This allows you to dynamically change configuration values based on
  interactions or conditions.

**Example**:

```html
<g-composer>
  <template>
    <svg viewBox="0 0 200 100">
      <circle cx="50" cy="50" r="40" 
              g-bind:fill="$.config.circleColor"></circle>
      <rect x="100" y="30" width="50" height="40" 
            g-bind:fill="$.config.rectColor" 
            g-on:click="changeRectColor"></rect>
    </svg>
  </template>
  <script type="config">
    {
      "circleColor": "blue",
      "rectColor": "green"
    }
  </script>
  <script type="methods">
    function changeRectColor() {
      $.config.rectColor = "red";  // Change the rectangle color when clicked
    }
  </script>
</g-composer>
```

---

