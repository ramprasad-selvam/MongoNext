import React, { useState } from 'react'
import md5 from 'md5';
import Head from 'next/head'
import Link from 'next/link';

export default function Signup({ data }) {
    let [name, setName] = useState('');
    let [nameError, setNameError] = useState('');
    let [email, setEmail] = useState('');
    let [emailError, setEmailError] = useState('');
    let [pass, setPass] = useState('');
    let [passError, setPassError] = useState('');
    let [confirm, setConfirm] = useState('');
    let [confirmError, setConfirmError] = useState('');

    const validate = () => {
        if (name && name.trim()) {
            setNameError('');
        } else {
            setNameError('Invalid name');
            return;
        }
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
        if (confirm && confirm.trim()) {
            setConfirmError('');
        } else {
            setConfirmError('Invalid name');
            return;
        }
        if (confirm === pass) {
            setConfirmError('');
        } else {
            setConfirmError('Password mismatch');
            return;
        }
        checkExsist();
    }
    const checkExsist = async () => {
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
            setEmailError('This Email Already Exsist');
        } else {
            submit();
        }
    }
    const submit = async () => {
        let body = {
            name,
            email,
            pass: md5(pass)
        }
        let res = await fetch('http://localhost:3000/api/crud', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'post',
            body: JSON.stringify(body)
        })
        let data = await res.json()
        if (data) {
            console.log(data.insertedId);
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
            <div className="row col-sm-12 m-0">
                <div className="col-sm-2" />
                <div className="col-sm-8 mt-5">
                    <h3>Welcome Home,</h3>
                    <div className="form-group mt-3">
                        <label for="exampleInputEmail1" className='pb-1'>Name</label>
                        <input type="text" className={`form-control shadow-none ${nameError ? 'border border-danger' : ''}`} id="exampleInputEmail1" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setName(e.target.value)} value={name} />
                        {nameError ?
                            <small id="nameHelp" className="form-text text-danger pt-1">{nameError}</small>
                            : null}
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleInputEmail2" className='pb-1'>Email address</label>
                        <input type="text" className={`form-control shadow-none ${emailError ? 'border border-danger' : ''}`} id="exampleInputEmail2" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email} />
                        {emailError ?
                            <small id="emailError" className="form-text text-danger pt-1">{emailError}</small>
                            : <small id="emailHelp" className="form-text text-muted pt-1">We'll never share your email with anyone else.</small>}
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleInputPassword1" className='pb-1'>Password</label>
                        <input type="password" className={`form-control shadow-none ${passError ? 'border border-danger' : ''}`} id="exampleInputPassword1" placeholder="Password" onChange={e => setPass(e.target.value)} value={pass} />
                        {passError ?
                            <small id="passHelp" className="form-text text-danger pt-1">{passError}</small>
                            : null}
                    </div>
                    <div className="form-group mt-3">
                        <label for="exampleInputPassword2" className='pb-1'>Confirm Password</label>
                        <input type="password" className={`form-control shadow-none ${confirmError ? 'border border-danger' : ''}`} id="exampleInputPassword2" placeholder="Password" onChange={e => setConfirm(e.target.value)} value={confirm} />
                        {confirmError ?
                            <small id="confirmHelp" className="form-text text-danger pt-1">{confirmError}</small>
                            : null}
                    </div>
                    <div className="mt-3 d-grid gap-2 mb-1">
                        <button className="btn btn-primary shadow-none bg-dark" type="button" onClick={validate}>Register</button>
                    </div>
                    <p>Already have an account? <Link href="/screens/App" className="text-danger">Login Now</Link></p>
                </div>
                <div className="col-sm-2" />
            </div>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </React.Fragment>
    )
}
