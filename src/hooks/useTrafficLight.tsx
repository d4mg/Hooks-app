import { useState, useEffect } from "react";

const colors = {
    red: 'bg-red-500 animate-pulse',
    yellow: 'bg-yellow-500 animate-pulse',
    green: 'bg-green-500 animate-pulse',
};

// type TrafficLightColor = 'red' | 'yellow' | 'green'; 
type TrafficLightColor = keyof typeof colors;

export const useTrafficLight = () => {

    
    const [light, setLight] = useState<TrafficLightColor>('red');
    const [countdown, setCountdown] = useState (5);
// Countdown effect
    useEffect(() => {
      if(countdown === 0 ) return;

      
      console.log({ countdown });

      const intervalId = setInterval(() => {
        console.log('SetInterval llamado');
        setCountdown( prev => prev - 1)
      },1000)

      return () => {
        console.log('cleanUp effect');
        clearInterval(intervalId);
      }

    },[countdown]);


    // Change light color effect
    useEffect(() => {
      if( countdown === 0) {
        setCountdown(5);

        if( light === 'red'){
          setLight('green')
          return;
        }

        if( light === 'yellow'){
          setLight('red')
          return;
        }

        if( light === 'green'){
          setLight('yellow')
          return;
        }
        
      }

    },[countdown, light])

    return{
        // Props
        countdown,
        colors,
        light,
        //  Computed
        percentage: (countdown / 5) * 100,
        greenLight:  light === 'green' ? colors.green : 'bg-gray-500',
        yellowLight:  light === 'yellow' ? colors.yellow : 'bg-gray-500',
        redLight:  light === 'red' ? colors.red : 'bg-gray-500',


        // Methods
    }
}