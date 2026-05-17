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
      let content = fs.readFileSync(src, 'utf8');
      const polyfill = `if(typeof Promise.withResolvers!=='function'){Promise.withResolvers=function(){let r,j;const p=new Promise((a,b)=>{r=a;j=b});return{promise:p,resolve:r,reject:j}}};if(typeof URL.parse!=='function'){URL.parse=function(u,b){try{return new URL(u,b)}catch(e){return null}}};\n`;
      fs.writeFileSync(dest, polyfill + content);
      console.log('Successfully injected polyfills and copied pdf.worker.min.mjs to public/');
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
