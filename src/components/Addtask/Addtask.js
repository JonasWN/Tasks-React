import React, { } from "react";
import "./addtask.scss";
import Plus from '../../core/images/plus.png'

const Addtask = ({ click, display }) => {
  return (
    // <div className={"add-task " + (display ? "none" : "")} onClick={click}>
    //   <p className="add-task__icon">+</p>
    // </div>
    <div className={"add-task " + (display ? "none" : "")} onClick={click}>
      <img src={Plus} alt="plus button" />
    </div>
  );
};

export default Addtask;
