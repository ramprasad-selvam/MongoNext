import React, { useState } from 'react'
import md5 from 'md5';
import Link from 'next/link';
import Head from 'next/head';
import { useRouter } from 'next/router'

export default function App({ data }) {
    const router = useRouter();

    let [email, setEmail] = useState('');
    let [emailError, setEmailError] = useState('');
    let [pass, setPass] = useState('');
    let [passError, setPassError] = useState('');

    const validate = () => {
        let reg = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        if (email && reg.test(String(email).toLowerCase())) {
            setEmailError('');
        } else {
            setEmailError('Invalid email');
            return;
        }
        if (pass && pass.trim()) {
            setPassError('');
        } else {
            setPassError('Invalid password');
            return;
        }
        submit();
    }
    const submit = async () => {
        let body = {
            name: email,
            pass: md5(pass)
        }
        let res = await fetch('http://localhost:3000/api/signin', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(body)
        })
        let data = await res.json()
        if (data && data.length) {
            if(data[0].root){
                router.push(`/screens/Admin?_id=${data[0]._id}`)
            } else {
                router.push(`/screens/User?_id=${data[0]._id}`)
            }
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
                <div className="row col-sm-12 m-0">
                    <div className="col-sm-2" />
                    <div className="col-sm-8 mt-5">
                        <h3>Welcome Home,</h3>
                        <div className="form-group mt-3">
                            <label for="exampleInputEmail1" className='pb-1'>Email address</label>
                            <input type="email" className={`form-control shadow-none ${emailError ? 'border border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email} />
                            {emailError ?
                                <small id="emailHelp" className="form-text text-danger pt-1">{emailError}</small>
                                : <small id="emailHelp" className="form-text text-muted pt-1">We'll never share your email with anyone else.</small>}
                        </div>
                        <div className="form-group mt-3">
                            <label for="exampleInputPassword1" className='pb-1'>Password</label>
                            <input type="password" className={`form-control shadow-none ${passError ? 'border border-danger' : ''}`} id="exampleInputPassword1" placeholder="Password" onChange={e => setPass(e.target.value)} value={pass} />
                            {passError ?
                                <small id="emailHelp" className="form-text text-danger pt-1">{passError}</small>
                                : null}
                        </div>
                        <div className="mt-3 d-grid gap-2 mb-1">
                            <button className="btn btn-primary bg-dark" type="button" onClick={validate}>Submit</button>
                        </div>
                        <p>Create new account? Click <Link href="/screens/Signup" className="text-danger">here!</Link></p>
                    </div>
                    <div className="col-sm-2" />
                </div>
            </main>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </React.Fragment>
    )
}
