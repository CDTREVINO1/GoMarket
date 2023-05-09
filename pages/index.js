import Head from "next/head";

export default function Home() {
  return (
    <>
      <Head>
        <title>Online Store</title>
        <meta name="description" content="Online Store"></meta>
      </Head>
      <main className="w-full">
        <section className="items-center justify-center">
          <p>Welcome to the Online Store</p>
        </section>
      </main>
    </>
  );
}
