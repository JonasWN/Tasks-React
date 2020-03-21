import React, { useState, useEffect } from "react";
import { MdPlaylistAddCheck } from "react-icons/md";
import { MdDeleteSweep } from "react-icons/md";

const Input = props => {
  const [title, setTitle] = useState("");
  const [date, setDate] = useState("");

  const onSubmit = e => {
    e.preventDefault();
    props.addItem(title, date);
    props.click();
    setTitle("");
    setDate("");
  };

  const clear = () => {
    props.click();
    setTitle("");
    setDate("");
  };

  useEffect(() => {
    document.querySelector(".info__heading").focus();
  }, [props.display]);

  const onChange = e => {
    setTitle(e.target.value);
  };

  const handleTime = e => {
    setDate(e.target.value);
  };
  const iconStyle = {
    fontSize: "2rem"
  };
  return (
    <form
      action=""
      className={
        "task-form " + (props.display ? "display slide-in-fwd-center" : "")
      }
    >
      <li className="task-list__task-item">
        <div className="task-item__avatar">
          <MdPlaylistAddCheck className="avatar__icon" onClick={onSubmit} />
        </div>
        <div className="task-item__info">
          <input
            className="info__heading task-form__input"
            placeholder="Task Name"
            onChange={onChange}
            value={title}
          />
          <input
            className="info__time task-form__input time"
            placeholder="Time"
            onChange={handleTime}
            value={date}
          />
        </div>
        <MdDeleteSweep
          className="task-item__alarm"
          style={iconStyle}
          onClick={clear}
        />
      </li>
    </form>
  );
};

export default Input;
