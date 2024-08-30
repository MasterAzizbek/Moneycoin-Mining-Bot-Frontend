import React, { useState, useContext, useEffect } from "react";
import DataContext from "../context/context";

function Home() {
  const {
    user,
    blum,
    hour,
    setHour,
    start_farming,
    value,
    setValue,
    check_blum,
    claim_hander,
    ToastContainer,
    first_name,
  } = useContext(DataContext);

  const [minute, setMinute] = useState(0);

  useEffect(() => {
    const decreaseTime = () => {
      setMinute((prevMinute) => {
        let newMinute = prevMinute - 1;
        let newHour = hour;

        if (newMinute < 0) {
          newMinute = 59;
          newHour = newHour - 1;

          if (newHour < 0) {
            newHour = 0;
            newMinute = 0;
          }
        }

        setHour(newHour);
        setValue(newHour * 3.6 * 2);
        return newMinute;
      });
    };

    const intervalId = setInterval(decreaseTime, 60000);

    return () => clearInterval(intervalId);
  }, [hour, setHour]);

  const increaser = () => {
    setValue((prevValue) => {
      const newValue = prevValue + 0.001;
      return newValue >= 57 ? 57 && check_blum() : newValue;
    });
  };

  useEffect(() => {
    const intervalId = setInterval(increaser, 500);

    return () => clearInterval(intervalId);
  }, []);

  const formatNumber = (number) => {
    return new Intl.NumberFormat().format(number);
  };

  return (
    <div className="Home">
      <ToastContainer />
      <img className="coin_img" src={`/coin.png`} alt="Coin" />
      <h4 className="blum_title">{first_name}</h4>
      <div className="amount_box">
        <img src="/ssNSbVRV_400x400.jpg" alt="Amount" />
        <h6 className="amount_title">{formatNumber(blum.count)}</h6>
      </div>
      {hour < 8 && blum.claim == false ? (
        <div className="increaser">
          <div className="increaser_box">
            <div
              className="bg"
              style={{ width: `${(8 - hour) * 12.5}%` }}
            ></div>
            <h6>
              Farming <img src="/money.png" alt="" />
              {value.toFixed(3)}
              <span>{8 - hour}h</span>
            </h6>
          </div>
        </div>
      ) : blum.claim == true ? (
        <button className="start_farming" onClick={() => claim_hander()}>
          Claim
        </button>
      ) : (
        ""
      )}
    </div>
  );
}

export default Home;
