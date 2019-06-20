import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Layout from 'components/layout';
import Box from 'components/box';
import IOExample from 'components/io-example';
import ImageViewer from 'components/ImageViewer';
import Editor from 'components/Editor';
// import Modal from 'containers/modal';
import { graphql } from 'gatsby';

class Index extends Component {
  constructor(props) {
    super(props);
    this.state = { currentImageIndex: 0, nextMilestone: 100, wordCount: 0 };
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
        nextMilestone: nextMilestone + 100, //
      });
    } else {
      this.setState({ wordCount: newCount });
    }
  };

  componentDidMount() {
    // Check localstorage for writing in progress
    // if (localstorage.inProgress) {
    // }

    window.addEventListener('mousedown', () => {
      this.setWordCount(this.state.wordCount + 10);
    });
  }

  render() {
    const {
      allImageSharp: { nodes },
    } = this.props.data;

    const { currentImageIndex } = this.state;

    let currentImage = nodes[currentImageIndex].fluid;

    return (
      <Layout>
        <div className="ImageViewerWrapper">
          <ImageViewer fluid={currentImage} />;
        </div>
        <div className="EditorWrapper">{/* <Editor /> */}</div>
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
    allImageSharp {
      nodes {
        fluid {
          ...GatsbyImageSharpFluid_tracedSVG
        }
      }
    }
  }
`;
