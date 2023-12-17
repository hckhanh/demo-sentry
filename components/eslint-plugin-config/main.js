/** @type {import('eslint').ESLint.Plugin} **/
module.exports = {
  configs: {
    perfectionist: {
      plugins: ['perfectionist'],
      extends: ['plugin:perfectionist/recommended-natural'],
      rules: {
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/no-unused-vars': 'error',
        'react/jsx-curly-brace-presence': [
          2,
          {
            props: 'never',
            children: 'never',
          },
        ],
        'perfectionist/sort-object-types': [
          'error',
          {
            type: 'line-length',
            order: 'asc',
            'partition-by-new-line': true,
            groups: ['id', 'type', 'field', 'name', 'unknown', 'error'],
            'custom-groups': {
              id: 'id',
              type: 'type',
              field: 'field',
              name: '*Name',
              error: '*Error',
            },
          },
        ],
        'perfectionist/sort-interfaces': [
          'error',
          {
            type: 'line-length',
            order: 'asc',
            'partition-by-new-line': true,
            groups: ['id', 'type', 'field', 'name', 'unknown', 'error'],
            'custom-groups': {
              id: 'id',
              type: 'type',
              field: 'field',
              name: '*Name',
              error: '*Error',
            },
          },
        ],
        'perfectionist/sort-jsx-props': [
          'error',
          {
            type: 'line-length',
            order: 'asc',
            groups: ['shorthand', 'unknown', 'multiline'],
          },
        ],
        'perfectionist/sort-objects': [
          'error',
          {
            type: 'line-length',
            order: 'asc',
            'partition-by-comment': true,
            'partition-by-new-line': true,
            groups: ['id', 'type', 'field', 'name', 'unknown', 'error'],
            'custom-groups': {
              id: 'id',
              type: 'type',
              field: 'field',
              name: '*Name',
              error: '*Error',
            },
          },
        ],
        'perfectionist/sort-imports': [
          'error',
          {
            type: 'natural',
            order: 'asc',
            'internal-pattern': ['@/**'],
            'newlines-between': 'always',
            'custom-groups': {
              type: {
                react: 'react',
              },
              value: {
                react: ['react', 'react-dom/*'],
              },
            },
            groups: [
              'side-effect',
              'react',
              ['builtin-type', 'external-type'],
              ['builtin', 'external'],
              'internal-type',
              'internal',
              ['parent-type', 'sibling-type', 'index-type'],
              ['parent', 'sibling', 'index'],
              'style',
              'object',
              'unknown',
            ],
          },
        ],
      },
    },
  },
}
