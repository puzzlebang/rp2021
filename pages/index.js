import Head from 'next/head';

import Landing from '../components/landing';
import Nav from '../components/ui/Nav';
import Footer from '../components/ui/Footer';

export default function Index() {
  return (
    <>
      <Head>
        <title>Reflections Projects 2021</title>
        <link rel="preconnect" href="https://fonts.gstatic.com" />
        <link
          href="https://fonts.googleapis.com/css2?family=Roboto&display=swap"
          rel="stylesheet"
        />
        <link rel="icon" href="/favicon.png" />
      </Head>
      <Nav />
      <Landing />
      <Footer />
    </>
  );
}
