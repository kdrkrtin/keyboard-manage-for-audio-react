import { useEffect, useContext } from "react";
import Context from "../context";

const Header = () => {
  const { authToken } = useContext(Context);
  useEffect(() => {
    const mode = localStorage.getItem("mode");
    if (mode === "dark") {
      document.body.classList.add("dark");
      document.getElementById("mode-check").checked = true;
    }
  }, []);

  const modeControl = () => {
    document.body.classList.toggle("dark");
    if (document.body.classList.value.includes("dark")) {
      localStorage.setItem("mode", "dark");
    } else {
      localStorage.setItem("mode", "light");
    }
  };

  return (
    <>
      {authToken && (
        <div className="header">
          <h1>Hayal Meal Sahne Ses</h1>
        </div>
      )}
      <div className="theme d-flex justify-content-end p-3">
        <input type="checkbox" id="mode-check" onChange={modeControl} />
        <label htmlFor="mode-check" className="label">
          <i className="fas fa-moon"></i>
          <i className="fas fa-sun"></i>
          <div className="ball"></div>
        </label>
      </div>
    </>
  );
};

export default Header;
