module.exports = {
  env: {
    browser: true,
    es2021: true
  },
  extends: ['plugin:react/recommended'],
  overrides: [],
  parserOptions: {
    ecmaVersion: 'latest',
    sourceType: 'module'
  },
  settings: {
    react: {
      version: 'detect'
    }
  },
  plugins: ['react', 'prettier', 'react-hooks', 'import'],
  rules: {
    semi: 1,
    'react/display-name': 'off',
    'comma-dangle': 0,
    'prettier/prettier': 'error',
    'react/jsx-filename-extension': [2, { extensions: ['.js', '.jsx', '.ts', '.tsx'] }],
    camelcase: 'off',
    'react/react-in-jsx-scope': 'off',
    'no-var': 0,
    'react/prop-types': 0,
    'no-return-await': 0,
    'prefer-destructuring': [
      2,
      { array: false, object: false },
      { enforceForRenamedProperties: false }
    ]
  }
};
