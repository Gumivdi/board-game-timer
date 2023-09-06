import { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { IPlayer, toggleTimer, update } from "../../store/playersSlice";
import "./Timer.css";
import classNames from "classnames";

type TimerType = {
  player: IPlayer;
};

export const Timer = ({ player }: TimerType) => {
  const [time, setTime] = useState(player.timer);
  const dispatch = useDispatch();

  useEffect(() => {
    let timerInterval = 0;

    if (player.active) {
      timerInterval = setInterval(() => {
        setTime((prevTime) => {
          let newSeconds = prevTime.seconds + 1;
          let newMinutes = prevTime.minutes;
          let newHours = prevTime.hours;

          if (newSeconds === 60) {
            newSeconds = 0;
            newMinutes += 1;
          }
          if (newMinutes === 60) {
            newMinutes = 0;
            newHours += 1;
          }

          dispatch(
            update({
              id: player.id,
              data: {
                key: "timer",
                value: {
                  hours: newHours,
                  minutes: newMinutes,
                  seconds: newSeconds,
                },
              },
            })
          );
          return { hours: newHours, minutes: newMinutes, seconds: newSeconds };
        });
      }, 1000);
    } else {
      clearInterval(timerInterval);
    }

    return () => clearInterval(timerInterval);
  }, [dispatch, player.active, player.id, player.name]);

  return (
    <button
      className={classNames({
        player: true,
        active: player.active,
      })}
      style={{
        background: `radial-gradient(${player.color}, black)`,
      }}
      onClick={() => dispatch(toggleTimer(player.id))}
    >
      {player.name}
      <span>
        {String(time.hours).padStart(2, "0")}:
        {String(time.minutes).padStart(2, "0")}:
        {String(time.seconds).padStart(2, "0")}
      </span>
    </button>
  );
};

export default Timer;
