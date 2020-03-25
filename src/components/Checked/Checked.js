import React, { useState } from "react";
import {
  IoMdCheckmarkCircleOutline
} from "react-icons/io";
import { FaRegCalendarCheck } from "react-icons/fa";
import Lottie from 'react-lottie';
import * as animationData from './checked-white.json'

const Checked = ({ task, index, taskId }) => {
  const [checked, setChecked] = useState(false);

  const defaultOptions = {
    loop: false,
    autoplay: true,
    animationData: animationData.default,
    rendererSettings: {
      preserveAspectRatio: 'xMidYMid slice'
    }
  };

  const onChecked = e => {
    setChecked(!checked);
  };

  const smallIcon = {
    fontSize: "2rem"
  };
  return (
    <React.Fragment>
      <div
        className={"task-item__avatar " + (checked ? "checked" : "")}
        onClick={onChecked}
      >
        {checked ? (
          // <IoMdCheckmarkCircleOutline className="avatar__icon" />
          <Lottie options={defaultOptions}
            height={40}
            width={40}
          />
        ) : (
            <FaRegCalendarCheck className="avatar__icon" style={smallIcon} />
          )}
      </div>
      <div className="task-item__info">
        <h3
          className="info__heading"
          style={{
            textDecoration: checked ? "line-through" : "none"
          }}
        >
          {taskId.title}
        </h3>
        <p className="info__time">{taskId.date}</p>
      </div>
    </React.Fragment>
  );
};
export default Checked;
