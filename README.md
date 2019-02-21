# quill-markdown-toolbar
Quill.js module that converts pasted markdown to rich text formatting.

# Quickstart

## Install using CDN

```html
<script src="https://cdn.quilljs.com/1.3.1/quill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/quill-markdown-toolbar@0.0.1/dist/markdownToolbar.min.js">
<script>
  Quill.register('modules/markdown-module', MarkdownToolbar);
  const toolbarOptions = {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['markdown'],
      ],
      handlers: {
      'markdown': function () {}
      }
    };

  Quill.register({
    'modules/markdown-toolbar': MarkdownToolbar
  })
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      'markdown-toolbar': true
    }
  });
</script>  
  
```

# Demo
Paste markdown text and click the markdown button on toolbar.
![](https://media.giphy.com/media/YWoBHJ32QqTOFRQzue/giphy.gif)


# Contribution
For now, use the Github issues for requests/bug issues

# License
MIT License
