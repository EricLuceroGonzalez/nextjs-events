import "../styles/globals.css";
import LayoutComponent from "../components/layout/layout";
import Head from "next/head";

function MyApp({ Component, pageProps }) {
  return (
    <LayoutComponent>
      <Head>
        <title>My Events App</title>
        <meta
          name="description"
          content="Find a lot of events."
        />
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
      <Component {...pageProps} />
    </LayoutComponent>
  );
}

export default MyApp;
