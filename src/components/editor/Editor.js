import React, { Component } from 'react';
import ReactQuill from 'react-quill'; // ES6
import _ from 'lodash';

import './quill.snow.css';

export default class Editor extends Component {
  constructor(props) {
    super(props);
    this.state = { text: '' }; // You can also pass a Quill Delta here
    this.handleChange = this.handleChange.bind(this);
  }

  _calcWordCount(text) {
    /**
     * Remove surrounding whitespace, split, then count
     */

    return text.trim().split(' ').length;
  }

  _updateWordCount = _.debounce(text => {
    const newCount = this._calcWordCount(text);
    this.props.setWordCount(newCount);
  }, 200);

  handleChange(value) {
    this._updateWordCount(value);

    this.setState({ text: value });
  }

  render() {
    return (
      <ReactQuill
        theme="snow"
        value={this.state.text}
        onChange={this.handleChange}
      />
    );
  }
}
