import React from "react";

export default function Die(props) {
  const style = {
    backgroundColor: props.isHeld ? "#59E391" : "white",
  };
  return (
    <div
      className="dieSquare"
      style={style}
      onClick={() => {
        props.onHold(props.dieId);
      }}
    >
      {props.value}
    </div>
  );
}
