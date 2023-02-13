import React, { useEffect, useState } from "react";
import { CountdownCircleTimer } from "react-countdown-circle-timer";
import lock from "../../assets/images/lock.jpg";
import "./Timer.scss";

const AnswerVideo = (props) => {
  console.log("리렌더링!!!", props.showAnswer);
  const myNickname = props.myNickname;
  const answerWord = props.answerWord;
  const answerApi = props.answerApi;
  const presenter = props.presenter;
  const showAnswer = props.showAnswer;

  const renderTime = ({ remainingTime }) => {
    if (remainingTime === 0) {
      return <div className="timer">{answerWord}</div>;
    }

    return (
      <div className="timer">
        <div className="value">{remainingTime}</div>
      </div>
    );
  };

  useEffect(() => {
    if (!showAnswer) {
      setTimeout(() => {
        props.whoGetScore("");
      }, 5000);
    }
  }, []);

  const check =
    presenter === myNickname ? "내가 출제자야" : `다음 출제자: ${presenter}`;
  return (
    <div>
      <div className="timer-wrapper">
        <CountdownCircleTimer
          isPlaying
          duration={5}
          colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
          onComplete={() => ({ shouldRepeat: true, delay: 5 })}
        >
          {renderTime}
        </CountdownCircleTimer>
      </div>
      <div className="box">
        {props.showAnswer || presenter === myNickname ? (
          <div className="box">
            <video autoPlay loop>
              <source src={answerApi}></source>
            </video>
          </div>
        ) : (
          <div className="box">
            <img className="box" src={lock}></img>
          </div>
        )}
      </div>
    </div>
  );
};

export default AnswerVideo;
