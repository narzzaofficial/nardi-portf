const fs = require('fs');
const path = require('path');

function processDir(dir) {
  const files = fs.readdirSync(dir);
  for (const f of files) {
    const fullPath = path.join(dir, f);
    if (fs.statSync(fullPath).isDirectory()) {
      processDir(fullPath);
    } else if (fullPath.endsWith('.tsx') || fullPath.endsWith('.ts')) {
      let content = fs.readFileSync(fullPath, 'utf8');
      let original = content;
      
      content = content.replace(/bg-\[\#0d0d0f\]/g, 'bg-[var(--bg)]');
      content = content.replace(/bg-\[\#111114\]/g, 'bg-[var(--bg-surface)]');
      content = content.replace(/bg-\[\#16161a\]/g, 'bg-[var(--bg-card)]');
      content = content.replace(/bg-\[\#eeeef2\]/g, 'bg-[var(--text)]');
      content = content.replace(/text-\[\#0d0d0f\]/g, 'text-[var(--bg)]');
      content = content.replace(/text-\[\#eeeef2\]/g, 'text-[var(--text)]');
      content = content.replace(/text-\[rgba\(238,238,242,0\.5\)\]/g, 'text-[var(--text-muted)]');
      content = content.replace(/border-\[rgba\(255,255,255,0\.07\)\]/g, 'border-[var(--border)]');
      content = content.replace(/border-\[rgba\(255,255,255,0\.1\)\]/g, 'border-[var(--border)]');
      content = content.replace(/border-\[rgba\(255,255,255,0\.08\)\]/g, 'border-[var(--border)]');
      content = content.replace(/border-\[rgba\(255,255,255,0\.05\)\]/g, 'border-[var(--border)]');
      content = content.replace(/bg-\[rgba\(255,255,255,0\.05\)\]/g, 'bg-[var(--tag-bg)]');
      content = content.replace(/hover:bg-\[rgba\(255,255,255,0\.05\)\]/g, 'hover:bg-[var(--tag-bg)]');
      content = content.replace(/hover:bg-\[rgba\(255,255,255,0\.1\)\]/g, 'hover:bg-[var(--border-hover)]');
      
      content = content.replace(/background:\s*["']#16161a["']/g, 'background: "var(--bg-card)"');
      content = content.replace(/background:\s*["']#eeeef2["']/g, 'background: "var(--text)"');
      content = content.replace(/color:\s*["']#0d0d0f["']/g, 'color: "var(--bg)"');
      content = content.replace(/border:\s*["']1px solid rgba\(255,255,255,0\.08\)["']/g, 'border: "1px solid var(--border)"');
      
      if (content !== original) {
        fs.writeFileSync(fullPath, content, 'utf8');
        console.log('Updated', fullPath);
      }
    }
  }
}

processDir(path.join(process.cwd(), 'app', 'admin'));
