#!/usr/bin/env node
/**
 * Replaces __WEB3FORMS_ACCESS_KEY__ in index.html with process.env.WEB3FORMS_ACCESS_KEY.
 * Run on Render (or CI) so the access key is not stored in git.
 */
const fs = require('fs');
const path = require('path');

const root = path.join(__dirname, '..');

function loadLocalEnvFile() {
  if (process.env.WEB3FORMS_ACCESS_KEY) return;
  try {
    const raw = fs.readFileSync(path.join(root, '.env'), 'utf8');
    for (const line of raw.split('\n')) {
      const trimmed = line.trim();
      if (!trimmed || trimmed.startsWith('#')) continue;
      const m = trimmed.match(/^WEB3FORMS_ACCESS_KEY\s*=\s*(.*)$/);
      if (m) {
        process.env.WEB3FORMS_ACCESS_KEY = m[1].trim().replace(/^["']|["']$/g, '');
        break;
      }
    }
  } catch (_) {
    /* no .env — rely on host env only */
  }
}

loadLocalEnvFile();

const indexPath = path.join(root, 'index.html');
const placeholder = '__WEB3FORMS_ACCESS_KEY__';

let html = fs.readFileSync(indexPath, 'utf8');

if (!html.includes(placeholder)) {
  console.warn('inject-web3forms-key: placeholder not found in index.html (skip)');
  process.exit(0);
}

const key = process.env.WEB3FORMS_ACCESS_KEY;
if (!key || !String(key).trim()) {
  console.error('inject-web3forms-key: set WEB3FORMS_ACCESS_KEY in the host dashboard (Render → Environment).');
  process.exit(1);
}

const trimmed = String(key).trim();
html = html.split(placeholder).join(trimmed);
fs.writeFileSync(indexPath, html);
console.log('inject-web3forms-key: wrote access key into index.html');
