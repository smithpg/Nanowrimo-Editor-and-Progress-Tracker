import React from "react";
import { MILESTONE_INCREMENT } from "../constants/logic";
import _ from "lodash";

const WENTZ_FACE = "/wentz-face.png";

const ProgressIndicator = ({ nextMilestone, wordCount }) => {
  const milestonesReached = Math.floor(wordCount / MILESTONE_INCREMENT);

  const progressTowardsNextMilestone = Math.floor(
    (wordCount / MILESTONE_INCREMENT - milestonesReached) * 100
  );

  const headIconsForCompletedMilestones = [];
  _.times(milestonesReached, () =>
    headIconsForCompletedMilestones.push(
      <img
        src={WENTZ_FACE}
        style={{ height: 100, width: 100 }}
        alt="sO dReAmY"
      />
    )
  );

  return (
    <aside>
      {/* <span>Current Word Count: {wordCount}</span>
          <span>Next Image in {nextMilestone - wordCount} words</span>
          <div>{progressTowardsNextMilestone}</div> */}
      {headIconsForCompletedMilestones}
      <img
        src={WENTZ_FACE}
        style={{
          clipPath: `polygon(0 0, 100% 0, 100% ${progressTowardsNextMilestone}%, 0 ${progressTowardsNextMilestone}%  )`,
          height: 100,
          width: 100
        }}
      />
    </aside>
  );
};

export default ProgressIndicator;
