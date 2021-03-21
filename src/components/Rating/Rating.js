import React from "react";

import { FaStar } from "react-icons/fa";
import { FaStarHalfAlt } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";

function Rating({ rating }) {
  const getStars = (rating) => {
    let [fullStar, emptyStar, halfStar] = [0, 0, 0];

    fullStar = Math.floor(rating);

    if (fullStar === rating) {
      emptyStar = 5 - rating;
    } else {
      halfStar = Math.ceil(rating - fullStar);
      emptyStar = 5 - (fullStar + halfStar);
    }

    return [fullStar, halfStar, emptyStar];
  };

  const [full, half, none] = getStars(rating);

  return (
    <div style={{ display: "flex", margin: "7px 0px" }}>
      {[...Array(full)].map((a, idx) => (
        <FaStar key={idx} style={{ fontSize: "18px" }} />
      ))}

      {half === 0
        ? null
        : [...Array(half)].map((a, idx) => (
            <FaStarHalfAlt key={idx} style={{ fontSize: "18px" }} />
          ))}
      {none === 0
        ? null
        : [...Array(none)].map((a, idx) => (
            <FaRegStar key={idx} style={{ fontSize: "18px" }} />
          ))}
    </div>
  );
}

export default Rating;
