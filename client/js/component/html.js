import * as icons from './icons.js';
const lemas = [
  'Can I help you with Graphane?',
  'Graphane insights for you',
  'Graphane made easy with AI',
  'Your smart guide to Graphane'
];
// Language=HTML
export default `
<div class="body">
  <div class="head text-right">
    <div id="clear" title="initialize">
      ${ icons.reload }
    </div>
    <select id="assistantSelect">
      <option value="">select an assistant</option>
    </select>
  </div>
  <div class="main">
    <div class="welcome">
      ${ icons.welcomeLogo }
      <div class="lema-effect">
        ${ lemas[Math.floor(Math.random() * lemas.length)] }   
      </div>
      <div id="suggestions">
        <div class="suggestion-box"><span class="title">Explain…</span><br><span class="subtitle">features, code, troubleshooting</span></div>
        <div class="suggestion-box"><span class="title">Suggest…</span><br><span class="subtitle">colors, data, improvements</span></div>
        <div class="suggestion-box"><span class="title">Create…</span><br><span class="subtitle">graphs scaffoldings, code snippets</span></div>
      </div>
  </div>
  </div>
  <form class="footer boxUser">
    <textarea id="text" placeholder="what do you want?"></textarea>
    <button id="send" type="submit" disabled>Send</button> 
  </form>
</div>`;