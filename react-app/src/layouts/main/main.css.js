import React from "react";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  align-items: stretch;

  height: 100vh;
  overflow: hidden;

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
    top: 0px;
    left: 0px;
    padding: 10px;
    border: 1px dotted white;

    color: white;
    text-shadow: 1px 1px 3px black;
    z-index: 5;
    width: 100%;
    height: 100%;

    aside {
      display: flex;
      flex-wrap: wrap;
    }
  }
`;

export default Container;
