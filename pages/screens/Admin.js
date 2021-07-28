import React, { useState } from 'react'
import Head from 'next/head'

export default function Admin({ list }) {
    let [data, setData] = useState(list);
    const column = [
        '',
        '_id',
        'role',
        'avatar',
        'root',
        'name',
        'email',
        // 'createdAt',
        'edit',
        'delete'
    ];
    const Edit = val => {
        alert(JSON.stringify(val))
    }
    const Delete = val => {
        alert(JSON.stringify(val))
    }
    const content = (col, val, i) => {
        if (!col) {
            return i + 1;
        } else if (col == 'avatar') {
            return <img src={val[col]} style={{ height: 60, width: 60, objectFit: 'contain' }} />;
        } else if (col == 'edit') {
            return <button className="btn btn-primary shadow-none" type="button" onClick={() => Edit(val)}>Edit</button>;
        } else if (col == 'delete') {
            return <button className="btn btn-danger shadow-none" type="button" onClick={() => Delete(val)}>Delete</button>;
        } else if (col == 'root') {
            return val[col] ? 'Yes' : 'no';
        } else {
            return val[col];
        }
    }
    return (
        <React.Fragment>
            <Head>
                <title>MongoNext</title>
                <link rel="icon" href="/favicon.ico" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/css/bootstrap.min.css" rel="stylesheet" integrity="sha384-EVSTQN3/azprG1Anm3QDgpJLIm9Nao0Yz1ztcQTwFspd3yD65VohhpuuCOmLASjC" crossorigin="anonymous"></link>
            </Head>
            <main className="w-100 p-3">
                <table class="table">
                    <thead>
                        <tr>
                            {column.map(ival => {
                                return <th className="text-capitalize">{ival}</th>
                            })}
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((ival, i) => {
                            return (<tr>
                                {column.map(jval => {
                                    return <td>{content(jval, ival, i)}</td>
                                })}
                            </tr>)
                        })}
                    </tbody>
                </table>
            </main>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </React.Fragment>
    )
}
export async function getServerSideProps(context) {
    let res = await fetch('http://localhost:3000/api/crud');
    let list = await res.json();
    return {
        props: { list },
    }
}