import React from 'react';
import { useScreens } from "react-native-screens";

import Navigation from "./navigation/navigation";

useScreens();

export default function App() {
  return (
    <Navigation />
  );
}
