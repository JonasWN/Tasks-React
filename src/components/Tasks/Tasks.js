import React, { useRef, useEffect } from "react";
import "../Task-Item/TodoItem.scss";
import RemoveTask from "../RemoveTask/RemoveTask";
import Checked from "../Checked/Checked";
import clamp from "lodash-es/clamp";
import swap from "lodash-move";
import { useGesture } from "react-with-gesture";
import { useSprings, animated, interpolate } from "react-spring";

const scrollElement = document.querySelector("html")

const fn = (order, down, originalIndex, curIndex, y) => index =>
  down && index === originalIndex
    ? {
      y: curIndex * 61 + y,
      scale: 1.1,
      zIndex: "1",
      shadow: 20,
      immediate: n => n === "y" || n === "zIndex"
    }
    : {
      y: order.indexOf(index) * 61,
      scale: 1,
      zIndex: "0",
      shadow: 1,
      immediate: false
    };

const Tasks = ({ task, remove }) => {
  let order = useRef(task.map((_, index) => index));
  const [springs, setSprings] = useSprings(task.length, fn(order.current));

  useEffect(() => {
    order.current = task.map((_, index) => index);
    setSprings(fn(order.current));
    console.log(order.current)
  }, [task, setSprings]);

  const bind = useGesture(({ args: [originalIndex], down, delta: [, y] }) => {
    scrollElement.style.overflow = "hidden";
    const curIndex = order.current.indexOf(originalIndex);
    const curRow = clamp(
      Math.round((curIndex * 100 + y) / 100),
      0,
      order.current.length - 1
    );
    const newOrder = swap(order.current, curIndex, curRow);
    setSprings(fn(newOrder, down, originalIndex, curIndex, y));
    if (!down) {
      order.current = newOrder;
      scrollElement.style.overflow = null;
    }
  });

  return springs.map(({ zIndex, shadow, y, scale }, i) => (
    <animated.li
      {...bind(i)}
      className="task-list__task-item"
      key={task[i].id}
      style={{
        zIndex,
        boxShadow: shadow.interpolate(
          s => `rgba(0, 0, 0, 0.20) 0px 25px 50px -12px`
        ),
        transform: interpolate(
          [y, scale],
          (y, s) => `translate3d(0,${y}px,0) scale(${s})`
        ),
        marginBottom: task.length - 1 ? "15vh" : "0"
      }}
    >
      <Checked index={task[i].id} task={task} taskId={task[i]} />
      <RemoveTask remove={remove} index={task[i].id} />
    </animated.li>
  ));
};

export default Tasks;
