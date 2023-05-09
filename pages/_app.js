import Head from "next/head";
import "../styles/globals.css";
import Layout from "../components/layout/layout";

function MyApp({ Component, pageProps }) {
  return (
    <Layout className="min-h-full">
      <Head>
        <meta
          name="viewport"
          content="initial-scale=1.0, width=device-width height=device-height"
        />
      </Head>
      <Component {...pageProps} />
    </Layout>
  );
}

export default MyApp;
