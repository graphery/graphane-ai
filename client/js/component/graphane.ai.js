import {
  Base, define, RENDER, CONTEXT
}                 from 'https://cdn.graphery.online/graphane/1.0.0-beta/module/core/index.js';
import stylent    from './stylent.js';
import style      from './style.js';
import html       from './html.js';
import * as icons from "./icons.js";

const SERVER = 'http://localhost:8080';

class Assistant extends Base {

  async [RENDER] () {

    this.shadowRoot.innerHTML = `
      <style>
        ${ stylent }
        ${ style }
      </style>
      ${ html }
    `;

    const form   = this.shadowRoot.querySelector('form');
    const text   = this.shadowRoot.querySelector('#text');
    const button = this.shadowRoot.querySelector('#send');

    this.shadowRoot.querySelectorAll('.suggestion-box').forEach(el => el.addEventListener('click', () => {
      this.shadowRoot.querySelector('#text').value = el.querySelector('.title').textContent.replace('…', ' ');
      this.shadowRoot.querySelector('#text').focus();
    }));

    this.shadowRoot.querySelector('#clear').addEventListener('click', () => this.clear());
    await this.getAssistants();

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

    // HREF
    const {href} = this[CONTEXT];
    let ref      = null;
    if (href) {
      ref = this.getRootNode().querySelector(href);
      if (!ref) {
        console.error(`element ${ href } not found.`)
      }
    }

    this[CONTEXT].gEditor = ref;

  }

  clear () {
    this[CONTEXT].threadId = undefined;
    this[RENDER]();
  }

  async getAssistants () {
    const ctx             = this[CONTEXT];
    const assistantSelect = this.shadowRoot.querySelector('#assistantSelect');
    const response        = await fetch(`${ SERVER }/assistants/`);
    if (response.status === 200) {
      const options = await response.json();
      options.result.forEach(option => {
        const url = `${ SERVER }${ option }`;
        assistantSelect.innerHTML += `
          <option value="${ url }" ${
          ctx.src === option || ctx.src === url ? 'selected' : ''
        }>${ option.substring(12, option.length - 1) }</option>
        `;
      });
      ctx.src = assistantSelect.value;
    }
    assistantSelect.addEventListener('change', () => ctx.src = assistantSelect.value);
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
        code     : ctx.gEditor?.code,
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
        assistantBlock = AssistantBlock(msg.result.html, ctx.gEditor, msg.result.usage);
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
  .attr({name : 'src', type : 'string', value : ''})
  .attr({name : 'href', type : 'string', value : '', posUpdate : RENDER})
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

function AssistantBlock (text, editor, usage) {
  const assistantDiv     = document.createElement('div');
  assistantDiv.innerHTML = `
    <div class="boxAssistant">
      ${ icons.logo }
      ${ text }
      ${ usage ? `<small>${ JSON.stringify(usage) } (± $${((usage.prompt_tokens * 1.5e-7) + (usage.prompt_tokens * 6e-7)).toFixed(5)})</small>` : '' }
    </div>
  `;
  assistantDiv.querySelectorAll('pre:has(code)').forEach(pre => codeToolbar(pre, editor));
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

function codeToolbar (pre, editor) {
  const div                = document.createElement('div');
  div.style.display        = 'flex';
  div.style.justifyContent = 'flex-end';
  div.style.marginBottom   = '-1.5em';

  const buttonClipboard            = document.createElement('button');
  buttonClipboard.style.color      = 'var(--st-fore-color)';
  buttonClipboard.style.background = 'var(--st-bg-color)';
  buttonClipboard.style.border     = '0';
  buttonClipboard.style.padding    = '0';
  buttonClipboard.style.stroke     = 'var(--st-fore-color)';
  buttonClipboard.innerHTML        = icons.clipboard + '&nbsp;&nbsp;&nbsp;&nbsp';
  buttonClipboard.addEventListener('click', async () => {
    await navigator.clipboard.writeText(pre.textContent);
    buttonClipboard.innerHTML = icons.clipboard + ' ✓';
    setTimeout(() => buttonClipboard.innerHTML = icons.clipboard + '&nbsp;&nbsp;&nbsp;&nbsp;', 1000);
  });
  div.appendChild(buttonClipboard);

  if (editor) {
    const buttonToEditor             = document.createElement('button');
    buttonToEditor.style.color       = 'var(--st-fore-color)';
    buttonToEditor.style.background  = 'var(--st-bg-color)';
    buttonToEditor.style.border      = '0';
    buttonToEditor.style.padding     = '0';
    buttonToEditor.style.stroke      = 'var(--st-fore-color)';
    buttonToEditor.style.strokeWidth = '10';
    buttonToEditor.innerHTML         = icons.editor + '&nbsp;&nbsp;&nbsp;&nbsp';
    buttonToEditor.addEventListener('click', async () => {
      editor.code              = pre.textContent;
      buttonToEditor.innerHTML = icons.editor + ' ✓';
      setTimeout(() => buttonToEditor.innerHTML = icons.editor + '&nbsp;&nbsp;&nbsp;&nbsp;', 1000);
    });
    div.appendChild(buttonToEditor);
  }

  pre.before(div);
}