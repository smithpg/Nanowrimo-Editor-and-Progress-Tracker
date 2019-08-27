import React from "react";
import { MILESTONE_INCREMENT } from "../constants";
import _ from "lodash";

const ProgressIndicator = ({ nextMilestone, wordCount }) => (
  <aside
    className="ProgressIndicatorWrapper"
    style={{ backgroundColor: "black " }}
  >
    <span>
      Current Word Count: <span className="word-count">{wordCount}</span>
    </span>
    <span>Next Image in {nextMilestone - wordCount} words</span>
  </aside>
);

export default ProgressIndicator;
