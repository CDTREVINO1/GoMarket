import Link from "next/link";

const Header = () => {
  return (
    <header>
      <nav>
        <Link href="/">
          <div>Online Store</div>
        </Link>
        <ul>
          <li>
            <Link href="auth">Login</Link>
          </li>
          <li>
            <Link href="/profile">Profile</Link>
          </li>
          <li>
            <Link href="/products">Products</Link>
          </li>
          <li>Logout</li>
          <li>
            <Link href="/cart">Shopping Cart</Link>
          </li>
        </ul>
      </nav>
    </header>
  );
};

export default Header;
