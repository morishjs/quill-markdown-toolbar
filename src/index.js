import Quill from 'quill'
import HorizontalRule from './formats/hr'

Quill.register('formats/horizontal', HorizontalRule);
const Module = Quill.import('core/module');

export default class MarkdownToolbar extends Module {
  constructor(quill, options) {
    super(quill, options);

    this.quill = quill;

    const toolbar = quill.getModule('toolbar');
    toolbar.addHandler('markdown', this.markdownHandler.bind(this));

    this.matches = [{
      name: 'header',
      pattern: /^(#){1,6}\s/g,
      action: (text, pattern, lineStartIndex) => {
        const match = pattern.exec(text);
        if (!match) return;
        const size = match[0].length;

        this.quill.formatLine(lineStartIndex, text.length, 'header', size - 1);
        this.quill.deleteText(lineStartIndex, size)
      }
    },
      {
        name: 'blockquote',
        pattern: /^(>)\s/g,
        action: (text, pattern, lineStartIndex) => {
          this.quill.formatLine(lineStartIndex, 1, 'blockquote', true);
          this.quill.deleteText(lineStartIndex, 2)
        }
      },
      {
        name: 'code-block',
        multiline: true,
        pattern: /^`{3}/g,
        action: (startIndex, endIndex) => {
          this.quill.formatText(startIndex + 4, endIndex - (startIndex + 4), 'code-block', true);
          this.quill.deleteText(startIndex, 4);
          this.quill.deleteText(endIndex - 4, 4);
        }
      },
      {
        name: 'bolditalic',
        pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
        action: (text, pattern, lineStartIndex) => {
          const match = pattern.exec(text);

          const annotatedText = match[0];
          const matchedText = match[1];
          const startIndex = lineStartIndex + match.index;

          if (text.match(/^([*_ \n]+)$/g)) return;

          this.quill.deleteText(startIndex, annotatedText.length);
          this.quill.insertText(startIndex, matchedText, {
            bold: true,
            italic: true
          })
        }
      },
      {
        name: 'bold',
        pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
        action: (text, pattern, lineStartIndex) => {
          let match = pattern.exec(text);

          const annotatedText = match[0];
          const matchedText = match[1];
          const startIndex = lineStartIndex + match.index;

          if (text.match(/^([*_ \n]+)$/g)) return;

          this.quill.deleteText(startIndex, annotatedText.length);
          this.quill.insertText(startIndex, matchedText, {
            bold: true
          })
        }
      },
      {
        name: 'italic',
        pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
        action: (text, pattern, lineStartIndex) => {
          let match = pattern.exec(text);

          const annotatedText = match[0];
          const matchedText = match[1];
          const startIndex = lineStartIndex + match.index;

          if (text.match(/^([*_ \n]+)$/g)) return;

          this.quill.deleteText(startIndex, annotatedText.length);
          this.quill.insertText(startIndex, matchedText, {
            italic: true
          })
        }
      },
      {
        name: 'strikethrough',
        pattern: /(?:~~)(.+?)(?:~~)/g,
        action: (text, pattern, lineStartIndex) => {
          let match = pattern.exec(text);

          const annotatedText = match[0];
          const matchedText = match[1];
          const startIndex = lineStartIndex + match.index;

          if (text.match(/^([*_ \n]+)$/g)) return;

          this.quill.deleteText(startIndex, annotatedText.length);
          this.quill.insertText(startIndex, matchedText, {
            strike: true
          })
        }
      },
      {
        name: 'code',
        pattern: /`([^`\n\r]+)`/g,
        action: (text, pattern, lineStart) => {
          let match = pattern.exec(text);

          const annotatedText = match[0];
          const matchedText = match[1];
          const startIndex = lineStart + match.index;

          if (text.match(/^([*_ \n]+)$/g)) return;

          this.quill.deleteText(startIndex, annotatedText.length);
          this.quill.insertText(startIndex, matchedText, {
            code: true
          })
        }
      },
      {
        name: 'hr',
        pattern: /^([-*]\s?){3}/g,
        action: (text, pattern, lineStart) => {
          this.quill.deleteText(lineStart, text.length);
          this.quill.insertEmbed(lineStart + 1, 'hr', true, Quill.sources.USER);
          this.quill.insertText(lineStart + 2, "\n", Quill.sources.SILENT);
        }
      },
      {
        name: 'asterisk-ul',
        pattern: /^\s*[\*|\+|-]\s/g,
        action: (text, pattern, lineStart) => {
          this.quill.formatLine(lineStart, 1, 'list', 'unordered');
          this.quill.deleteText(lineStart, 2)
        }
      },
      {
        name: 'image',
        pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, pattern, lineStart) => {
          const startIndex = text.search(pattern);
          const matchedText = text.match(pattern)[0];
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0];
          if (startIndex !== -1) {
            this.quill.deleteText(lineStart, matchedText.length);
            this.quill.insertEmbed(lineStart, 'image', hrefLink.slice(1, hrefLink.length - 1))
          }
        }
      },
      {
        name: 'link',
        pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, pattern, lineStart) => {
          const startIndex = text.search(pattern);
          const matchedText = text.match(pattern)[0];
          const hrefText = text.match(/(?:\[(.*?)\])/g)[0];
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0];
          if (startIndex !== -1) {
            this.quill.deleteText(lineStart, matchedText.length);
            this.quill.insertText(lineStart, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1))
          }
        }
      }
    ];

    const markdown = document.querySelector('.ql-markdown');
    markdown.innerHTML = '<svg xmlns="http://www.w3.org/2000/svg" width="27" height="128" viewBox="0 0 208 128"><rect width="198" height="118" x="5" y="5" ry="10" stroke="#000" stroke-width="10" fill="none"/><path d="M30 98V30h20l20 25 20-25h20v68H90V59L70 84 50 59v39zm125 0l-30-33h20V30h20v35h20z"/></svg>'
  }

  markdownHandler() {
    let selection = this.quill.getSelection();
    if (selection.length === 0) return;

    const lines = this.quill.getLines(selection.index, selection.length);

    lines.forEach((line, index) => {
      let lineText = line.domNode.textContent;
      const lineIndex = this.quill.getIndex(line);

      let oldLineText = null;
      while (oldLineText !== lineText) {
        oldLineText = lineText;

        for (let match of this.matches) {
          const matchedText = lineText.match(match.pattern);

          if (matchedText) {
            // NOTE: `code-block` is a special case (multi-line)
            if (match.name === 'code-block') {
              if (index + 1 === lines.length - 1) {
                continue;
              }

              const restOfLines = lines.slice(index + 1, lines.length);
              const lastIndex = restOfLines.findIndex(l => l.domNode.textContent.match(match.pattern));
              if (lastIndex === -1) {
                continue;
              }

              match.action(this.quill.getIndex(line), this.quill.getIndex(restOfLines[lastIndex]));
              lines.splice(index, lastIndex + 1);

              break;
            } else {
              match.action(lineText, match.pattern, lineIndex);

              let updatedLine = this.quill.getLine(lineIndex)[0];
              lineText = updatedLine.domNode.textContent;
              break;
            }
          }
        }
      }
    });
  }
}
