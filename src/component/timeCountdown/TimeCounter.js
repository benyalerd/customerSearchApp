import { useCountdown } from '../../component/timeCountdown/useCountdown';
import React from 'react';

export const TimeCounter = ({targetDate,onClick}) => {
    const [minutes, seconds] = useCountdown(targetDate);
 
    return (
        <React.Fragment>
        {minutes+seconds <=0?
        <a className="text-title-yellow3" style={{textDecoration: 'underline',cursor:'pointer'}}   onClick={onClick}> Request OTP</a>       
      :
      <div className="show-counter">

         <div className="countdown">
      <a>{minutes}</a>
      <span>mins</span>
    </div>

    <div className="countdown">
      <a>{seconds}</a>
      <span>seconds</span>
    </div>
       
      </div>
      
        }
        </React.Fragment>
    );
  };