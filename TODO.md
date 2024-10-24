# Graphane AI Assistant - ToDo

## Pending

- [ ] client: limit the user box size
- [ ] client: format code into the user box
- [ ] client: add button "copy to clipboard" for code in the answer box

- [ ] client: connect to g-editor
  - [ ] get the code from g-editor and add to the thread if it has not been sent before
  - [ ] add button "replace code" for code in the answer box
- [ ] client: improve the answer style
 
- [ ] server: log with dialogs in JSONL format for fine-tuning

## Done

- [x] README, package.json and project structure
- [x] Proof of concept
- [x] Basic client
- [x] Basic server
- [x] Assistant loader
- [x] First assistants
- [x] Tuning: create basic example
- [x] Thread management:
  - [x] server
    - [x] send thread id to the client
    - [x] receive thread id on calls
    - [x] if no thread id, create new thread
  - [x] client:
    - [x] receive thread id
    - [x] send thread id on each call
    - [-] save thread id in local storage
- [x] client: add support for dynamic dark/light mode
- [x] client: adjust to container size
