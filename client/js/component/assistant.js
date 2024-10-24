import {
  Base,
  define,
  RENDER,
  CONTEXT
} from 'https://cdn.graphery.online/graphane/1.0.0-beta/module/core/index.js';

const logo = `<svg viewBox="0 0 60 60" style="width: 32px">
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
<link rel="stylesheet" href="/css/stylent.css">
<style>
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
    <button type="submit">Send</button> 
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
      ${ text.replace(/\n/g, '<br/>') }
    </div>
  `;
  return assistantDiv;
}

function AssistantIcon (text) {
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
    const assistantSelect     = this.shadowRoot.querySelector('#assistantSelect');
    const response            = await fetch('/assistants/');
    if (response.status === 200) {
      const options = await response.json();
      options.result.forEach(option => {
        assistantSelect.innerHTML += `<option value="${ option }">${ option.substring(12, option.length - 1) }</option>`;
      });
    }
    assistantSelect.value     = this[CONTEXT].src;
    assistantSelect.addEventListener('change', () => {
      this.src = assistantSelect.value;
    })

    this.shadowRoot.querySelector('form').addEventListener('submit', (e) => {
      e.preventDefault();
      return this.query();
    });
  }

  async query (value) {
    const ctx             = this[CONTEXT];
    const main            = this.shadowRoot.querySelector('.main');
    const welcome         = this.shadowRoot.querySelector('.welcome');
    const text            = this.shadowRoot.querySelector('#text');
    welcome.style.display = 'none';
    value                 = text.value;
    main.append(UserBlock(value));
    main.append(AssistantIcon());
    text.value     = '';
    main.scrollTop = main.scrollHeight;

    // // Simulate AI response
    // setTimeout(() => {
    //   main.querySelector('.animation').remove();
    //   main.append(AssistantBlock('This is a simulated response from AI.'));
    //   main.scrollTop = main.scrollHeight;
    // }, 4000);

    const response = await fetch(ctx.src,
      {
        method  : 'POST',
        headers : {
          'Content-Type' : 'application/json'
        },
        body    : JSON.stringify({
          question : value,
          threadId: ctx.threadId
        })
      });
    main.querySelector('.animation').remove();
    if (response.status === 200) {
      const msg = await response.json();
      if (msg.ok) {
        ctx.threadId = msg.result.threadId;
        main.append(AssistantBlock(msg.result.html));
      } else {
        main.append(AssistantBlock(`error ${ msg.error }`));
      }
    } else {
      main.append(AssistantBlock(`error ${ response.status } (${ response.statusText })`));
    }
    main.scrollTop = main.scrollHeight;
  }

}

define(Assistant)
  .attr({name : 'src', type : 'string', value : '', posUpdate : RENDER})
  .tag('assistant');