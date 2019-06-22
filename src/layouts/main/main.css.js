import React from 'react';
import styled from 'styled-components';

const Container = styled.div`
  display: flex;
  align-items: stretch;

  height: 100vh;
  overflow: hidden;

  .ImageViewerWrapper {
    width: 50%;
    height: 100%;

    background: black;
  }

  .EditorWrapper {
    width: 50%;
    /* height: 100%; */

    box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.5);
    box-shadow: 0px 0px 20px -3px rgba(0, 0, 0, 0.5),
      6px 6px 4px rgba(0, 0, 0, 0.1), 10px 12px 0px #7a00ccad;

    & > div {
      height: 100%;
      width: 100%;
    }
  }

  .ProgressIndicatorWrapper {
    position: fixed;
    top: 10px;
    left: 10px;

    color: white;
    text-shadow: 1px 1px 3px black;
  }
`;

export default Container;
