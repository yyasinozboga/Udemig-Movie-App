import { View, Text } from "react-native";
import React from "react";
import * as Progress from "react-native-progress";

const Loader = ({ duration }: { duration: number }) => {
  return (
    <Progress.Circle
      progress={duration}
      className="absolute left-1/2 top-1/3 -inset-1"
    />
  );
};

export default Loader;
