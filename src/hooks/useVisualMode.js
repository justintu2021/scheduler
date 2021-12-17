import React from "react";
import { useState } from "react";

const useVisualMode = (initial) => {
  const[mode, setMode] = useState(initial);
  const[history, setHistory] = useState([initial]);
  const transition = (mode, replace = false) => {
    if(replace) {
      setHistory([initial]);
    }
    
    setMode(mode);
    //1.add mode to history array
    setHistory(prev => [...prev, mode]); 
  }
  const back = () => {
    //2. setMode to previouse item of historyArray
    if(history.length > 1) {
      setMode(history[history.length - 2]);
      setHistory(prev => {
        let newHistory = [...prev];
        newHistory.pop();
        return newHistory;
      });
    } else {
      setMode(initial);
      setHistory([initial]);
    }
  
  }
  return ({mode, transition, back});
}

export default  useVisualMode;