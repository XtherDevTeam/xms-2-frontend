const fs = require('fs');
const path = require('path');

let src;
try {
  src = require.resolve('pdfjs-dist/build/pdf.worker.min.mjs', { paths: [require.resolve('react-pdf')] });
} catch (e) {
  src = path.join(__dirname, '../node_modules/react-pdf/node_modules/pdfjs-dist/build/pdf.worker.min.mjs');
}
const dest = path.join(__dirname, '../public/pdf.worker.min.mjs');

function copyPdfWorker() {
  try {
    console.log(`Copying pdf.worker from ${src} to ${dest}...`);
    if (fs.existsSync(src)) {
      fs.copyFileSync(src, dest);
      console.log('Successfully copied pdf.worker.min.mjs to public/');
    } else {
      console.error(`Source file not found: ${src}`);
      process.exit(1);
    }
  } catch (err) {
    console.error('Error copying pdf.worker:', err);
    process.exit(1);
  }
}

copyPdfWorker();
