import React, { Component } from "react";
import ReactQuill from "react-quill"; // ES6
import _ from "lodash";

import "./quill.snow.css";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { rawText: "", html: this.props.document.content }; // You can also pass a Quill Delta here

    this._editor = null;
    this.wordCount = 0;
  }

  _calcWordCount(text) {
    /**
     * Remove surrounding whitespace, split, then count
     */
    const split = text
      .trim()
      .split(/\s/)
      .filter(str => str !== "");

    return split[0] === "" ? 0 : split.length;
  }

  _update = _.debounce(() => {
    const currentTextValue = this._editor.getText();

    // Update word count
    const newCount = this._calcWordCount(currentTextValue);
    this.props.setWordCount(newCount);

    // Save in-progress document
    console.log("saving");
    this.props.syncDocument(this._editor.getHTML());
  }, 100);

  onChange = (content, delta, source, editor) => {
    /**
     * See React-Quill Github page for explanation of args
     *
     * https://github.com/zenoamaro/react-quill#exports
     */
    if (!this._editor) {
      this._editor = editor;
    }

    this._update();

    this.setState({ html: content });
  };

  render() {
    return (
      window && (
        <ReactQuill
          theme="snow"
          value={this.state.html}
          onChange={this.onChange}
        />
      )
    );
  }
}
