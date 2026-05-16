const fs = require('fs');
const path = require('path');

const src = path.join(__dirname, '../node_modules/monaco-editor/min/vs');
const dest = path.join(__dirname, '../public/vs');

function copyMonaco() {
  try {
    console.log(`Copying monaco-editor from ${src} to ${dest}...`);
    if (fs.existsSync(dest)) {
      // Use recursive rm for Node.js 14.14+
      fs.rmSync(dest, { recursive: true, force: true });
    }
    fs.mkdirSync(dest, { recursive: true });
    
    // fs.cpSync is available in Node.js 16.7+
    if (fs.cpSync) {
      fs.cpSync(src, dest, { recursive: true });
    } else {
      // Fallback for older Node.js versions if necessary, but cpSync is preferred
      console.warn('fs.cpSync not available, attempting manual copy...');
      // Simplistic fallback for demonstration, though cpSync is ubiquitous now
      const copyRecursiveSync = (src, dest) => {
        const stats = fs.statSync(src);
        const isDirectory = stats.isDirectory();
        if (isDirectory) {
          fs.mkdirSync(dest, { recursive: true });
          fs.readdirSync(src).forEach((childItemName) => {
            copyRecursiveSync(path.join(src, childItemName), path.join(dest, childItemName));
          });
        } else {
          fs.copyFileSync(src, dest);
        }
      };
      copyRecursiveSync(src, dest);
    }
    
    console.log('Successfully copied monaco-editor files to public/vs');
  } catch (err) {
    console.error('Error copying monaco-editor files:', err);
    process.exit(1);
  }
}

copyMonaco();
