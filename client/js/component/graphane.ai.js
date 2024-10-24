import {
  Base,
  define,
  RENDER,
  CONTEXT
} from 'https://cdn.graphery.online/graphane/1.0.0-beta/module/core/index.js';

const logo      = `<svg viewBox="0 0 60 60" style="width: 32px">
  <path stroke="#D80000" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z" transform-origin="18.2 16.6"/>
  <path stroke="#00D800" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z" transform-origin="41.5 30"/>
  <path stroke="#0000D8" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z" transform-origin="18.2 43.4"/>
</svg>`;
const animation = `<svg viewBox="0 0 60 60" style="width: 32px">
  <path stroke="#D80000" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z" transform-origin="18.2 16.6">
    <animateTransform attributeName="transform" type="scale" keyTimes="0; 0.25; 0.5; 0.75; 1" values  ="1;    0;   1;   1;  1" dur="2s" repeatCount="indefinite" />
  </path>
  <path stroke="#00D800" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z" transform-origin="41.5 30">
    <animateTransform attributeName="transform" type="scale" keyTimes="0; 0.25; 0.5; 0.75; 1" values  ="1;   1;   0;   1;   1" dur="2s" repeatCount="indefinite" />
  </path>
  <path stroke="#0000D8" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z" transform-origin="18.2 43.4">
    <animateTransform attributeName="transform" type="scale" keyTimes="0; 0.25; 0.5; 0.75; 1" values  ="1;   1;   1;   0;   1;" dur="2s" repeatCount="indefinite" />
  </path>
</svg>`;

const style = `
<style>
/******************************
 Variables
 ******************************/
:root, :host {
  --st-font-family         : -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Helvetica Neue', Arial, sans-serif;
  --st-font-family-mono    : "Consolas", "Monaco", "Menlo", monospace;
  --st-font-weight         : 400;
  --st-font-bold-weight    : 500;
  --st-font-size           : 15px;
  --st-font-size-s         : 0.8em;
  --st-font-size-l         : 1.15em;
  --st-font-size-xl        : 1.30em;
  --st-font-size-xxl       : 1.60em;
  --st-font-size-xxxl      : 2.00em;
  --st-font-size-xxxxl     : 2.30em;
  --st-line-height         : 1.6em;
  --st-line-height-l       : 2em;
  
  --st-color-0             : #fafafa;
  --st-color-1             : #f5f5f5;
  --st-color-2             : #e5e5e5;
  --st-color-3             : #d4d4d4;
  --st-color-4             : #a3a3a3;
  --st-color-5             : #737373;
  --st-color-6             : #525252;
  --st-color-7             : #404040;
  --st-color-8             : #262626;
  --st-color-9             : #171717;
  
  --st-fore-color          : var(--st-color-9);
  --st-bg-color            : var(--st-color-0);
  --st-fore-color-alt      : var(--st-color-0);
  --st-bg-color-alt        : var(--st-color-9);
  --st-fore-color-code     : var(--st-color-9);
  --st-bg-color-code       : var(--st-color-2);
  
  --st-focus-border-color  : var(--st-color-7);
  --st-border-color        : var(--st-color-4);
  
  --st-fore-color-dark     : var(--st-color-0);
  --st-bg-color-dark       : var(--st-color-9);
  --st-fore-color-alt-dark : var(--st-color-9);
  --st-bg-color-alt-dark   : var(--st-color-3);
  
  --st-border-width        : 1px;
  --st-border-radius       : 2px;
  
  --st-space               : 0.5em;
  --st-space-after         : var(--st-space);
  --st-space-before        : calc(var(--st-space) * 2);
  --st-gutter              : calc(var(--st-space) * 3);
  
  --st-link-style          : underline dotted var(--st-color-4);
  --st-link-hover-style    : underline solid var(--st-fore-color);
}

/*
 Dark mode
 */
@media (prefers-color-scheme : dark) {
  :host,
  :root {
    --st-fore-color     : var(--st-fore-color-dark);
    --st-bg-color       : var(--st-bg-color-dark);
    --st-fore-color-alt : var(--st-fore-color-alt-dark);
    --st-bg-color-alt   : var(--st-bg-color-alt-dark);
  }
  
}

:host.dark,
:root.dark {
  --st-fore-color     : var(--st-fore-color-dark);
  --st-bg-color       : var(--st-bg-color-dark);
  --st-fore-color-alt : var(--st-fore-color-alt-dark);
  --st-bg-color-alt   : var(--st-bg-color-alt-dark);
}

/*
 Small screens
 */
@media screen and (max-width : 768px) {
  :host,
  :root {
    --st-font-size : 14px;
  }
}

/******************************
  Base Styles
******************************/
* {
  box-sizing : border-box;
}

html,
body {
  margin          : 0;
  padding         : 0;
  min-height      : 100vh;
  color           : var(--st-fore-color);
  background      : var(--st-bg-color);
  scroll-behavior : smooth;
}

body,
:host {
  line-height : var(--st-line-height);
  color       : var(--st-fore-color);
  font-size   : var(--st-font-size);
  font-weight : var(--st-font-weight);
  font-family : var(--st-font-family)
}


/******************************
  Typography
******************************/
h1,
h2,
h3,
h4,
h5,
h6 {
  font-weight   : var(--st-font-bold-weight);
  line-height   : var(--st-line-height-l);
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
}

h1 {
  font-size : var(--st-font-size-xxxxl);
}

h2 {
  font-size : var(--st-font-size-xxxl);
}

h3 {
  font-size : var(--st-font-size-xxl);
}

h4 {
  font-size : var(--st-font-size-xl);
}

h5 {
  font-size : var(--st-font-size-l);
}

h6 {
  font-size : var(--st-font-size);
}

p {
  font-size     : var(--st-font-size);
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
}


/******************************
  Link
******************************/
a,
a:visited {
  color           : var(--st-fore-color);
  text-decoration : var(--st-link-style);
  /* transition : all 0.2s ease; */
}

a:hover {
  cursor          : pointer;
  text-decoration : var(--st-link-hover-style);
}

/******************************
  List
******************************/
ul,
ol,
dl {
  font-size           : var(--st-font-size);
  margin-top          : var(--st-space-before);
  margin-bottom       : var(--st-space-after);
  padding-left        : 0;
  list-style-position : inside;
}

ul li,
ol li,
dl dt,
dl dd {
  margin-top : 0;
}

ul li:first-child,
ol li:first-child,
dl dd:first-child {
  margin-top : var(--st-space-before);
}

li ul,
li ol {
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
}

ul ul,
ol ul,
ul ol,
ol ol,
dl dd {
  margin-left : var(--st-space-before);
}

/******************************
  Form
******************************/
label {
  display       : inline-block;
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
}

input:not([type=button]):not([type=submit]):not([type=reset]):not([type=checkbox]):not([type=radio]):not([type=color]),
select,
textarea {
  height        : 2.7em;
  width         : 100%;
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
  padding       : 0.5em;
  font-size     : var(--st-font-size);
  color         : var(--st-fore-color);
  background    : var(--st-bg-color);
  border        : var(--st-border-width) solid var(--st-border-color);
  border-radius : var(--st-border-radius);
  /* transition    : all 0.2s ease; */
  font-family   : var(--st-font-family);
}

input[type=checkbox],
input[type=radio] {
  font-size      : var(--st-font-size);
  height         : 1.2em;
  width          : 1.2em;
  vertical-align : middle;
  /* transition     : all 0.2s ease; */
}

input[type=color] {
  background : var(--st-bg-color);
  height     : 2.7em;
  width      : 2.7em;
}

input:not([type=button]):hover:not([type=submit]):hover:not([type=reset]):hover,
select:hover,
textarea:hover {
  border-color : var(--st-fore-color);
}

input:not([type=button]):not([type=submit]):not([type=reset]):focus,
select:focus,
textarea:focus {
  outline      : none;
  border-color : var(--st-focus-border-color) !important;
}

input:not([type=button]):not([type=submit]):not([type=reset]):disabled,
input:not([type=button]):hover:not([type=submit]):hover:not([type=reset])[disabled]:hover {
  border-color : var(--st-border-color);
  opacity      : 0.5;
  cursor       : not-allowed;
}


input[type=image],
input[type=image]:hover,
input[type=image]:focus {
  border : 0 !important;
  width  : auto !important;
}


textarea {
  min-height : 10em;
}

fieldset {
  border        : var(--st-border-width) solid var(--st-border-color);
  border-radius : var(--st-border-radius);
  padding       : 1em;
}

form, fieldset {
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
}

/******************************
  Button
******************************/
button,
.button,
a.button,
[type=submit],
[type=reset],
[type=button] {
  display         : inline-block;
  font-family     : var(--st-font-family);
  margin-top      : var(--st-space-before);
  margin-bottom   : var(--st-space-after);
  outline         : none;
  text-decoration : none;
  color           : var(--st-fore-color-alt);
  background      : var(--st-bg-color-alt);
  opacity         : 0.8;
  font-size       : var(--st-font-size);
  border          : var(--st-border-width) solid var(--st-fore-color);
  border-radius   : var(--st-border-radius);
  /* transition      : all 0.2s ease; */
  cursor          : pointer;
  text-align      : center;
  padding         : 0.59em 1em;
  line-height     : 1.4;
}

button:hover:not([disabled]),
.button:hover:not([disabled]),
[type=submit]:hover:not([disabled]),
[type=button]:hover:not([disabled]),
button:focus,
.button:focus,
[type=submit]:focus,
[type=button]:focus,
button:active,
.button:active,
[type=submit]:active,
[type=button]:active {
  opacity         : 1;
  text-decoration : none;
}

button[disabled],
.button[disabled],
input[disabled] {
  opacity : 0.5;
  cursor  : not-allowed;
}

button.outline,
.button.outline,
[type=submit].outline {
  color      : var(--st-fore-color);
  background : var(--st-bg-color);
}

/*****************************
  Table
 *****************************/
table {
  font-size      : var(--st-font-size);
  display        : table;
  overflow-x     : initial;
  border-spacing : 0;
  text-align     : left;
  width          : 100%;
}


th {
  border-bottom : var(--st-border-width) solid var(--st-color-4);
  padding       : 1em 1.6em;
}

td {
  border-bottom : calc(0.5 * var(--st-border-width)) solid var(--st-color-4);
  padding       : 1em 1.6em;
}

td:first-child,
th:first-child {
  padding-left : 0;
}

td:last-child,
th:last-child {
  padding-right : 0;
}

@media screen and (max-width : 768px) {
  table {
    display    : block;
    overflow-x : auto;
  }
}

/******************************
  Image
******************************/
img {
  border : none;
}

h1 img,
h2 img,
h3 img,
h4 img,
h5 img,
h6 img,
p img {
  vertical-align : bottom;
}

/******************************
  Code and Blockquote
******************************/
pre {
  font-size     : var(--st-font-size);
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
}

code {
  padding     : 2px;
  color       : var(--st-fore-color-code);
  background  : var(--st-bg-color-code);
  font-family : var(--st-font-family-mono);
}

pre code {
  white-space : nowrap;
}

pre code, blockquote {
  margin-left   : 0;
  margin-top    : var(--st-space-before);
  margin-bottom : var(--st-space-after);
  padding       : 1rem;
  display       : block;
  border        : 0;
  border-left   : 0.3rem solid var(--st-bg-color-alt);
}

pre code, samp {
  white-space : pre;
  word-wrap   : break-word;
  background  : var(--st-bg-color-code);
  font-family : var(--st-font-family-mono);
  overflow-y  : auto;
}

/******************************
  Divider
******************************/
hr {
  border-width : var(--st-border-width);
  border-color : var(--st-border-color);
}

/******************************
  Box
******************************/
.box {
  padding       : 0.5em 1em;
  border        : var(--st-border-width) solid var(--st-border-color);
  border-radius : var(--st-border-radius);
}


/******************************
  Semantics Elements
******************************/
header,
main {
  font-size   : var(--st-font-size);
  width       : 90%;
  max-width   : 1200px;
  margin      : 0 auto var(--st-space);
  padding-top : var(--st-space-before);
}

section,
article {
  font-size : var(--st-font-size);
  margin    : var(--st-space-before) 0;
}

footer {
  font-size        : var(--st-font-size-s);
  margin-top       : var(--st-space-before);
  width            : 100%;
  border-top       : var(--st-border-width) solid var(--st-border-color);
  padding-top      : var(--st-space);
  padding-bottom   : var(--st-space);
  color            : var(--st-fore-color-alt);
  background-color : var(--st-bg-color-alt);
}

footer * {
  font-size : var(--st-font-size-s);
}

/******************************
  Grid
******************************/
.row {
  display         : flex;
  flex-flow       : row wrap;
  justify-content : space-between;
}

.row > :first-child,
.gutter > :first-child {
  margin-left : 0 !important;
}

.row:last-of-type,
.gutter:last-of-type {
  margin-bottom : 0;
}

.col {
  flex : 1;
}

.row.gutter .col,
.row.gutter [class^='col-'],
.row.gutter [class*=" col-"],
.col.gutter,
[class^='col-'].gutter,
[class*=" col-"].gutter {
  margin-left   : var(--st-gutter);
  margin-bottom : var(--st-gutter);
}

.col-1 {
  flex : 1;
}

.col-2 {
  flex : 2;
}

.col-3 {
  flex : 3;
}

.col-4 {
  flex : 4;
}

.col-5 {
  flex : 5;
}

.col-6 {
  flex : 6;
}

.col-7 {
  flex : 7;
}

.col-8 {
  flex : 8;
}

.col-9 {
  flex : 9;
}

.col-10 {
  flex : 10;
}

.col-11 {
  flex : 11;
}

.col-12 {
  flex : 12;
}

@media screen and (max-width : 768px) {
  .col, [class^='col-'], [class*=" col-"] {
    margin : 0.5em 0 !important;
    flex   : 0 0 100%;
  }
}

/******************************
  Auxiliar classes
******************************/
.hidden {
  display : none !important;
}

.text-left {
  text-align : left;
}

.text-center {
  text-align : center;
}

.text-right {
  text-align : right;
}

.size-full-height {
  min-height : 100vh;
}

.size-full-width {
  width : 100%;
}

.size-full {
  width      : 100%;
  min-height : 100vh;
}

.justify-start {
  display         : flex;
  justify-content : flex-start;
}

.justify-center {
  display         : flex;
  justify-content : center;
}

.justify-end {
  display         : flex;
  justify-content : flex-end;
}

.justify-distributed {
  display         : flex;
  justify-content : space-evenly;
}

.align-start {
  display     : flex;
  align-items : flex-start;
}

.align-center {
  display     : flex;
  align-items : center;
}

.align-end {
  display     : flex;
  align-items : flex-end;
}

.direction-vertical {
  display        : flex;
  flex-direction : column;
}

.direction-horizontal {
  display        : flex;
  flex-direction : row;
}

.center {
  display         : flex;
  flex-direction  : column;
  justify-content : center;
  align-items     : center;
}

.not-selectable {
  user-select : none;
}

.no-wrap {
  white-space : nowrap;
}
  .body {
    height: 100%;
    border: 1px solid var(--st-color-4);
  }
  .head {
    height: 2em;
    padding: 0.2em 0.6em;
  }
  .main {
    position: relative;
    height: calc(100% - 8em);
    overflow-y: auto;
    padding: 1em;
  }
  .boxUser {
    color: var(--st-color-9 );
    background-color: var(--st-color-2);
    border-radius: 1em;
    margin-top: 1em;
    padding: 1em;
  }
  .boxAssistant {
    margin-top: 1em;
    padding: 1em;
  }
  .footer {
    height: 5em;
    display: flex;
    align-items: center;
    margin: 0.5em;
    padding: 0.5em;
    tab-size: 4;
  }
  .footer * {
    font-size: 0.9em;
    margin: 0 0.5em ;
  }
  .footer textarea {
    border: 0;  
    min-height: 3.5em;
    resize: none;
    background-color: transparent;
    padding: 0;
  }
  .footer button {
    border-radius: 1em;
  }
  .body .welcome {
    position: absolute;
    width: calc(100% - 2em);
    top: 50%;
    transform: translateY(-50%);
  }
  .body .welcome .logo {
    width: 60px;
    height: 60px;
    margin: 1em auto 1.5em auto;
    display: block;
  }
  .body .welcome .typing-effect {
    margin-left: auto;
    margin-right: auto;
    text-align: center;
    font-size: 2em;
    white-space: nowrap;
    overflow: hidden;
    width: 0;
    height: 2em;
    animation: typing 2.5s steps(40, end) forwards;
  }
  @keyframes typing {
    from { width: 0; }
    to { width: 100%; }
  }
  #assistantSelect {
    border: 0;
    width: fit-content;
    margin: 0;
    padding: 0;
    height: 1.3em;
  }
</style>
`;
const html  = `
<div class="body">
  <div class="head">
    <select id="assistantSelect">
      <option value="">select an assistant</option>
    </select>
  </div>
  <div class="main">
    <div class="welcome">
      <svg class="logo" viewBox="0 0 60 60">
        <path stroke="#D80000" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M24.2,26.9923 L12.2,26.9923 L6.2,16.6 L12.2,6.2077 L24.2,6.2077 L30.2,16.6 Z">
          <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="0s" fill="freeze" />
        </path>
        <path stroke="#00D800" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M29.5,30 L35.5,40.3923 L47.5,40.3923 L53.5,30 L47.5,19.6077 L35.5,19.6077 Z">
          <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="0.5s" fill="freeze" />
        </path>
        <path stroke="#0000D8" stroke-dasharray="0,100" stroke-width="2" fill="none" d="M24.2,33.0077 L12.2,33.0077 L6.2,43.4 L12.2,53.7923  L24.2,53.7923  L30.2,43.4  Z">
          <animate attributeName="stroke-dasharray" values="0,100; 100,0; 0,0" keyTimes="0;0.9999;1" dur="0.5s" begin="1s" fill="freeze" />
        </path>
      </svg>
      <div class="typing-effect">
        transforms your ideas into clear visualizations   
      </div>
  </div>
  </div>
  <form class="footer boxUser">
    <textarea id="text" placeholder="what do you want?"></textarea>
    <button id="send" type="submit" disabled>Send</button> 
  </form>
</div>`;

function UserBlock (text) {
  const userDiv = document.createElement('div');
  userDiv.classList.add('justify-end');
  userDiv.innerHTML = `
    <div class="boxUser">
      ${ text.replace(/</g, '&lt;').replace(/\n/g, '<br/>') }
    </div>
  `;
  return userDiv;
}

function AssistantBlock (text) {
  const assistantDiv     = document.createElement('div');
  assistantDiv.innerHTML = `
    <div class="boxAssistant">
      ${ logo }
      ${ text }
    </div>
  `;
  assistantDiv.querySelectorAll('pre:has(code)').forEach(pre => {
    const button = document.createElement('button');
    button.innerHTML = 'copy';
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(pre.textContent);
      button.innerHTML = 'copy ✓';
      setTimeout(() => button.innerHTML = 'copy', 1000);
    });
    pre.before(button);
  });
  return assistantDiv;
}

function AssistantIcon () {
  const assistantDiv     = document.createElement('div');
  assistantDiv.innerHTML = `
    <div class="boxAssistant animation">
      ${ animation }
    </div>
  `;
  return assistantDiv;
}


class Assistant extends Base {
  async [RENDER] () {
    this.shadowRoot.innerHTML = `
      ${ style }
      ${ html }
    `;
    await this.getAssistants();
    const form   = this.shadowRoot.querySelector('form');
    const text   = this.shadowRoot.querySelector('#text');
    const button = this.shadowRoot.querySelector('#send');
    text.addEventListener('keypress', (e) => {
      if (e.key === 'Enter' && !e.shiftKey && !e.ctrlKey && !e.altKey) {
        e.preventDefault();
        this.query();
      }
    });
    text.addEventListener('input', () => {
      button.disabled = !text.value.replace(/\s/g, '')
    });
    form.addEventListener('submit', (e) => {
      e.preventDefault();
      this.query();
    });
  }

  async getAssistants () {
    const assistantSelect = this.shadowRoot.querySelector('#assistantSelect');
    const response        = await fetch('http://localhost:8080/assistants/');
    if (response.status === 200) {
      const options = await response.json();
      options.result.forEach(option => {
        assistantSelect.innerHTML += `<option value="http://localhost:8080${ option }">${ option.substring(12, option.length - 1) }</option>`;
      });
    }
    assistantSelect.value = this[CONTEXT].src;
    assistantSelect.addEventListener('change', () => this.src = assistantSelect.value);
  }

  async query (value) {
    const ctx     = this[CONTEXT];
    const main    = this.shadowRoot.querySelector('.main');
    const welcome = this.shadowRoot.querySelector('.welcome');
    const text    = this.shadowRoot.querySelector('#text');
    const button  = this.shadowRoot.querySelector('#send');
    value         = text.value;
    if (!value.replace(/\s/g, '')) {
      return;
    }
    welcome.style.display = 'none';
    main.append(UserBlock(value));
    text.value          = '';
    button.disabled     = true;
    const assistantIcon = AssistantIcon()
    main.append(assistantIcon);
    main.scroll({
      top      : assistantIcon.offsetTop,
      behavior : 'smooth'
    });

    const response = await fetch(ctx.src, {
      method  : 'POST',
      headers : {
        'Content-Type' : 'application/json'
      },
      body    : JSON.stringify({
        question : value,
        threadId : ctx.threadId
      })
    });
    main.querySelector('.animation').remove();
    let assistantBlock;
    if (response.status === 200) {
      const msg = await response.json();
      if (msg.ok) {
        ctx.threadId   = msg.result.threadId;
        assistantBlock = AssistantBlock(msg.result.html)
      } else {
        assistantBlock = AssistantBlock(`error ${ msg.error }`);
      }
    } else {
      assistantBlock = AssistantBlock(`error ${ response.status } (${ response.statusText })`);
    }
    main.append(assistantBlock);
    main.scroll({
      top      : assistantBlock.offsetTop,
      behavior : 'smooth'
    });
  }

}

define(Assistant)
  .attr({name : 'src', type : 'string', value : '', posUpdate : RENDER})
  .tag('assistant');