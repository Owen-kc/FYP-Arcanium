import DOMPurify from 'dompurify';

// Function to convert markdown from the API to html so it can be displayed in modals
export function markdownToHTML(text) {
  if (!text) return '';

  let html = text
    // Convert blockquotes
    .replace(/^\> (.*?)(?=\n|$)/gm, '<blockquote>$1</blockquote>')
    // Convert headings
    .replace(/(#+) (.*?)\n/g, (match, hashes, content) => {
      let level = hashes.length; // Number of hashes determines level of heading (e.g h1, g2, h3 etc)
      return `<h${level}>${content.trim()}</h${level}>`;
    })
    // Convert bold/italics
    .replace(/\*\*(.*?)\*\*/g, '<strong>$1</strong>')
    .replace(/__(.*?)__/g, '<strong>$1</strong>')
    .replace(/\*(.*?)\*/g, '<em>$1</em>')
    .replace(/_(.*?)_/g, '<em>$1</em>')
    // Convert lists
    .replace(/^\* (.*?)(?=\n|$)/gm, '<ul><li>$1</li></ul>')
    // Convert line breaks to <br> tags
    .replace(/\n/g, '<br>');

  // Sanitize 
  return DOMPurify.sanitize(html);
}
