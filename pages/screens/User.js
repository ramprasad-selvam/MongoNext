import React, { useState } from 'react'
import Head from 'next/head'

export default function User({ list }) {
    return (
        <React.Fragment>
            <Head>
                <title>MongoNext</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            </Head>
            <main className="w-100 p-3">
                {JSON.stringify(list)}
            </main>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </React.Fragment>
    )
}
export async function getServerSideProps(context) {
    let userId = '60fec3cad07a8113d5e87bcb';
    let res = await fetch(`http://localhost:3000/api/crud?_id=${userId}`);
    let list = await res.json();
    return {
        props: { list },
    }
}