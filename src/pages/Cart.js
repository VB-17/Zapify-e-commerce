import Navbar from "../components/Navbar";
import OrderSummary from "../components/OrderSummary";
import Loader from "../components/Loader";
import CartItem from "../components/CartItem";
import useCart from "../hooks/useCart";

function Cart() {
  const { cart, toggle, remove } = useCart();

  return (
    <>
      <Navbar />
      <div className="cart">
        <div className="cart__hero">
          <h1>Shopping Cart</h1>
        </div>
        {cart ? (
          <div className="cartInfo">
            <div className="cartInfo__detail">
              <div className="cartHeader">
                <h2>Your Cart</h2>
                <h2>{cart.length} items</h2>
              </div>
              <hr />
              <div className="cartInfo__items">
                {cart.length === 0 && (
                  <h1 className="empty_cart">Your Cart is Empty</h1>
                )}
                {cart.map((p, idx) => (
                  <div key={idx} className="item">
                    <CartItem
                      {...p}
                      remove={(a, b) => remove(a, b)}
                      toggle={(a, b, c) => toggle(a, b, c)}
                    />
                  </div>
                ))}
              </div>
            </div>
            <div className="cartInfo__orderSummary">
              <OrderSummary cart={cart} />
            </div>
          </div>
        ) : (
          <div className="cart__loader">
            <Loader size={100} />
          </div>
        )}
      </div>
    </>
  );
}

export default Cart;
