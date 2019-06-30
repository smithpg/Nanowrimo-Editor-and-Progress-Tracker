import React from 'react';
import { StaticQuery, graphql } from 'gatsby';
import { MILESTONE_INCREMENT } from 'constants/logic';
import Img from 'gatsby-image';
import _ from 'lodash';

const ProgressIndicator = ({ nextMilestone, wordCount }) => (
  <StaticQuery
    query={graphql`
      query wentzFaceQuery {
        file(relativePath: { eq: "wentz-face.png" }) {
          childImageSharp {
            fluid {
              ...GatsbyImageSharpFluid_tracedSVG
            }
          }
        }
      }
    `}
    render={data => {
      const { fluid } = data.file.childImageSharp;

      const milestonesReached = Math.floor(wordCount / MILESTONE_INCREMENT);

      const progressTowardsNextMilestone = Math.floor(
        (wordCount / MILESTONE_INCREMENT - milestonesReached) * 100
      );

      const headIconsForCompletedMilestones = [];
      _.times(milestonesReached, () =>
        headIconsForCompletedMilestones.push(
          <Img
            fluid={fluid}
            style={{
              height: 100,
              width: 100,
            }}
          />
        )
      );

      return (
        <aside>
          {/* <span>Current Word Count: {wordCount}</span>
          <span>Next Image in {nextMilestone - wordCount} words</span>
          <div>{progressTowardsNextMilestone}</div> */}
          {headIconsForCompletedMilestones}
          <Img
            fluid={fluid}
            style={{
              clipPath: `polygon(0 0, 100% 0, 100% ${progressTowardsNextMilestone}%, 0 ${progressTowardsNextMilestone}%  )`,
              height: 100,
              width: 100,
            }}
          />
        </aside>
      );
    }}
  />
);

export default ProgressIndicator;
