---
outline: deep
---

# Data

In Graphane, data is the backbone of dynamic visualizations. It is defined using the
`<script type="data">` tag or loaded as external resource using
`<script type="data" src="data.json"></script>` or `<g-composer data-src="data.json">`. The data can
be in JSON, JSON5 or CSV formats. Inside the template, data is accessed as data, while in the
methods section, it is accessed as $.data. This allows for dynamic rendering of elements based on
the values within the dataset.

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

### JSON (JavaScript Object Notation) format

- **Description**: JSON is a lightweight, text-based format for structuring data. It uses key-value
  pairs and is commonly used for transmitting data between servers and web applications. JSON is
  strict about syntax, requiring double quotes around keys and values.

**Example**:

```html
<script type="data">
  {
    "name": "John",
    "age": 30,
    "isActive": true,
    "skills": ["HTML", "CSS", "JavaScript"]
  }
</script>
```

**Key Features**:

- Requires double quotes around keys and string values.
- Cannot contain trailing commas.

---

### JSON5 (JSON for Humans) format

- **Description**: JSON5 is a superset of JSON, providing a more relaxed syntax that allows for
  comments, trailing commas, single quotes, and other human-friendly features. It is more forgiving
  and easier to write by hand.

**Example**:

```html
<script type="data">
  {
    name: 'Jane',  // No need for double quotes
    age: 28,
    isActive: true,
    skills: ['Python', 'Django'],  // Trailing comma allowed
  }
</script>
```

**Key Features**:

- Supports single quotes.
- Allows comments and trailing commas.
- Does not require quotes around object keys.

---

### CSV (Comma-Separated Values) format

- **Description**: CSV is a text-based format for representing tabular data, where each row
  corresponds to a record and fields are separated by commas or semicolons. Graphane offers flexible
  support for:
  - Header records with field names that can be unquoted or quoted using double quotes (`"`) or
    single quotes (`'`).
  - Fields that can be separated by either a comma (` , `) or a semicolon (` ; `).
  - Fields that can be unquoted or quoted (using `"` or `'`).

- **Example**:
  ```html
  <script type="data">
    'name';'age';'isActive'
    "John Smith";30;true
    'Jane Taylor',28,true
    Bob;35,false
  </script>
  ```

- **Key Features**:
  - Each row represents a record, with values separated by commas (`,`) or semicolons (`;`).
  - Supports both quoted and unquoted field names and values.
  - Commonly used for representing simple, tabular data.
  - No hierarchical structure like JSON, making it less flexible for complex data.

---

## Usage in Template

In Graphane, data is directly accessible in the **template** through the `data` object. It can be
used to dynamically generate elements and bind attributes, content, and event handlers.

- **Looping**: You can loop through arrays using the **`g-for`** directive to dynamically generate
  multiple SVG elements.
- **Binding**: Use **`g-bind`** to bind attributes (e.g., `x`, `y`, `width`, `height`) to values in
  the data.
- **Conditional Rendering**: Use `g-if` to conditionally render elements based on the data.
- **Content**: Use **`g-content`** to display text based on the data.

**Example**:

```html
<g-composer>
  <template>
    <svg viewBox="0 0 200 150">
      <!-- Loop -->
      <g g-for="(item, index) of data">

        <!-- Rectangle representing data value -->
        <rect :x="index * 40"
              :y="100 - item.value"
              width="30"
              :height="item.value"
              fill="blue"></rect>

        <!-- Text showing the name -->
        <text :x="index * 40 + 15"
              y="110"
              text-anchor="middle"
              font-size="10"
              g-content="item.name"></text>

        <!-- Circle only shown if item.value > 50 -->
        <circle :cx="(index * 40) + 15"
                :cy="100 - item.value"
                r="10"
                fill="red"
                g-if="item.value > 50"></circle>
      </g>
    </svg>
  </template>

  <script type="data">
    [
      { "name": "Item 1", "value": 45 },
      { "name": "Item 2", "value": 60 },
      { "name": "Item 3", "value": 30 }
    ]
  </script>
</g-composer>
```

- **Note**: possible changes in the `data` that occur directly in the template have no effect on the
  `g-composer` data since these are protected and the template works on a copy of them. If you want
  to change the data from the template you can use `$.data` which refers to the data as such.

---

## Implicit destructing with `data` object

In Graphane, when the data is defined as an object rather than an array, each property of the object
can be accessed directly within the template. This allows you to bind attributes and content to
specific properties of the object without needing to loop over an array.

**Example**:

```html
<g-composer>
  <template>
    <svg viewBox="0 0 200 100">
      <!-- Using object properties directly -->
      <text x="10" y="30" font-size="20" g-content="title"></text>
      <rect x="10" y="50" width="100" :height="value" :fill="color"></rect>
    </svg>
  </template>
  <script type="data">
    {
      "title": "Graphane Example",
      "value": 75,
      "color": "green"
    }
  </script>
</g-composer>
```

---

## Data helpers

When `data` is an array, Graphane adds helper functions to quickly perform operations and
calculations on the data. These helpers are accessible as `data.$sum()`, `data.$min()`, and so on.
These helpers are accessible in the data object both in the template and in the
`function data()`.

### `data.$min()`

**`data.$min([key])`**

- **Description**: Returns the minimum value in the data array. If a key is provided, it returns the
  minimum value for that key.

**Example**:

```svg
<text x="10" y="5">minimum:<t-span g-content="data.$min('value')"></t-span></text>
```

---

### `data.$max()`

**`data.$max([key])`**

- **Description**: Returns the maximum value in the data array. If a key is provided, it returns the
  maximum value for that key.

**Example**:

```svg
<text x="20" y="5">maximum:<t-span g-content="data.$max('value')"></t-span><text>
```

---

### `data.$count()`

**`data.$count([key])`**

- **Description**: Returns the count of elements in the array. If a key is provided, it returns the
  count of elements where the key exists.

**Example**:

```svg
<text x="30" y="5">values:<t-span g-content="data.$count('value')"></t-span></text>
```

---

### `data.$sum()`

**`data.$sum([key])`**

- **Description**: Returns the sum of values in the array. If a key is provided, it returns the sum
  of the key's values.

**Example**:

```svg
<text x="40" y="5">total:<t-span g-content="data.$sum('value')"></t-span></text>
```

---

### `data.$avg()`

**`data.$avg([key])`**

- **Description**: Returns the average of values in the array. If a key is provided, it calculates
  the average for the key's values.

**Example**:

```svg
<text x="50" y="5">average:<t-span g-content="data.$avg('value')"></t-span></text>
```

---

### `data.$distinct()`

**`data.$distinct([key])`**

- **Description**: Returns an array of distinct values for the given key.

**Example**:

```svg

<g g-for="(category, index) of data.$distinct('category')">
  <text :x=" index * 50" y="50" g-content="category"></text>
</g>
```

---

### `data.$sumBefore()`

**`data.$sumBefore(index, [key])`**

- **Description**: Returns the sum of the values in the data array before a position (index). If a
  key is provided, returns the sum of the values of that key.

**Example**:

```svg

<g g-for="(item, index) of data">
  <text g-content="data.$sumBefore(index, 'value')"></text>
</g>
```

---

### `data.$maxBefore()`

**`data.$maxBefore(index, [key])`**

- **Description**:

- **Description**: Returns the maximum of the values in the data array before a position (index). If
  a key is provided, returns the maximum of the values of that key.

**Example**:

```svg
<g g-for="(item, index) of data">
  <text g-content="data.$maxBefore(index)"></text>
</g>
```

---

### `data.$minBefore()`

**`data.$minBefore(index, [key])`**

- **Description**: Returns the minimum of the values of the data array before a position (index). If
  a key is provided, returns the minimum of the values of that key.

**Example**:

```svg
<g g-for="(item, index) of data">
  <text g-content="data.$minBefore(index)"></text>
</g>
```

---

### `data.$avgBefore()`

**`data.$avgBefore(index, [key])`**

- **Description**: Returns the average of the values in the data array before a position (index). If
  a key is provided, returns the average of the values of that key.

**Example**:

```svg
<g g-for="(item, index) of data">
  <text g-content="data.$minBefore(index)"></text>
</g>
```

---

### `data.$distinctBefore()`

**`data.$distinctBefore(index, [key])`**

- **Description**: Returns an array of unique values in the data array before a position (index). If
  a key is provided, returns the unique array of the values of that key.

**Example**:

```svg
<g g-for="(item, index) of data.$distinctBefore(10)"></g>
```

---

### `data.$countBefore()`

**`data.$countBefore(index, [key])`**

- **Description**: Returns an number of values in the data array before a position (index). If a key
  is provided, returns the number of the values of that key.

**Example**:

```svg
<g g-for="(item, index) of data">
  <text g-content="data.$countBefore(index, 'x')"></text>
</g>
```

---

## Data transformation

You can define a `data()` transformation function to preprocess or transform the raw data before
rendering it in the template. This function is placed inside the `<script type="methods">` tag. The
transformed data is then accessible as `data`.

**Example**:

```html
<g-composer>
  <template>
    <svg viewBox="0 0 100 100">
      <g g-for="(item, index) of data" font-size="10">
        <text :y="(index + 1) * 10" x="5" g-content="item.country"></text>
        <text :y="(index + 1) * 10" x="60" g-content="item.totalMedals"></text>
      </g>
    </svg>
  </template>
  <script type="data">
    [
      { "country": "USA", "gold": 10, "silver": 5, "bronze": 2 },
      { "country": "Canada", "gold": 6, "silver": 7, "bronze": 8 }
    ]
  </script>
  <script type="methods">
    function data(originalData) {
      return originalData.map(item => ({
        country: item.country,
        totalMedals: item.gold + item.silver + item.bronze
      }));
    }
  </script>
</g-composer>
```

## Usage in Methods

In the `<script type="methods">` section, `data` can be accessed or modified using `$.data`.

**Example**:

```html
<script type="methods">
  function addNewItem() {
    $.data.push({ name: 'New Item', value: 40 });
  }
</script>
```

## `data` attribute and property

When the data to be handled is basic, you can use the `data` attribute of `g-composer` indicating
keys and values separated by comma (`,`) or semicolon (`;`).

```html
<g-composer data="w: 80, h: 80" id="example">
  <template>
    <svg viewBox="0 0 100 100">
      <rect x="0" y="0" fill="green"
            :width="data.w"
            :height="data.h"/>
    </svg>
  </template>
</g-composer>
```

You can manipulate the `.data` property of `g-composer`, and when a change occurs in this object, 
the SVG graphic will be automatically updated with the new data.

```html
<p>
  <label>width:
    <input type="range" min="0" max="100" value="80"
      oninput="document.querySelector('#example').data.w = this.value"/>
  </label>
  <label>height:
    <input type="range" min="0" max="100" value="80" 
       oninput="document.querySelector('#example').data.h = this.value"/>
  </label>
</p>
```

## `value` attribute and property

When the data to be handled is a single number, string or boolean, you can use these shorcuts:

- the attribute `<g-composer value="5">` as shortcut of `<g-composer data="value: 5">`
- the `g-composer` property `.value = 5` as shortcut of `.data.value = 5`. 

It is useful with very basic visualizations.