import { useState, useEffect } from "react";
import "./App.css";

const width = 60;
const height = width * 2;
const thickness = width / 3.5;
const cornersSize = thickness * 0.6;
const strokeSize = thickness * 0.15;
const colonWidth = (9 / 18) * width;

const segments = {
  0: [0, 1, 2, 4, 5, 6],
  1: [2, 5],
  2: [0, 2, 3, 4, 6],
  3: [0, 2, 3, 5, 6],
  4: [1, 2, 3, 5],
  5: [0, 1, 3, 5, 6],
  6: [0, 1, 3, 4, 5, 6],
  7: [0, 2, 5],
  8: [0, 1, 2, 3, 4, 5, 6],
  9: [0, 1, 2, 3, 5, 6],
};

function Clock() {
  const [time, setTime] = useState(new Date());
  const [digitNumbers, setDigitNumbers] = useState([0, 0, 0, 0, 0, 0]);
  useEffect(() => {
    const interval = setInterval(() => {
      setTime(new Date());
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [setTime]);
  useEffect(() => {
    const hours = time.getHours().toString().padStart(2, "0");
    const minutes = time.getMinutes().toString().padStart(2, "0");
    const seconds = time.getSeconds().toString().padStart(2, "0");
    setDigitNumbers([
      parseInt(hours[0]),
      parseInt(hours[1]),
      parseInt(minutes[0]),
      parseInt(minutes[1]),
      parseInt(seconds[0]),
      parseInt(seconds[1]),
    ]);
  }, [time, setDigitNumbers]);
  return (
    <div className="outline">
      <div className="frame">
        <div className="clock">
          <LCDDigit number={digitNumbers[0]} />
          <LCDDigit number={digitNumbers[1]} />
          <Colon />
          <LCDDigit number={digitNumbers[2]} />
          <LCDDigit number={digitNumbers[3]} />
          <Colon />
          <LCDDigit number={digitNumbers[4]} />
          <LCDDigit number={digitNumbers[5]} />
        </div>
      </div>
    </div>
  );
}
function LCDDigit({ number }) {
  // makes accessing the segments easier
  const segmentMap = segments[number].reduce((acc, cur) => {
    acc[cur] = true;
    return acc;
  }, {});
  return (
    <svg
      fill="#ffffff"
      viewBox={`0 0 ${width} ${height}`}
      transform="translate(-5,0) skewX(-5)"
    >
      <defs>
        <filter id="inset-shadow">
          <feOffset dx="5" dy="5" />
          <feGaussianBlur stdDeviation="3" result="offset-blur" />
          <feComposite
            operator="out"
            in="SourceGraphic"
            in2="offset-blur"
            result="inverse"
          />
          <feFlood floodColor="black" floodOpacity="1" result="color" />
          <feComposite operator="in" in="color" in2="inverse" result="shadow" />
          <feComponentTransfer in="shadow" result="shadow">
            <feFuncA type="linear" slope=".75" />
          </feComponentTransfer>
          <feComposite operator="over" in="shadow" in2="SourceGraphic" />
        </filter>
      </defs>
      <LCD0Segment state={segmentMap[0] ? "lit" : "dim"} />
      <LCD1Segment state={segmentMap[1] ? "lit" : "dim"} />
      <LCD2Segment state={segmentMap[2] ? "lit" : "dim"} />
      <LCD3Segment state={segmentMap[3] ? "lit" : "dim"} />
      <LCD4Segment state={segmentMap[4] ? "lit" : "dim"} />
      <LCD5Segment state={segmentMap[5] ? "lit" : "dim"} />
      <LCD6Segment state={segmentMap[6] ? "lit" : "dim"} />
    </svg>
  );
}
LCDDigit.propTypes = {
  number: Number,
};
function LCD0Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M${cornersSize / 2} ${cornersSize / 2} L${cornersSize} 0 L${
          width - cornersSize
        } 0 L${width - cornersSize / 2} ${cornersSize / 2} L${
          width - thickness
        } ${thickness} L${thickness} ${thickness} L${cornersSize / 2} ${
          cornersSize / 2
        } Z`}
      />
    </>
  );
}
LCD0Segment.propTypes = {
  state: String,
};
function LCD1Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M0 ${cornersSize} L${cornersSize / 2} ${
          cornersSize / 2
        } L${thickness} ${thickness} L${thickness} ${
          height / 2 - thickness / 2
        } L${thickness / 2} ${height / 2} L0 ${
          height / 2 - thickness / 2
        } L0 ${cornersSize} Z`}
      />
    </>
  );
}
LCD1Segment.propTypes = {
  state: String,
};
function LCD2Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M${width - thickness} ${thickness} L${width - cornersSize / 2} ${
          cornersSize / 2
        } L${width} ${cornersSize} L${width} ${height / 2 - thickness / 2} L${
          width - thickness / 2
        } ${height / 2} L${width - thickness / 2} ${height / 2} L${
          width - thickness
        } ${height / 2 - thickness / 2} L${width - thickness} ${thickness} Z`}
      />
    </>
  );
}
LCD2Segment.propTypes = {
  state: String,
};
function LCD3Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M${thickness} ${height / 2 - thickness / 2} L${width - thickness} ${
          height / 2 - thickness / 2
        } L${width - thickness / 2} ${height / 2} L${width - thickness} ${
          height / 2 + thickness / 2
        } L${thickness} ${height / 2 + thickness / 2} L${thickness / 2} ${
          height / 2
        } L${thickness} ${height / 2 - thickness / 2} Z`}
      />
    </>
  );
}
LCD3Segment.propTypes = {
  state: String,
};
function LCD4Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M0 ${height / 2 + thickness / 2} L${thickness / 2} ${
          height / 2
        } L${thickness} ${height / 2 + thickness / 2}  L${thickness} ${
          height - thickness
        } L${cornersSize / 2} ${height - cornersSize / 2} L0 ${
          height - cornersSize
        } Z`}
      />
    </>
  );
}
LCD4Segment.propTypes = {
  state: String,
};
function LCD5Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M${width - thickness} ${height / 2 + thickness / 2} L${
          width - thickness / 2
        } ${height / 2} L${width} ${height / 2 + thickness / 2} L${width} ${
          height - cornersSize
        } L${width - cornersSize / 2} ${height - cornersSize / 2} L${
          width - thickness
        } ${height - thickness} L${width - thickness} ${
          height / 2 + thickness / 2
        } Z`}
      />
    </>
  );
}
LCD5Segment.propTypes = {
  state: String,
};
function LCD6Segment({ state }) {
  return (
    <>
      <path
        className={state}
        filter="url(#inset-shadow)"
        strokeWidth={strokeSize}
        d={`M${cornersSize / 2} ${height - cornersSize / 2} L${thickness} ${
          height - thickness
        } L${width - thickness} ${height - thickness} L${
          width - cornersSize / 2
        } ${height - cornersSize / 2} L${
          width - cornersSize
        } ${height} L${cornersSize} ${height} L${cornersSize / 2} ${
          height - cornersSize / 2
        } Z`}
      />
    </>
  );
}
LCD6Segment.propTypes = {
  state: String,
};
function Colon() {
  return (
    <svg
      fill="#ffffff"
      viewBox={`0 0 ${colonWidth} ${height}`}
      transform="translate(-5,0) skewX(-5)"
    >
      <circle
        filter="url(#inset-shadow)"
        cx={colonWidth / 2}
        cy={(height * 1) / 3.5}
        r={thickness * 0.65}
      />
      <circle
        filter="url(#inset-shadow)"
        cx={colonWidth / 2}
        cy={(height * 2.5) / 3.5}
        r={thickness * 0.65}
      />
    </svg>
  );
}

function App() {
  return <Clock />;
}
export default App;
