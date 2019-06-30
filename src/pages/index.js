import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from 'layouts/main';
import Box from 'components/box';
import IOExample from 'components/io-example';
import ImageViewer from 'components/ImageViewer';
import ProgressIndicator from 'components/ProgressIndicator';
import Editor from 'components/editor';
// import Modal from 'containers/modal';
import { graphql } from 'gatsby';

import { MILESTONE_INCREMENT } from 'constants/logic';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = {
      currentImageIndex: 0,
      nextMilestone: MILESTONE_INCREMENT,
      wordCount: 0,
    };
  }

  newImage = () => {
    let numImages = this.props.data.allImageSharp.nodes.length;

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
        nextMilestone: nextMilestone + MILESTONE_INCREMENT, //
      });
    } else {
      this.setState({ wordCount: newCount });
    }
  };

  componentDidMount() {
    // Check localstorage for writing in progress
    // if (localstorage.inProgress) {
    // }
  }

  render() {
    const {
      allImageSharp: { nodes },
    } = this.props.data;

    const { currentImageIndex, nextMilestone, wordCount } = this.state;

    let currentImage = nodes[currentImageIndex].fluid;

    return (
      <Layout>
        <div className="ImageViewerWrapper">
          <div className="ProgressIndicatorWrapper">
            <ProgressIndicator
              nextMilestone={nextMilestone}
              wordCount={wordCount}
            />
          </div>
          <ImageViewer fluid={currentImage} />;
        </div>
        <div className="EditorWrapper">
          <Editor setWordCount={this.setWordCount} />
        </div>
      </Layout>
    );
  }
}

export default Index;

Index.propTypes = {
  data: PropTypes.object.isRequired,
};

export const query = graphql`
  query imageQuery {
    allImageSharp(filter: { fluid: { src: { regex: "/jpg/" } } }) {
      nodes {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
