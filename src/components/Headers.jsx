// import Container from "react-bootstrap/Container";
// import Navbar from "react-bootstrap/Navbar";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
// import { faCartShopping } from "@fortawesome/free-solid-svg-icons";
// import logo4 from "../assets/logo4.png";
// import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";
// const Headers = () => {
//   const navigate = useNavigate();

//   const cart = useSelector((state) => state.allcart.cart);
//   console.log(cart);
//   return (
//     <>
//       <Navbar style={{ height: "60px", background: "black", color: "white" }}>
//         <Container>
//           <img
//             src={logo4}
//             alt="logo"
//             style={{ width: "100px", cursor: "pointer" }}
//             onClick={() => {
//               navigate("/");
//             }}
//           />
//           {/* <h2 className="text-light">Ecommerce</h2> */}
//           <div
//             id="ex4"
//             style={{ cursor: "pointer" }}
//             onClick={() => navigate("/cart")}
//           >
//             <span
//               className="p1 fa-stack fa-2x has-badge "
//               data-count={cart.length}
//             >
//               <FontAwesomeIcon
//                 icon={faCartShopping}
//                 style={{ marginTop: "15px" }}
//               />
//             </span>
//           </div>
//         </Container>
//       </Navbar>
//     </>
//   );
// };

// export default Headers;

import Container from "react-bootstrap/Container";
import Navbar from "react-bootstrap/Navbar";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faMoon,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import logo4 from "../assets/logo4.png";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Headers = () => {
  const navigate = useNavigate();
  const cart = useSelector((state) => state.allcart.cart);

  const [darkMode, setDarkMode] = useState(false);

  // Add or remove dark class to body tag
  useEffect(() => {
    document.body.className = darkMode ? "dark-mode" : "light-mode";
  }, [darkMode]);

  return (
    <>
      <Navbar
        style={{
          height: "60px",
          // background: darkMode ? "#121212" : "black",
          background: darkMode ? "gray" : "black",
          color: "white",
        }}
      >
        <Container>
          <img
            src={logo4}
            alt="logo"
            style={{ width: "100px", cursor: "pointer" }}
            onClick={() => {
              navigate("/");
            }}
          />

          <div className="d-flex align-items-center gap-4">
            {/* Shopping Cart */}
            <div
              id="ex4"
              style={{
                cursor: "pointer",
                minWidth: "40px",
                textAlign: "center",
              }}
              onClick={() => navigate("/cart")}
            >
              <span
                className="p1 fa-stack fa-2x has-badge "
                data-count={cart.length}
              >
                <FontAwesomeIcon
                  icon={faCartShopping}
                  style={{
                    marginTop: "15px",
                    color: "white",
                  }}
                />
              </span>
            </div>

            {/* Dark Mode Toggle */}
            <div
              onClick={() => setDarkMode(!darkMode)}
              style={{
                cursor: "pointer",
                color: "white",
                fontSize: "30px",
                minWidth: "30px", // fixes width so switch doesn't affect layout
                textAlign: "center",
              }}
              title="Toggle Dark Mode"
            >
              <FontAwesomeIcon icon={darkMode ? faSun : faMoon} />
            </div>
          </div>
        </Container>
      </Navbar>
    </>
  );
};

export default Headers;
