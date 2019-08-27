import React, { Component } from "react";
import ReactQuill from "react-quill"; // ES6
import _ from "lodash";

import "./quill.snow.css";

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { rawText: "", html: null }; // You can also pass a Quill Delta here

    this._editor = null;
    this.wordCount = 0;
  }

  _calcWordCount(text) {
    /**
     * Remove surrounding whitespace, split, then count
     */

    const split = text.trim().split(/\s/);

    return split[0] === "" ? 0 : split.length;
  }

  _update = _.debounce(() => {
    const currentTextValue = this._editor.getText();

    // Update word count
    const newCount = this._calcWordCount(currentTextValue);
    this.props.setWordCount(newCount);

    // Save in-progress document to localStorage
    console.log("saving");
    this._save();
  }, 100);

  _save = () => {
    /**
     * Saves in-progress document to localstorage in plaintext
     * and HTML formats
     */
    const { localStorage } = window,
      { getText, getHTML } = this._editor;

    localStorage.setItem("plaintext", getText());
    localStorage.setItem("html", getHTML());
    localStorage.setItem("wordCount", this.state.wordCount);
  };

  attemptToLoadFromLocalStorage = () => {
    if (window.localStorage.html) {
      this.setState({
        html: window.localStorage.html,
        wordCount: window.localStorage.wordCount
      });
    }
  };

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

  componentDidMount() {
    this.attemptToLoadFromLocalStorage();
  }

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
