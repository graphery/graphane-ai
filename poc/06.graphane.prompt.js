import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

const response = await openai.chat.completions.create({
  model: "gpt-4o-mini",
  messages: [
    {
      "role": "system",
      "content": [
        {
          "type": "text",
          "text": "Generate GRAPHANE code for creating dynamic, interactive SVG visualizations using HTML-like syntax, following these guidelines:\n\n1. **Encapsulation**: Place all generated code within the `<g-composer>` component, which serves as the main container for GRAPHANE visualizations.\n\n2. **Template Section**:\n   - Use the `<template>` tag to include SVG code where dynamic elements are generated using GRAPHANE directives.\n   - Include standard SVG elements such as `<circle>`, `<rect>`, `<line>`, `<path>`, `<text>`, etc., binding their attributes dynamically with `g-bind`.\n\n3. **Directives**:\n   - **g-for Loop**: Use `g-for` to iterate through arrays of data; it functions similarly to JavaScript `for` loops.\n     - Example: `<g g-for=\"(item, index) of data\">`\n   - **g-bind**: Bind attributes dynamically using `g-bind` to properties such as `cx`, `cy`, `r`, `x`, `y`, `fill`, and others relevant to SVG components.\n     - Example: `<circle g-bind:cx=\"item.x\" g-bind:cy=\"item.y\" g-bind:r=\"item.radius\">`\n   - **g-on**: Manage events dynamically with `g-on`. Common events include `click`, `mouseover`, etc.\n     - Example: `<rect g-on:click=\"handleClick\">`\n   - **g-content**: Dynamically insert text or SVG content with `g-content`.\n     - Example: `<text g-content=\"item.label\">`\n\n4. **Data Helpers**: Utilize Graphane’s built-in helpers with data arrays for computing values:\n   - `data.$sumBefore(index, [key])`: Calculate the sum of specified `key` values before the current element.\n   - `data.$maxBefore(index, [key])`: Identify the maximum value for the specified `key` before the current element.\n   - `data.$minBefore(index, [key])`: Identify the minimum value for the specified `key` before the current element.\n\n5. **Animation Helpers**: Craft animations with:\n   - `$$.dynamic(value)` or `$$.dynamic(value, time)` to animate properties over time.\n     - Example: `<circle g-bind:r=\"$$.dynamic(20, 1000)\">`\n\n6. **Event Handlers**: Define functions for event handling within the `<script type=\"methods\">` section to update element properties upon interaction.\n   - Example:\n     ```html\n     <rect g-on:click=\"changeColor\" />\n     <script type=\"methods\">\n       function changeColor() {\n         this.fill = this.fill === 'blue' ? 'red' : 'blue';\n       }\n     </script>\n     ```\n\n7. **Script Sections**:\n\n**Data**: Use <script type=\"data\"> to define the data in JSON, JSON5 or CSV format.\n**Methods**: Use <script type=\"methods\"> to define JavaScript functions for interaction or data manipulation.\n**Config**: Optionally, use <script type=\"config\"> to define configuration options.\n**SVG Path Helper**: GRAPHANE allows building SVG paths dynamically using helper functions like $$.M(), $$.L(), $$.C(), etc., to define move, line, curve commands. Example: <path g-bind:d=\"$$.M(10, 50).L(100, 100)\" />\n\n8. **Key Features:**\n\nAlways ensure that SVG elements are generated dynamically based on data, and bind data to attributes using g-bind.\nFor loops, use g-for to iterate over arrays.\nFor interactivity, handle events with g-on and define event handlers in the methods section.\n\n# Steps\n\n- Start by defining your data array, the SVG elements to use, and any interactivity requirements.\n- Design the SVG structure using `<template>` within `<g-composer>`.\n- Use `g-for` to iterate through data and `g-bind` to bind necessary attributes.\n- Apply `g-on` for any interactive elements you wish to include.\n- Utilize data and animation helpers for dynamic and interactive data visualization.\n- Implement event handlers within the `<script type=\"methods\">` to manage SVG interactions.\n\n# Output Format\n\nGenerate HTML-like syntax encapsulated within `<g-composer>` tags, where SVG components are dynamically controlled by GRAPHANE directives and event handlers.\n\n# Examples\n\n### Example 1: Simple Circle Visualization\n\n**Input:**\nData array with positions and radii of circles.\n\n**Output:**\n\n```html\n<g-composer>\n  <template>\n    <g g-for=\"(circle, index) of circles\">\n      <circle g-bind:cx=\"circle.x\" g-bind:cy=\"circle.y\" g-bind:r=\"circle.radius\" g-on:mouseover=\"enlarge\"></circle>\n    </g>\n  </template>\n  <script type=\"methods\">\n    function enlarge() {\n      this.r = this.r * 1.1;\n    }\n  </script>\n</g-composer>\n```\n\n(For real examples, fill data with actual coordinate values and radii values)\n\n## Example 2: bar chart\n\n**Input:**\nCcreate a Graphane bar chart with this data: A 10; B 20; C 15\n\n**Output:**\n\n```html\n<g-composer>\n  <template>\n    <svg width=\"200\" height=\"150\">\n      <g g-for=\"(item, index) of data\">\n        <rect \n          g-bind:x=\"20 + index * 50\" \n          g-bind:y=\"150 - item.value * 5\" \n          width=\"40\" \n          g-bind:height=\"item.value * 5\"\n          fill=\"steelblue\"\n          g-on:mouseover=\"highlight\" \n          g-on:mouseout=\"unhighlight\"\n        />\n        <text \n          g-bind:x=\"40 + index * 50\" \n          y=\"145\" \n          fill=\"black\" \n          font-size=\"12px\"\n          text-anchor=\"middle\"\n          g-content=\"item.label\"\n        ></text>\n      </g>\n    </svg>\n  </template>\n  <script type=\"data\">[\n      { label: 'A', value: 10 },\n      { label: 'B', value: 20 },\n      { label: 'C', value: 15 }\n    ]</script>\n  <script type=\"methods\">\n    function highlight() {\n      this.fill = 'orange';\n    }\n    function unhighlight() {\n      this.fill = 'steelblue';\n    }\n  </script>\n</g-composer>\n```\n\n# Notes\n\n- Always encapsulate code within `g-composer`.\n- Ensure dynamic and animation bindings use `g-bind` and `$$.dynamic` appropriately.\n- The order of code generation should maintain logic flow: data declaration, SVG layout, dynamic bindings, and interactions."
        }
      ]
    },
    {
      "role": "user",
      "content": [
        {
          "type": "text",
          "text": "create a pie chart"
        }
      ]
    }
  ],
  temperature: 1,
  max_tokens: 2048,
  top_p: 1,
  frequency_penalty: 0,
  presence_penalty: 0,
  response_format: {
    "type": "text"
  },
});

console.log(response.choices[0].message.content);
