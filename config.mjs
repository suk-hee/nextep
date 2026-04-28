import StyleDictionary from 'style-dictionary';

const PX_PATH_KEYS = new Set(['fontsize', 'size', 'number', 'gap', 'padding', 'radius']);

const transformFigmaTokens = (obj, path = []) => {
  if (!obj || typeof obj !== 'object') return;
  for (const key of Object.keys(obj)) {
    const node = obj[key];
    if (!node || typeof node !== 'object') continue;
    const nextPath = [...path, key];
    if (
      node.$type === 'color' &&
      node.$value &&
      typeof node.$value === 'object' &&
      typeof node.$value.hex === 'string'
    ) {
      node.$value = node.$value.hex;
    } else if (
      typeof node.$value === 'number' &&
      nextPath.some((p) => PX_PATH_KEYS.has(p.toLowerCase()))
    ) {
      node.$value = `${node.$value}px`;
    } else {
      transformFigmaTokens(node, nextPath);
    }
  }
};

StyleDictionary.registerParser({
  name: 'figma-token-parser',
  pattern: /\.json$/,
  parser: ({ contents }) => {
    const json = JSON.parse(contents);
    transformFigmaTokens(json);
    return json;
  },
});

export default {
  source: ['tokens/primitive_tokens.json', 'tokens/semantic_tokens.json'],
  parsers: ['figma-token-parser'],
  platforms: {
    css: {
      transformGroup: 'css',
      prefix: 'klds',
      buildPath: 'styles/',
      files: [
        {
          destination: 'tokens.css',
          format: 'css/variables',
          options: {
            outputReferences: true,
          },
        },
      ],
    },
  },
};
