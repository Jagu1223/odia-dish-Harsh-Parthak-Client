import React from "react";
import payment from "../assets/payment1.png";
import "./SuccessStyle.css";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";

const Success = () => {
  const navigate = useNavigate();
  return (
    <>
      <div className="success">
        <div>
          <img
            src={payment}
            alt="payment success"
            style={{ width: "500px", height: "400px" }}
          />
        </div>
        <Button variant="danger" onClick={() => navigate("/")}>
          Go to home page
        </Button>
      </div>
    </>
  );
};

export default Success;
