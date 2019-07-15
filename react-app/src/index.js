import React, { Component } from "react";
import ReactDOM from "react-dom";
import Layout from "./layouts/main/main";
import ProgressIndicator from "./components/ProgressIndicator";
import Editor from "./components/editor/Editor";

import { MILESTONE_INCREMENT } from "./constants/logic";
import imagesJson from "./constants/images";

const imagePaths = imagesJson;

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      nextMilestone: MILESTONE_INCREMENT,
      wordCount: 0
    };
  }

  newImage = () => {
    let numImages = imagePaths.length;

    // Pick a new index into nodes array
    const newIndex = (this.state.currentImageIndex + 1) % numImages;
    this.setState({ currentImageIndex: newIndex });
  };

  setWordCount = newCount => {
    const { nextMilestone } = this.state;

    // Every time we alter the word count,
    // we need to check if a new milestone has been reached ...
    if (newCount >= nextMilestone) {
      this.newImage(); // Milestones rewarded w/ new image

      this.setState({
        wordCount: newCount,
        nextMilestone: nextMilestone + MILESTONE_INCREMENT //
      });
    } else {
      this.setState({ wordCount: newCount });
    }
  };

  render() {
    const { currentImageIndex, nextMilestone, wordCount } = this.state;

    let currentImage = imagePaths[currentImageIndex].path;

    return (
      <Layout>
        <div className="ImageViewerWrapper">
          <div className="ProgressIndicatorWrapper">
            <ProgressIndicator
              nextMilestone={nextMilestone}
              wordCount={wordCount}
            />
          </div>
          <img src={currentImage} alt="" />
        </div>
        <div className="EditorWrapper">
          {window && <Editor setWordCount={this.setWordCount} />}
        </div>
      </Layout>
    );
  }
}

ReactDOM.render(<Index />, document.querySelector("#root"));
