/** @type {import("eslint").Linter.Config} */
module.exports = {
	extends: [
		'plugin:@typescript-eslint/recommended',
		'plugin:prettier/recommended',
		'prettier',
	],
	plugins: [
		'@typescript-eslint/eslint-plugin',
		'simple-import-sort',
		'eslint-plugin-unused-imports',
	],
	parser: '@typescript-eslint/parser',
	ignorePatterns: [
		'.*.js',
		'.turbo/',
		'dist/',
		'coverage/',
		'node_modules/',
		'out/',
	],
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
