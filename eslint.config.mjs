import {defineConfig, globalIgnores} from 'eslint/config';
import js from '@eslint/js';
import tseslint from 'typescript-eslint';
import reactHooks from 'eslint-plugin-react-hooks';
import docusaurus from '@docusaurus/eslint-plugin';
import globals from 'globals';

export default defineConfig(
  globalIgnores(['build', '.docusaurus']),
  js.configs.recommended,
  tseslint.configs.recommended,
  reactHooks.configs.flat.recommended,
  {plugins: {'@docusaurus': docusaurus}, rules: docusaurus.configs.recommended.rules},
  {languageOptions: {globals: {...globals.browser, ...globals.node}}},
);
