# Graphane AI Assistant - ToDo

## Pending

- [ ] Tunning: create basic example
- [ ] Thread management: 
  - [ ] server 
    - [ ] send thread id to the client
    - [ ] receive thread id on calls 
    - [ ] if no thread id, create new thread 
  - [ ] client: 
    - [ ] receive thread id
    - [ ] save thread id in local storage
    - [ ] send thread id on each call
- [ ] client: adjust to container size
- [ ] client: limit the user box size
- [ ] client: format code into the user box
- [ ] client: add button "copy to clipboard" for code in the answer box
- [ ] client: connect to g-editor
  - [ ] get the code from g-editor and add to the thread if it has not been sent before
  - [ ] add button "replace code" for code in the answer box
- [ ] client: improve the answer style
- [ ] client: add support for dynamic dark/light mode


## Done

- [x] README, package.json and project structure
- [x] Proof of concept
- [x] Basic client
- [x] Basic server
- [x] Assistant loader
- [x] First assistants
