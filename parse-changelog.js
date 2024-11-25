const fs = require('fs');
const marked = require('marked');

const [,, inputFile, outputFile] = process.argv;

function parseChangelog(markdown) {
  const htmlContent = marked(markdown);
  const sections = htmlContent.split('<h2>').slice(1);

  return sections.map((section) => {
    const [header, ...content] = section.split('</h2>');
    const version = header.match(/\d+\.\d+\.\d+/)?.[0];
    const changes = content.join('').split('<li>').slice(1).map((item) => {
      return item.split('</li>')[0].trim();
    });
    return { version, changes };
  });
}

const markdownContent = fs.readFileSync(inputFile, 'utf-8');
const changelogJson = parseChangelog(markdownContent);

fs.writeFileSync(outputFile, JSON.stringify(changelogJson, null, 2));
console.log(`Changelog JSON created at ${outputFile}`);
