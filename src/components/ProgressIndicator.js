import React from 'react';

const ProgressIndicator = ({ nextMilestone, wordCount }) => {
  return (
    <aside>
      <span>Current Word Count: {wordCount}</span>
      <span>Next Image in {nextMilestone - wordCount} words</span>
    </aside>
  );
};

export default ProgressIndicator;
