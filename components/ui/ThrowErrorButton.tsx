import React from "react";

interface Props {
  onClick: () => void;
}

const ThrowErrorButton: React.FC<Props> = ({ onClick }) => (
  <button onClick={onClick}>Throw Error</button>
);

export default ThrowErrorButton;
