# Graphane AI Assistant

The AI Assistant for Graphane - Data Visualization Microframework.

## Development Setup

To set up the development environment:

1. Clone the repository:
   ```bash
   git clone https://gitlab.com/graphery/graphane-ai.git
   cd graphane
   ```
2. Install develop dependencies:
   ```bash
   npm install
   ```
3. Run
   ```bash
   npm run start
   ``` 

## API KEY

The OPENAI API KEY must be included in the `./server/.env` file with a format as this one:
```.env
OPENAI_API_KEY=XX-XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX 
```

## Setup GPT Assistant

The initialization prompts for the GPT wizards are located in the `setup` folder.

- To modify the prompts, use the `.md` file.
- To load the wizards and load the prompts you have to run the `.js` files.
- The wizard configuration is stored in `.json` files.