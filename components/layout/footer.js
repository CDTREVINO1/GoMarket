import Link from "next/link";

const Footer = () => {
  return (
    <footer>
      <ul>
        <li>
          <Link href="/resources">Resources</Link>
          <Link href="/legal">Legal</Link>
          <Link href="/privacy">Privacy Policy</Link>
          <Link href="/terms">Terms &amp; Conditions</Link>
        </li>
      </ul>
    </footer>
  );
};

export default Footer;
