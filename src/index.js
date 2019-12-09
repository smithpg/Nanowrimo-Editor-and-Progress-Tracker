import React, { Component } from "react";
import ReactDOM from "react-dom";
import Layout from "./layouts/main/main";
import ProgressIndicator from "./components/ProgressIndicator";
import Editor from "./components/editor/Editor";

import { MILESTONE_INCREMENT, API_URL } from "./constants";

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageUrl: null,
      nextMilestone: MILESTONE_INCREMENT,
      wordCount: 0
    };
  }

  async getNewImage() {
    const newImage = await this.getRandomUnsplashImage("nature");

    this.setState({ currentImageUrl: newImage });
  }

  getRandomUnsplashImage(searchTerm) {
    return fetch(
      "https://source.unsplash.com/1600x900/?" + searchTerm,
      {}
    ).then(res => {
      console.log(res);
      return res.url;
    });
  }

  setWordCount = newCount => {
    const { nextMilestone } = this.state;

    // Every time we alter the word count,
    // we need to check if a new milestone has been reached ...
    if (newCount >= nextMilestone) {
      this.getNewImage(); // Milestones rewarded w/ new image

      this.setState({
        wordCount: newCount,
        nextMilestone:
          Math.ceil(newCount / MILESTONE_INCREMENT) * MILESTONE_INCREMENT
      });
    } else {
      this.setState({ wordCount: newCount });
    }
  };

  componentDidMount() {
    this.getNewImage();
  }
  render() {
    const { currentImageUrl, nextMilestone, wordCount } = this.state;

    return (
      <Layout>
        <div className="ImageViewerWrapper">
          <ProgressIndicator
            nextMilestone={nextMilestone}
            wordCount={wordCount}
          />
          {!currentImageUrl ? (
            "Loading..."
          ) : (
            <img
              src={currentImageUrl}
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
              alt="A source of inspiration"
            />
          )}
        </div>
        <div className="EditorWrapper">
          {window && <Editor setWordCount={this.setWordCount} />}
        </div>
      </Layout>
    );
  }
}

ReactDOM.render(<Index />, document.querySelector("#root"));
