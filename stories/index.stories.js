import './quill.snow.css';

const Quill = require('quill');
const MarkdownToolbar = require('../src').default;

export default {
  title: 'Demo',
};

export const Toolbar = () => {
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
  });

  setTimeout(() => {
    new Quill('#editor', {
      theme: 'snow',
      modules: {
        toolbar: toolbarOptions,
        'markdown-toolbar': true
      }
    });
  }, 500);

  return '<div id=editor class="ql-container ql-snow"></div>';
};

