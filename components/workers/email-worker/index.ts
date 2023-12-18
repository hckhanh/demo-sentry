import {serve} from 'bun'

serve({
  development: true,
  fetch(req) {
    throw new Error("woops!");
  },
});
