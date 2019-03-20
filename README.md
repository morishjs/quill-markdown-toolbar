# quill-markdown-toolbar
Quill.js module that converts pasted markdown to rich text formatting.

# Quickstart

## Install using npm

```shell
npm i quill-markdown-toolbar
```

## Install using CDN

```html
<script src="https://cdn.jsdelivr.net/npm/quill-markdown-toolbar@0.0.2/dist/markdownToolbar.min.js">
```

## Register a module
```html
<script src="https://cdn.quilljs.com/1.3.1/quill.js"></script>
<script src="https://cdn.jsdelivr.net/npm/quill-markdown-toolbar@0.0.2/dist/markdownToolbar.min.js">
<script>
  const toolbarOptions = {
      container: [
        ['bold', 'italic', 'underline', 'strike'],
        ['markdown'], // Add this.
      ],
      handlers: { // Add this.
      'markdown': function () {} 
      }
    };

  Quill.register({
    'modules/markdown-toolbar': MarkdownToolbar // Add this.
  })
  var quill = new Quill('#editor', {
    theme: 'snow',
    modules: {
      toolbar: toolbarOptions,
      'markdown-toolbar': true // Add this.
    }
  });
</script>  
  
```

# Demo
Paste markdown text and click the markdown button on toolbar. <br>
![](https://media.giphy.com/media/YWoBHJ32QqTOFRQzue/giphy.gif)

# Try yourself!
If you are a visual studio code user, you can run on debug tab.

# Contribution
- For now, use the Github issues for requests/bug issues
  - Reporting new bugs or adding details to existing ones
  - Reproducing unconfirmed bugs
  - Requesting new features

# License
MIT License
