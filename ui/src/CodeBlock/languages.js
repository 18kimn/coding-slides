//index file to import languages, to avoid cluttering in the codeblock code
import {lua} from '@codemirror/legacy-modes/mode/lua'
import {r} from '@codemirror/legacy-modes/mode/r'
import {python} from '@codemirror/legacy-modes/mode/python'
import {shell} from '@codemirror/legacy-modes/mode/shell'
import {css} from '@codemirror/legacy-modes/mode/css'
import {sql} from '@codemirror/legacy-modes/mode/sql'
import {
  javascript,
  json,
  typescript,
} from '@codemirror/legacy-modes/mode/javascript'

/*
language support tasks:
  node-es5 and node-es6: save with.cjs or .mjs and run with 'node'
  css, browser, html: should run interactively 
  for R, python, node, typescript, lua, should be using renv, conda, tsconfig, luarocks, and package.json files
*/

const languages = {
  Rscript: r,
  python3: python,
  'node-es5': javascript,
  'node-es6': javascript,
  typescript,
  lua,
  bash: shell,
  // html,
  css,
  sql,
}

export default languages
