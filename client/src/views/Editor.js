import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSetState } from "react-hanger";
import ProgressIndicator from "../components/ProgressIndicator";
import Editor from "../components/editor";

import { MILESTONE_INCREMENT } from "../constants";

function EditorView() {
  let { state, setState } = useSetState({
    currentImageUrl: null,
    nextMilestone: MILESTONE_INCREMENT,
    wordCount: 0,
    document: null
  });
  let { documentId } = useParams();

  useEffect(() => {
    // Retrieve document from backend

    fetch(`http://localhost:3000/nanowrimo/api/document/${documentId}`, {
      credentials: "include"
    })
      .then(res => res.json())
      .then(parsed => {
        setState({ document: parsed });
      });
  }, [documentId, setState]);

  async function getNewImage() {
    const newImage = await getRandomUnsplashImage("nature");

    setState({ currentImageUrl: newImage });
  }

  function syncDocument(fullText) {
    fetch(`http://localhost:3000/nanowrimo/api/document/${documentId}`, {
      credentials: "include",
      method: "put",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        content: fullText
      })
    });
  }

  function setWordCount(newCount) {
    const { nextMilestone } = state;

    // Every time we alter the word count,
    // we need to check if a new milestone has been reached ...
    if (newCount >= nextMilestone) {
      getNewImage(); // Milestones rewarded w/ new image

      setState({
        wordCount: newCount,
        nextMilestone:
          Math.ceil(newCount / MILESTONE_INCREMENT) * MILESTONE_INCREMENT
      });
    } else {
      setState({ wordCount: newCount });
    }
  }

  return (
    <div className="EditorView">
      <div className="ImageViewerWrapper">
        <ProgressIndicator
          nextMilestone={state.nextMilestone}
          wordCount={state.wordCount}
        />
        {!state.currentImageUrl ? (
          "Loading..."
        ) : (
          <img
            src={state.currentImageUrl}
            style={{ height: "100%", width: "100%", objectFit: "cover" }}
            alt="A source of inspiration"
          />
        )}
      </div>
      <div className="EditorWrapper">
        {state.document && (
          <Editor
            setWordCount={setWordCount}
            document={state.document}
            syncDocument={syncDocument}
          />
        )}
      </div>
    </div>
  );
}

function getRandomUnsplashImage(searchTerm) {
  return fetch("https://source.unsplash.com/1600x900/?" + searchTerm).then(
    res => {
      return res.url;
    }
  );
}

export default EditorView;
