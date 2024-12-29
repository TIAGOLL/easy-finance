/** @type {import('eslint').Linter.Config} */
module.exports = {
	extends: ['@rocketseat/eslint-config/react'],
	plugins: ['simple-import-sort', 'eslint-plugin-unused-imports'],
	rules: {
		'simple-import-sort/imports': 'error',
		'simple-import-sort/exports': 'error',
		'unused-imports/no-unused-imports': 'error',
		'unused-imports/no-unused-vars': [
			'warn',
			{
				vars: 'all',
				varsIgnorePattern: '^_',
				args: 'after-used',
				argsIgnorePattern: '^_',
			},
		],
	},
}
