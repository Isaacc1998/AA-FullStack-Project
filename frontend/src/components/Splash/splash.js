import React, { useEffect } from "react";
import { useHistory } from "react-router-dom";

function Splash() {
  const history = useHistory();
  useEffect(() => {
    return history.push("/login");
  }, []);
  return <div>Splash</div>;
}

export default Splash;
