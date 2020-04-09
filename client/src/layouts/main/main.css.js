import React from "react";
import styled from "styled-components";

const Container = styled.div`
  height: 100vh;
  overflow: hidden;

  header {
    height: 50px;
    width: 100%;
    background: white;
    z-index: 10;
  }

  .ListView {
    margin: 0px auto;
    max-width: 800px;
  }

  .EditorView {
    display: flex;
    height: calc(100vh - 50px);
  }

  .ImageViewerWrapper {
    width: 50%;
    height: 100%;

    background: black;
    position: relative;

    img {
      width: 100%;
    }
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
    position: absolute;
    bottom: 0px;
    left: 0px;
    padding: 10px;
    background-color: black;

    color: white;
    text-shadow: 1px 1px 3px black;
    z-index: 5;
    width: 100%;
    height: 10%;

    display: flex;
    justify-content: space-around;
    align-items: center;

    .word-count {
      margin: 0.5rem;
      font-size: 2rem;
      color: #2bec2b;
    }
  }
`;

export default Container;
