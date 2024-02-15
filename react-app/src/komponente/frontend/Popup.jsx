import React from "react";

function Popup(props) {
  return props.trigger ? (
    <div
      className="popup"
      style={{
        position: "fixed",
        top: "0",
        left: "0",
        width: "100%",
        height: "100vh",
        backgroundColor:
          "rgba(0,0,0,0.2)",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <div
        className="popup-inner"
        style={{
          position: "relative",
          padding: "23px",
          width: "100%",
          maxWidth: "640px",
          backgroundColor: "#FFF",
        }}
      >
        <button
          className="close-btn"
          style={{
            position: "absolute",
            top: "16px",
            right: "16px",
          }}
          onClick={() =>
            props.setTrigger(false)
          }
        >
          close
        </button>
        {props.children}
      </div>
    </div>
  ) : (
    ""
  );
}

export default Popup;
