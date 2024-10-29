// language=CSS
export default `
  .body {
    --st-fore-color-alt-2 : var(--st-color-8);
    --st-bg-color-alt-2   : var(--st-color-2);
    height                : 100%;
  }
  
  .head {
    height  : 2em;
    padding : 0.2em 0.6em;
  }
  
  .main {
    position   : relative;
    height     : calc(100% - 8em);
    overflow-y : auto;
    padding    : 1em;
  }
  
  .boxUser {
    color            : var(--st-fore-color-alt-2);
    background-color : var(--st-bg-color-alt-2);
    border-radius    : 1em;
    margin-top       : 1em;
    padding          : 1em;
  }
  
  .boxUser textarea {
    border           : 0;
    min-height       : 3.5em;
    resize           : none;
    color            : var(--st-fore-color-alt-2);
    background-color : var(--st-bg-color-alt-2);
    padding          : 0;
  }
  
  .boxUser textarea::placeholder {
    color   : var(--st-fore-color-alt-2);
    opacity : 0.8;
  }
  
  .boxAssistant {
    margin-top : 1em;
    padding    : 1em;
  }
  
  .footer {
    height      : 5em;
    display     : flex;
    align-items : center;
    margin      : 0.5em;
    padding     : 0.5em;
    tab-size    : 4;
  }
  
  .footer * {
    font-size : 0.9em;
    margin    : 0 0.5em;
  }
  
  .footer button {
    border-radius : 1em;
    border-color  : var(--var-fore-color);
  }
  
  .body .welcome {
    position  : absolute;
    width     : calc(100% - 2em);
    top       : 50%;
    transform : translateY(-50%);
  }
  
  .body .welcome .logo {
    width   : 60px;
    height  : 60px;
    margin  : 1em auto 1.5em auto;
    display : block;
  }
  
  .body .welcome .lema-effect {
    margin-left  : auto;
    margin-right : auto;
    text-align   : center;
    font-size    : 2em;
    line-height  : 1.5em;
    animation    : fadein 2.5s;
  }
  
  @keyframes fadein {
    from {
      opacity : 0;
    }
    to {
      opacity : 1;
    }
  }
  
  #clear {
    display      : inline-block;
    stroke       : var(--st-fore-color);
    margin-right : 3em;
    margin-top   : 2px;
    cursor       : pointer;
  }
  
  #assistantSelect {
    border         : 0;
    width          : fit-content;
    vertical-align : super;
    margin         : 0;
    padding        : 0;
    height         : 1.8em;
  }
  #suggestions {
    display: flex;
    width: 100%;
  }
  
  #suggestions .suggestion-box {
    width: 30%;
    margin: 2em;
    padding: 0.5em 1em;
    border: 1px solid var(--st-color-3);
    background-color: var(--st-color-1);
    border-radius: 0.5em;
    cursor: pointer;
  }
  
  #suggestions .suggestion-box .title {
    font-size: 1.25em; 
  }
  
  #suggestions .suggestion-box .subtitle {
    font-size: 0.8em;
  }

`;