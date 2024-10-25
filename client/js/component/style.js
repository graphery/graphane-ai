// language=CSS
export default `
  .body {
    height : 100%;
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
    color            : var(--st-color-9);
    background-color : var(--st-color-2);
    border-radius    : 1em;
    margin-top       : 1em;
    padding          : 1em;
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
  
  .footer textarea {
    border           : 0;
    min-height       : 3.5em;
    resize           : none;
    background-color : transparent;
    padding          : 0;
  }
  
  .footer button {
    border-radius : 1em;
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
  
  .body .welcome .typing-effect {
    margin-left  : auto;
    margin-right : auto;
    text-align   : center;
    font-size    : 2em;
    white-space  : nowrap;
    overflow     : hidden;
    width        : 0;
    height       : 2em;
    animation    : typing 2.5s steps(40, end) forwards;
  }
  
  @keyframes typing {
    from {
      width : 0;
    }
    to {
      width : 100%;
    }
  }
  
  #assistantSelect {
    border  : 0;
    width   : fit-content;
    margin  : 0;
    padding : 0;
    height  : 1.3em;
  }
`;