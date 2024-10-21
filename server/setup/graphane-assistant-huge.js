import { fileURLToPath }     from 'node:url';
import { basename, extname } from 'node:path';
import setup                 from "./setup.js";

const __filename = fileURLToPath(import.meta.url);
const name       = basename(__filename, extname(__filename));

setup(name);
