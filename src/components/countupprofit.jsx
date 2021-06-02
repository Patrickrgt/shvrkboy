import React from "react";
import "../App.css";
import { useCountUp } from "react-countup";

const CountUpProfit = React.memo((props) => {
  const { num } = props;
  const { countUp } = useCountUp({
    props,
    duration: 3,
    end: num,
    prefix: "$",
    separator: ",",
  });

  return <span>{countUp}</span>;
});

export default CountUpProfit;
