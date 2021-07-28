import React, { useState } from 'react'
import md5 from 'md5';

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
                <p>Already have an account? <a className="text-danger">Login Now</a></p>
            </div>
            <div className="col-sm-2" />
        </div>
    )
}
