import React, { useState, useEffect } from "react";
import moment from "moment";
import "./clock.scss";
let midnight = true;

const Clock = ({ reset }) => {
  const [time, setTime] = useState({
    date: moment().format("dd"),
    hour: moment().hour(),
    minut: moment().minute(),
    second: moment().second()
  });

  const checkTime = () => {
    const newTime = {
      date: moment().format("dd"),
      hour: moment().hour(),
      minut: moment().minute(),
      second: moment().second()
    };
    setTime(newTime);

    // if midnight reset task
    if (time.hour === 0 && midnight === true) {
      reset();
      midnight = false;
    }
    if (time.hour === 1) {
      midnight = true;
    }
  };

  useEffect(() => {
    const intervalID = setInterval(checkTime, 1000);
    return () => clearInterval(intervalID);
  }, []);

  return (
    <section className="clock-container">
      <div className="clock-container__time date">{time.date}</div>
      <div className="clock-container__time hour">{time.hour}</div>
      <div className="clock-container__time minut">{time.minut}</div>
      <div className="clock-container__time second">{time.second}</div>
    </section>
  );
};

export default Clock;
