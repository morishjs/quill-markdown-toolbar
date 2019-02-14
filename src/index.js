import HorizontalRule from './formats/hr'
Quill.register('formats/horizontal', HorizontalRule)

class MarkdownToolbar {
  constructor (quill, options) {
    this.quill = quill
    this.options = options

    document.getElementById('markdownButton').onmousedown = event => {
      let selection = this.quill.getSelection()
      if (selection.length === 0) return

      let lines = this.quill.getLines(selection.index, selection.length)
      // IDEA: while(lines.pop and check lines.empty?)
      lines.forEach((line, index) => {
        const lineText = line.domNode.textContent
// TODO: IDEA 코드 블럭이 있는지 우선 체크 -> 포매팅 -> 그 다음 한줄짜리들 수정
        for (let match of this.matches) {
          const matchedText = lineText.match(match.pattern)
          if (matchedText) {
            console.log('matched', match.name, lineText)
            
            const lineStartIndex = this.quill.getIndex(line)
            // TODO: Code smell
            if (match.name === 'code-block') {
              lines.slice(index, lines.length).forEach(line => {
                const lineText = line.domNode.textContent
                const matchedText = lineText.match(match.lineEndPattern)
                if (matchedText) {
                  const result = Quill.find(line.domeNode)
                  console.log('result :', result)
                }
              })
              
              this.quill.setSelection(lineStartIndex, lastIndex - lineStartIndex)
              const multiLineSelection = this.quill.getSelection()
              const multiLines = this.quill.getLines(multiLineSelection.index, multiLineSelection.length)
              for (let index = 0; index < multiLines.length; index++) {
                lines.shift()
              }

              match.action(lineStartIndex, lastIndex)
            } else {
              match.action(lineText, match.pattern, lineStartIndex)
            }

            lines.shift()
            return
          }
        }

        lines.shift()
      })
    }
    
    this.matches = [
      {
        name: 'header',
        pattern: /^(#){1,6}\s/g,
        action: (text, pattern, lineStartIndex) => {
          var match = pattern.exec(text)
          if (!match) return
          const size = match[0].length
         
          this.quill.formatLine(lineStartIndex, text.length, 'header', size - 1)
          this.quill.deleteText(lineStartIndex, size)
        }
      },
      {
        name: 'blockquote',
        pattern: /^(>)\s/g,
        action: (text, pattern, lineStartIndex) => {
          this.quill.formatLine(lineStartIndex, 1, 'blockquote', true)
          this.quill.deleteText(lineStartIndex, 2)
        }
      },
      {
        name: 'code-block',
        pattern: /^`{3}\s*$/g,
        lineEndPattern: this.pattern,
        action: (lineStartIndex, lineEndIndex) => {
          this.quill.formatLine(lineStartIndex, lineEndIndex - lineStartIndex, 'code-block', true)
          this.quill.deleteText(lineStartIndex, 4)
          this.quill.deleteText(lineEndIndex, 4)
        }
      },
      {
        name: 'bolditalic',
        pattern: /(?:\*|_){3}(.+?)(?:\*|_){3}/g,
        action: (text, pattern, lineStartIndex) => {
          const match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStartIndex + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          this.quill.deleteText(startIndex, annotatedText.length)
          this.quill.insertText(startIndex, matchedText, {bold: true, italic: true})
        }
      },
      {
        name: 'bold',
        pattern: /(?:\*|_){2}(.+?)(?:\*|_){2}/g,
        action: (text, pattern, lineStartIndex) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStartIndex + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          this.quill.deleteText(startIndex, annotatedText.length)
          this.quill.insertText(startIndex, matchedText, {bold: true})
        }
      },
      {
        name: 'italic',
        pattern: /(?:\*|_){1}(.+?)(?:\*|_){1}/g,
        action: (text, pattern, lineStartIndex) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStartIndex + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          this.quill.deleteText(startIndex, annotatedText.length)
          this.quill.insertText(startIndex, matchedText, {italic: true})
        }
      },
      {
        name: 'strikethrough',
        pattern: /(?:~~)(.+?)(?:~~)/g,
        action: (text, pattern, lineStartIndex) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStartIndex + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          this.quill.deleteText(startIndex, annotatedText.length)
          this.quill.insertText(startIndex, matchedText, {strike: true})
        }
      },
      {
        name: 'code',
        pattern: /`([^`\n\r]+)`/g,
        action: (text, pattern, lineStart) => {
          let match = pattern.exec(text)

          const annotatedText = match[0]
          const matchedText = match[1]
          const startIndex = lineStart + match.index

          if (text.match(/^([*_ \n]+)$/g)) return

          this.quill.deleteText(startIndex, annotatedText.length)
          this.quill.insertText(startIndex, matchedText, {code: true})
        }
      },
      {
        name: 'hr',
        pattern: /^([-*]\s?){3}/g,
        action: (text, pattern, lineStart) => {
          this.quill.deleteText(lineStart, text.length)
          this.quill.insertEmbed(lineStart + 1, 'hr', true, Quill.sources.USER);
          this.quill.insertText(lineStart + 2, "\n", Quill.sources.SILENT);
        }
      },
      {
        name: 'asterisk-ul',
        pattern: /^[\*|\+]\s/g,
        action: (text, pattern, lineStart) => {
            this.quill.formatLine(lineStart, 1, 'list', 'unordered')
            this.quill.deleteText(lineStart, 2)
        }
      },
      {
        name: 'image',
        pattern: /(?:!\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, pattern, lineStart) => {
          const startIndex = text.search(pattern)
          const matchedText = text.match(pattern)[0]
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0]
          if (startIndex !== -1) {
              this.quill.deleteText(lineStart, matchedText.length)
              this.quill.insertEmbed(lineStart, 'image', hrefLink.slice(1, hrefLink.length - 1))
          }
        }
      },
      {
        name: 'link',
        pattern: /(?:\[(.+?)\])(?:\((.+?)\))/g,
        action: (text, pattern, lineStart) => {
          const startIndex = text.search(pattern)
          const matchedText = text.match(pattern)[0]
          const hrefText = text.match(/(?:\[(.*?)\])/g)[0]
          const hrefLink = text.match(/(?:\((.*?)\))/g)[0]
          if (startIndex !== -1) {
              this.quill.deleteText(lineStart, matchedText.length)
              this.quill.insertText(lineStart, hrefText.slice(1, hrefText.length - 1), 'link', hrefLink.slice(1, hrefLink.length - 1))
          }
        }
      }
    ]
  }
}

module.exports = MarkdownToolbar
