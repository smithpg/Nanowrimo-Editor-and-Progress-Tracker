import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import _ from 'lodash';

import './quill.snow.css';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { rawText: '', html: null }; // You can also pass a Quill Delta here
  }

  _calcWordCount(text) {
    /**
     * Remove surrounding whitespace, split, then count
     */

    return text.trim().split(' ').length;
  }

  _update = _.debounce(editor => {
    const currentTextValue = editor.getText();

    // Update word count
    const newCount = this._calcWordCount(currentTextValue);
    this.props.setWordCount(newCount);

    // Save in-progress document to localStorage
    this.saveToLocalStorage(editor);
  }, 200);

  saveToLocalStorage = editor => {
    /**
     * Saves in-progress document to localstorage in plaintext
     * and HTML formats
     */
    const { localStorage } = window,
      { getText, getHTML } = editor;

    localStorage.setItem('plaintext', getText());
    localStorage.setItem('html', getHTML());
  };

  attemptToLoadFromLocalStorage = () => {
    if (window.localStorage.html) {
      this.setState({ html: window.localStorage.html });
    }
  };

  onChange = (content, delta, source, editor) => {
    /**
     * See React-Quill Github page for explanation of args
     *
     * https://github.com/zenoamaro/react-quill#exports
     */

    this._update(editor);

    this.setState({ html: content });
  };

  componentDidMount() {
    this.attemptToLoadFromLocalStorage();
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        value={this.state.html}
        onChange={this.onChange}
      />
    );
  }
}
