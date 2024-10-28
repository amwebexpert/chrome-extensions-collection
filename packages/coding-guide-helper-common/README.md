# coding-guide-helper-common

Utilities and helpers module

## Installing from source

Instructions to install from the source.

- `cd coding-guide-helper-common`
- `yarn install`
- `yarn build`


## LLM work

Starting LLM integration in order to work with embeddings so we can do semantic searchs

### Start Chromadb locally

- https://docs.trychroma.com/getting-started
- for instance: `chroma run --path ./chromadb_data`
- TODO IndexedDB equivalent for tensorflow embeddings

### run one of the scripts so we can compare results accuracy

- `npx vite-node ./src/llm-trials/embeddings-with-chroma.ts`
- `npx vite-node ./src/llm-trials/embeddings-with-tensorflow.ts`
- `npx vite-node ./src/llm-trials/embeddings-with-client-vector-search.ts`

