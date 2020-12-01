 import {listArts as Arts } from './ArtResolver';
export default {
  hello: () => 'Hello world!',

  api: () => 'api',

  art: () => {
      return Arts
  }
};
