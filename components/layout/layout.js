import { useState } from "react";
import Header from "./header";
import Footer from "./footer";
import Cart from "../cart/index";
import CartProvider from "../../store/cart-provider";

const Layout = (props) => {
  const [cartIsShown, setCartIsShown] = useState(false);

  const showCartHandler = () => {
    setCartIsShown(true);
  };

  const hideCartHandler = () => {
    setCartIsShown(false);
  };

  return (
    <>
      <CartProvider>
        {cartIsShown && <Cart onClose={hideCartHandler} />}
        <div className="flex flex-col h-screen">
        <Header onShowCart={showCartHandler} />
        <main>{props.children}</main>
        <Footer />
        </div>
      </CartProvider>
    </>
  );
};

export default Layout;
