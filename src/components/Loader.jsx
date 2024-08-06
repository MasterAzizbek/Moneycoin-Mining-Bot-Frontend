import React, { useState, useContext } from "react";
import DataContext from "../context/context";

function Loader() {
  const { isloading } = useContext(DataContext);
  return (
    <div className={isloading == true ? "Loader" : "Loader active"}>
      <img src="/loader.gif" alt="" />
    </div>
  );
}

export default Loader;
