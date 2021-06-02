import React from "react";
import "../App.css";
import { useCountUp } from "react-countup";

const CountUpPurchases = React.memo((props) => {
  const { num } = props;
  const { countUp } = useCountUp({
    props,
    duration: 4,
    end: num,
    prefix: "$",
    separator: ",",
  });

  return <span>{countUp}</span>;
});

export default CountUpPurchases;
