const path = require('path');

module.exports = {
  // PDF styling
  stylesheet: path.join(__dirname, 'zaza-pdf.css'),
  
  // PDF options
  pdf_options: {
    format: 'Letter',
    margin: {
      top: '1in',
      right: '0.75in',
      bottom: '1in',
      left: '0.75in'
    },
    printBackground: true,
    displayHeaderFooter: true,
    headerTemplate: '<div></div>',
    footerTemplate: `
      <div style="width: 100%; font-size: 10pt; color: #6B7280; padding: 0 0.75in; display: flex; justify-content: space-between;">
        <span>Zaza Technologies • zaza.ai</span>
        <span>Page <span class="pageNumber"></span> of <span class="totalPages"></span></span>
      </div>
    `
  },
  
  // Markdown options
  marked_options: {
    breaks: true,
    gfm: true
  },
  
  // Document info
  document_title: 'Teacher Self-Care Guide',
  
  // Launch options for Puppeteer
  launch_options: {
    headless: 'new',
    args: ['--no-sandbox']
  }
};