import React from "react";
import { useNavigate } from "react-router-dom";

const P404Layout = () => {
  let goToHome = useNavigate();
  const toHomes = (): void => {
    goToHome("/");
  };
  return (
    <div className="page404">
      <img
        src="https://firebasestorage.googleapis.com/v0/b/project-shop-gundam.appspot.com/o/attachment.jpg?alt=media&token=172bf86c-7f83-40fe-959d-fd5fab22d7b8"
        alt=""
        onClick={toHomes}
        style={{
          width: "100%",
          height: "100vh",
          cursor: "pointer",
        }}
      />
    </div>
  );
};

export default P404Layout;
