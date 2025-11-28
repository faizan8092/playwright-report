#!/usr/bin/env node

// For local testing only
const path = require('path');
process.argv[2] = process.argv[2] || './test-project';

require('./index.js');
