"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports["default"] = generateClassName;

/* eslint-disable no-console */
// Returns a function which generates unique class names based on counters.
// When new generator function is created, rule counter is reset.
// We need to reset the rule counter for SSR for each request.
//
// Copied from material-ui due to issue https://github.com/callemall/material-ui/issues/8223
// This counter is moved outside from `generateClassName` to solve the issue
var ruleCounter = 0; // Adds a prefix to all generated class names, to avoid conflict with other Material UI instances.

var prefix = 'materialui-daterange-picker';

function generateClassName(rule, sheet) {
  ruleCounter += 1;

  if (ruleCounter > 1e10) {
    console.warn(['Material-UI: you might have a memory leak.', 'The ruleCounter is not supposed to grow that much.'].join(''));
  }

  if (sheet && sheet.options.meta) {
    return "".concat(prefix, "-").concat(sheet.options.meta, "-").concat(rule.key, "-").concat(ruleCounter);
  }

  return "".concat(prefix, "-").concat(rule.key, "-").concat(ruleCounter);
}