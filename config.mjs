import StyleDictionary from 'style-dictionary';

const PX_PATH_KEYS = new Set(['fontsize', 'size', 'number', 'gap', 'padding', 'radius']);

const transformFigmaTokens = (obj, path = []) => {
  if (!obj || typeof obj !== 'object' || Array.isArray(obj)) return;

  if ('$value' in obj) {
    if (
      obj.$type === 'color' &&
      obj.$value &&
      typeof obj.$value === 'object' &&
      typeof obj.$value.hex === 'string'
    ) {
      obj.$value = obj.$value.hex;
    } else if (
      typeof obj.$value === 'number' &&
      path.some((p) => PX_PATH_KEYS.has(p))
    ) {
      obj.$value = `${obj.$value}px`;
    }
    if (typeof obj.$value === 'string' && /^\{.+\}$/.test(obj.$value)) {
      obj.$value = obj.$value.toLowerCase();
    }
    return;
  }

  for (const key of Object.keys(obj)) {
    if (key.startsWith('$')) continue;
    const lowerKey = key.toLowerCase();
    transformFigmaTokens(obj[key], [...path, lowerKey]);
    if (lowerKey !== key && !(lowerKey in obj)) {
      obj[lowerKey] = obj[key];
      delete obj[key];
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

StyleDictionary.registerTransform({
  name: 'name/figma',
  type: 'name',
  transform: (token, config) => {
    const prefix = config?.prefix ? `${config.prefix}-` : '';
    const segments = token.path
      .filter((p, i, arr) => !(i === arr.length - 1 && p === '$root'))
      .map((p) => p.replace(/^\$/, ''));
    return prefix + segments.join('-');
  },
});

export default {
  source: ['tokens/primitive_tokens.json', 'tokens/semantic_tokens.json'],
  parsers: ['figma-token-parser'],
  platforms: {
    css: {
      transforms: ['attribute/cti', 'name/figma', 'color/css'],
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
