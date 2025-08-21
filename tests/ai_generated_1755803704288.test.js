const { plugins } = require('./postcss.config.js');

describe('Plugin Object Validation', () => {
  it('ensures plugins are objects', () => {
    expect(typeof plugins['@tailwindcss/postcss']).toBe('object');
    expect(plugins['@tailwindcss/postcss']).not.toBeNull();
    expect(typeof plugins.autoprefixer).toBe('object');
    expect(plugins.autoprefixer).not.toBeNull();
  });
});

```
