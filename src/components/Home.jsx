import React, { useState } from "react";
import Cardsdata from "./CardData";
import "./HomeStyle.css";
import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { addToCart } from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";
import toast from "react-hot-toast";
import Dropdown from "react-bootstrap/Dropdown";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faUtensils,
  faMagnifyingGlass,
} from "@fortawesome/free-solid-svg-icons";
import { useEffect } from "react";

const Home = () => {
  const dispatch = useDispatch();
  const [CardData, setCardData] = useState(Cardsdata);
  const [ratingFilter, setRatingFilter] = useState("All");
  const [priceFilter, setPriceFilter] = useState("All");
  const [sortBy, setSortBy] = useState("default");

  const [priceSort, setPriceSort] = useState("none");
  const [ratingSort, setRatingSort] = useState("none");

  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 6;

  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  const handleAddToCart = (e) => {
    console.log("first", e);
    dispatch(addToCart(e));
    toast.success("Item Added In Your Cart");
  };
  ///////////////////////////////////////////////////////

  //*******Filter Logic and Sort Logic==>>**********//

  const filteredData = CardData.filter((item) => {
    const ratingPass =
      ratingFilter === "All" ||
      parseFloat(item.rating) >= parseFloat(ratingFilter);
    const pricePass =
      priceFilter === "All" ||
      (priceFilter === "below100" && item.price < 100) ||
      (priceFilter === "100to200" && item.price >= 100 && item.price <= 200) ||
      (priceFilter === "above200" && item.price > 200);

    const searchPass = item.dish
      .toLowerCase()
      .includes(searchTerm.toLowerCase());

    return ratingPass && pricePass && searchPass;
  }).sort((a, b) => {
    if (sortBy === "ratingHigh") {
      return parseFloat(b.rating) - parseFloat(a.rating);
    } else if (sortBy === "ratingLow") {
      return parseFloat(a.rating) - parseFloat(b.rating);
    } else if (sortBy === "priceHigh") {
      return b.price - a.price;
    } else if (sortBy === "priceLow") {
      return a.price - b.price;
    } else {
      return 0; // default - no sorting
    }
  });
  ///////////////////////////////////////////////////////////////
  //Pagination // Total pages
  // const totalPages = Math.ceil(filteredData.length / itemsPerPage); // Get current items forthe page
  // const startIndex = (currentPage - 1) * itemsPerPage;
  // const endIndex = startIndex + itemsPerPage;
  // const currentItems = filteredData.slice(startIndex, endIndex);

  ////////////////////////////////

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const adjustedPage = Math.min(currentPage, totalPages || 1); // Ensure page is in range
  const startIndex = (adjustedPage - 1) * itemsPerPage;
  const endIndex = startIndex + itemsPerPage;
  const currentItems = filteredData.slice(startIndex, endIndex);

  const handleReset = () => {
    console.log("Reset clicked");
    setRatingFilter("All");
    setPriceFilter("All");
    setSortBy("default");
    setCurrentPage(1);
    setSearchTerm("");
  };

  ////////////////////////////////////////////////
  return (
    <>
      <section className="item_section mt-4 container">
        <h2 className="restaurant-title px-4">
          Jagdish Jena Restaurant <FontAwesomeIcon icon={faUtensils} />
        </h2>

        {/* ////////////////////////////////////////////////////////////////// */}
        {/* Search Functionality */}
        <div className="d-flex justify-content-center mt-3 mb-4">
          <div className="position-relative w-50">
            <input
              type="text"
              className="form-control rounded-pill ps-4 pe-5 search-input"
              placeholder="Search your favorite item"
              value={searchTerm}
              onChange={(e) => {
                setSearchTerm(e.target.value);
                setCurrentPage(1);
              }}
              style={{ height: "45px" }}
            />

            <span
              className="position-absolute"
              style={{
                top: "50%",
                right: "15px",
                transform: "translateY(-50%)",
                color: "#999",
                pointerEvents: "none",
              }}
            >
              <FontAwesomeIcon icon={faMagnifyingGlass} />
            </span>
          </div>
        </div>

        {/* /////////////////////////////////////////////// */}
        {/* Dropdown Filters */}
        <div className="d-flex justify-content-between align-items-center mb-4">
          <div className="d-flex gap-3">
            {/* Rating Filter Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-rating">
                {ratingFilter === "All"
                  ? "Filter by Rating"
                  : `Rating: ${ratingFilter}+`}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRatingFilter("All")}>
                  All Ratings
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRatingFilter("4.5")}>
                  4.5 & above
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRatingFilter("4.0")}>
                  4.0 & above
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRatingFilter("3.5")}>
                  3.5 & above
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>

            {/* Price Filter Dropdown */}
            <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-price">
                {priceFilter === "All"
                  ? "Filter by Price"
                  : priceFilter === "below100"
                  ? "Below ₹100"
                  : priceFilter === "100to200"
                  ? "₹100 - ₹200"
                  : "Above ₹200"}
              </Dropdown.Toggle>
              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setPriceFilter("All")}>
                  All Prices
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceFilter("below100")}>
                  Below ₹100
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceFilter("100to200")}>
                  ₹100 - ₹200
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceFilter("above200")}>
                  Above ₹200
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </div>

          {/* Sort By Dropdown on right */}
          <Dropdown>
            <Dropdown.Toggle variant="secondary" id="dropdown-sort">
              {sortBy === "default"
                ? "Sort By"
                : sortBy === "ratingHigh"
                ? "Rating: High to Low"
                : sortBy === "ratingLow"
                ? "Rating: Low to High"
                : sortBy === "priceHigh"
                ? "Price: High to Low"
                : "Price: Low to High"}
            </Dropdown.Toggle>

            <Dropdown.Menu>
              <Dropdown.Item onClick={() => setSortBy("default")}>
                Default
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("ratingHigh")}>
                Rating: High to Low
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("ratingLow")}>
                Rating: Low to High
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("priceHigh")}>
                Price: High to Low
              </Dropdown.Item>
              <Dropdown.Item onClick={() => setSortBy("priceLow")}>
                Price: Low to High
              </Dropdown.Item>
            </Dropdown.Menu>
          </Dropdown>
        </div>

        {/* ////////////////////////////////////////////////////////// */}
        {/* Price Sort Dropdown */}
        {/* <div className="container mb-4">
          <div className="d-flex justify-content-between"> */}
        {/* Sort by Price Dropdown */}
        {/* <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-price-sort">
                {priceSort === "none"
                  ? "Sort Price"
                  : priceSort === "asc"
                  ? "Price: Low to High"
                  : "Price: High to Low"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setPriceSort("none")}>
                  None
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceSort("asc")}>
                  Price: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setPriceSort("desc")}>
                  Price: High to Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
        {/* Sort by Rating Dropdown */}
        {/* <Dropdown>
              <Dropdown.Toggle variant="secondary" id="dropdown-rating-sort">
                {ratingSort === "none"
                  ? "Sort Rating"
                  : ratingSort === "asc"
                  ? "Rating: Low to High"
                  : "Rating: High to Low"}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={() => setRatingSort("none")}>
                  None
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRatingSort("asc")}>
                  Rating: Low to High
                </Dropdown.Item>
                <Dropdown.Item onClick={() => setRatingSort("desc")}>
                  Rating: High to Low
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown> */}
        {/* </div>
        </div> */}
        {/* ////////////////////////////////////////// */}
        {/* Product Cards */}
        {/* search when no item found */}
        <div className="row mt-2 d-flex justify-content-around align-center">
          {currentItems.length < 1 ? (
            <div style={{ textAlign: "center" }}>
              <p style={{ color: "red", fontSize: "24px" }}>No item Found</p>
              <Button onClick={handleReset} variant="danger">
                Continue Shopping
              </Button>
            </div>
          ) : (
            currentItems.map((element, index) => {
              return (
                <>
                  <Card
                    style={{ width: "22rem", border: "none" }}
                    className="hove mb-4"
                  >
                    <Card.Img
                      varient="top"
                      className="cd"
                      src={element.imgdata}
                    />
                    <div className="card_body">
                      <div className="upper_data d-flex justify-content-between align-item-center">
                        <h4 className="mt-2">{element.dish}</h4>
                        <span>{element.rating}</span>
                      </div>

                      <div className="lower_data d-flex justify-content-between">
                        <h5>{element.address}</h5>
                        <span>Rs {element.price}</span>
                      </div>
                      <div className="extra"></div>

                      <div className="last_data d-flex justify-content-between align-item-center ">
                        <img
                          src={element.arrimg}
                          className="limg"
                          alt=""
                          style={{
                            width: "20px",
                            height: "20px",
                            marginTop: "15px",
                          }}
                        />
                        <Button
                          variant="danger"
                          style={{ width: "150px", border: "none" }}
                          className="mt-2 mb-2"
                          onClick={() => handleAddToCart(element)}
                        >
                          Add To Cart
                        </Button>
                        <img
                          src={element.delimg}
                          className="laimg"
                          alt=""
                          style={{ margin: "10px 10px" }}
                        />
                      </div>
                    </div>
                  </Card>
                </>
              );
            })
          )}
          {/* ////Pagination UI//// */}

          <div className="d-flex justify-content-center mt-4 mb-4 ">
            <Button
              variant="outline-secondary"
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              disabled={adjustedPage === 1}
              className="mx-1"
            >
              Prev
            </Button>

            {[...Array(totalPages)].map((_, index) => (
              <Button
                key={index}
                variant={adjustedPage === index + 1 ? "dark" : "outline-dark"}
                onClick={() => setCurrentPage(index + 1)}
                className="mx-1"
              >
                {index + 1}
              </Button>
            ))}

            <Button
              variant="outline-secondary"
              onClick={() =>
                setCurrentPage((prev) => Math.min(prev + 1, totalPages))
              }
              disabled={adjustedPage === totalPages}
              className="mx-1"
            >
              Next
            </Button>
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
