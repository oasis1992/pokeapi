module.exports = {
  "extends": "airbnb",
  "parser": "babel-eslint",
  plugins: ["react-hooks"],
  'env': {
    'jest': true,
    'browser': true,
  },
  "rules": {
    'react/prop-types': 'off',
    'import/no-unresolved': 'off',
    semi: ['error', 'never'],
    indent: ['error', 4],
    'react/jsx-indent': ['error', 4],
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'react/jsx-indent-props': ['error', 4],
    'import/extensions': 0,
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'error',
    'global-require': 'off',
    'import/prefer-default-export': 'off',
  },
};