import {
  Base, define, RENDER, CONTEXT
}                 from 'https://cdn.graphery.online/graphane/1.0.0-beta/module/core/index.js';
import stylent    from './stylent.js';
import style      from './style.js';
import html       from './html.js';
import * as icons from "./icons.js";

class Assistant extends Base {

  async [RENDER] () {
    this.shadowRoot.innerHTML = `
      <style>
        ${ stylent }
        ${ style }
      </style>
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
      ${ icons.logo }
      ${ text }
    </div>
  `;
  assistantDiv.querySelectorAll('pre:has(code)').forEach(pre => {
    const div                = document.createElement('div');
    div.style.display        = 'flex';
    div.style.justifyContent = 'flex-end';
    div.style.marginBottom  = '-1.5em';
    const button             = document.createElement('button');
    button.style.color       = 'var(--st-fore-color)';
    button.style.background  = 'var(--st-bg-color)';
    button.style.border      = '0';
    button.style.padding     = '0';
    button.style.stroke      = 'var(--st-fore-color)';
    button.innerHTML         = icons.clipboard + '&nbsp;&nbsp;&nbsp;&nbsp';
    button.addEventListener('click', async () => {
      await navigator.clipboard.writeText(pre.textContent);
      button.innerHTML = icons.clipboard + ' ✓';
      setTimeout(() => button.innerHTML = icons.clipboard + '&nbsp;&nbsp;&nbsp;&nbsp;', 1000);
    });
    div.appendChild(button);
    pre.before(div);
  });
  return assistantDiv;
}

function AssistantIcon () {
  const assistantDiv     = document.createElement('div');
  assistantDiv.innerHTML = `
    <div class="boxAssistant animation">
      ${ icons.animation }
    </div>
  `;
  return assistantDiv;
}