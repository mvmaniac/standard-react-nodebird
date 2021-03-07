exports.options = {
  allowedTags: [
    'h1',
    'h2',
    'b',
    'i',
    'u',
    's',
    'p',
    'ul',
    'ol',
    'li',
    'blockquote',
    'a',
    'img'
  ],
  allowedAttributes: {
    a: ['href', 'name', 'target'],
    img: ['src'],
    '*': ['class']
  },
  allowedSchemes: ['data', 'http', 'https']
};
