import { useState } from "react";
import { useSelector } from "react-redux";
import "./CartStyle.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCartShopping,
  faTrash,
  faSquareMinus,
  faSquarePlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  addToCart,
  removeFromCart,
  removeSingleItem,
  clearCart,
} from "../redux/features/cartSlice";
import { useDispatch } from "react-redux";

import { useEffect } from "react";
import toast from "react-hot-toast";
import Button from "react-bootstrap/Button";
import { useNavigate } from "react-router-dom";
import { loadStripe } from "@stripe/stripe-js";

const CartDetails = () => {
  const cart = useSelector((state) => state.allcart.cart);
  console.log(cart);

  const navigate = useNavigate();

  const [totalPrice, settotalPrice] = useState(0);
  const [totalItems, setTotalItems] = useState(0);

  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    console.log("first", e);
    dispatch(addToCart(e));
  };

  const handleRemoveFromCart = (e) => {
    dispatch(removeFromCart(e));
    toast.success("Item Removed From Your Cart");
  };

  const handleRemoveSingleItem = (e) => {
    dispatch(removeSingleItem(e));
  };

  const handleClearCart = () => {
    dispatch(clearCart());
    toast.success("Your Cart Is Empty");
  };

  // //count total price:-
  // const item = cart.reduce((acc, curItem) => {
  //   return acc + curItem.price * curItem.qnty;
  // }, 0);

  // settotalPrice(item);

  useEffect(() => {
    const item = cart.reduce((acc, curItem) => {
      return acc + curItem.price * curItem.qnty;
    }, 0);

    settotalPrice(item);
  }, [cart]); // this runs whenever cart is updated

  // ✅ Explanation:
  // useEffect runs after render, so it's safe to update state (settotalPrice).

  // You set the dependency as [cart] so the total is re-calculated every time the cart changes.

  // This fixes potential infinite re-renders or React warnings.

  //   🔁 What Happens If You Set State During Render?
  // React re-renders → state update → re-renders again → infinite loop → 🔥 performance crash or error like:

  // Too many re-renders. React limits the number of renders to prevent an infinite loop.

  //   🧠 Summary:
  // Render phase = running the component function to return JSX.

  // You should not call setState() during this phase.

  // Use useEffect() or event handlers to safely update state.

  //   📌 Real-World Analogy
  // Imagine you’re baking a cake:

  // 🍰 You prepare ingredients and mix them → (Render Phase)

  // 🔥 You bake it in the oven → (React DOM commit)

  // ✅ After baking is done, you decorate it → (useEffect runs now)

  // useEffect() is like decorating the cake after it’s done baking, not during mixing.

  /////////////////////////////

  useEffect(() => {
    const total = cart.reduce((acc, item) => acc + item.qnty, 0);
    setTotalItems(total);
  }, [cart]);
  //////////////////////////////////////////
  //Payment Integration

  const makePayment = async () => {
    const stripe = await loadStripe(
      "pk_test_51Rg5XVIXSwnWaBqB1ogvEO9SPHu8hUnlB4ltK0gedZWUZcAoMuFiP0Rb1Tqgfi59KrpXPNdByPCyrl1waEtqqnOS00vpIfJhKE"
    );

    //carts data added into products

    const body = {
      products: cart,
    };
    const headers = {
      "Content-Type": "application/json",
    };
    const response = await fetch(
      "http://localhost:7000/api/create-checkout-session",
      {
        method: "POST",
        headers: headers,
        body: JSON.stringify(body),
      }
    );

    const session = await response.json();

    const result = stripe.redirectToCheckout({
      sessionId: session.id,
    });

    if (result.error) {
      console.log(result.error);
    }
  };

  ////////////////////////////////////////////////////////////////////////
  // this arr is for checking perpose for cart
  // const arr = [0, 1];8
  return (
    <>
      <div className="row  justify-content-center m-0">
        <div className="col-md-8 mt-5 cardsdetails">
          <div className="card">
            <div className="card-header bg-dark p-3">
              <div className="card-header-flex">
                <h5 className="text-white m-0">
                  Cart Calculation {cart.length > 0 && cart.length}
                </h5>

                {cart.length > 0 ? (
                  <button
                    className="btn btn-danger mt-0"
                    onClick={() => handleClearCart()}
                  >
                    <FontAwesomeIcon icon={faTrash} /> Empty Cart
                  </button>
                ) : (
                  ""
                )}
              </div>
            </div>

            <div className="card-body p-0">
              {cart.length === 0 ? (
                <table className="table cart-table mb-0">
                  <tbody>
                    <tr>
                      <td colSpan={6}>
                        <div className="cart-empty">
                          <FontAwesomeIcon icon={faCartShopping} />
                          <p>Your Cart Is Empty</p>
                          <Button
                            variant="danger"
                            style={{ borderRadius: "10px", marginTop: "10px" }}
                            onClick={() => navigate("/")}
                          >
                            Continue Shopping
                          </Button>
                        </div>
                      </td>
                    </tr>
                    <tr></tr>
                  </tbody>
                </table>
              ) : (
                <table className="table cart-table mb-0 table-responsive-sm">
                  <thead>
                    <tr>
                      <th>Action</th>
                      <th>Product</th>
                      <th>Name</th>
                      <th>Price</th>
                      <th class="  text-center ">Qty</th>
                      <th className="text-right">
                        <span id="amount" className="amount">
                          Total Amount
                        </span>
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {cart.map((data) => {
                      return (
                        <tr key={data.id}>
                          <td>
                            <button
                              className="prdct-delete"
                              onClick={() => handleRemoveFromCart(data.id)}
                            >
                              <FontAwesomeIcon icon={faTrash} />
                            </button>
                          </td>
                          <td>
                            <div className="product-img">
                              <img src={data.imgdata} alt="" />
                            </div>
                          </td>
                          <td>
                            <div className="product-name">
                              <p>{data.dish}</p>
                            </div>
                          </td>
                          <td>Rs {data.price}</td>
                          <td>
                            <div class="d-flex align-items-center justify-content-center gap-1">
                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={
                                  data.qnty <= 1
                                    ? () => handleRemoveFromCart(data.id)
                                    : () => handleRemoveSingleItem(data)
                                }
                              >
                                <FontAwesomeIcon icon={faSquareMinus} />
                              </button>
                              <input
                                type="text"
                                className="qty-input-box"
                                value={data.qnty}
                                disabled
                                name=""
                                id=""
                              />

                              <button
                                className="prdct-qty-btn"
                                type="button"
                                onClick={() => handleAddToCart(data)}
                              >
                                <FontAwesomeIcon icon={faSquarePlus} />
                              </button>
                            </div>
                          </td>
                          <td className="text-right">
                            {data.qnty * data.price}
                          </td>
                        </tr>
                      );
                    })}
                  </tbody>
                  <tfoot>
                    <tr>
                      <th> &nbsp;</th>
                      <th colspan={2}>&nbsp;</th>
                      <th>
                        Item In Cart <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">{totalItems}</span>
                      </th>
                      <th className="text-right">
                        Total Price <span className="ml-2 mr-2">:</span>
                        <span className="text-danger">Rs {totalPrice}</span>
                      </th>

                      <th className="text-right">
                        <button
                          className="btn btn-success"
                          type="button"
                          onClick={makePayment}
                        >
                          Checkout
                        </button>
                      </th>
                    </tr>
                  </tfoot>
                </table>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CartDetails;
