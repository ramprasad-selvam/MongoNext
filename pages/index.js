import React from 'react';
import Head from 'next/head'
import { MongoClient } from 'mongodb';
import Link from 'next/link';
export default function Home({ isConnected }) {
  return (
    <React.Fragment>
      <Head>
        <title>MongoNext</title>
        <link rel="icon" href="/favicon.ico" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
      </Head>
      <main>
        Mongodb {isConnected ? '' : 'Not'} Connected
        <br />
        <Link href="/screens/Admin">
          Admin
        </Link>
        <br />
        <Link href="/screens/Signup">
          Signup
        </Link>
        <br />
        <Link href="/screens/User">
          User
        </Link>
        <br />
        <Link href="/screens/App">
          App
        </Link>

      </main>
      <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
      <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
    </React.Fragment>
  )
}

export async function getServerSideProps(context) {
  let uri = process.env.MONGODB_URI;
  let client = new MongoClient(uri);
  if (!client.isConnected()) await client.connect();
  let isConnected = client.isConnected();
  return {
    props: { isConnected },
  }
}
