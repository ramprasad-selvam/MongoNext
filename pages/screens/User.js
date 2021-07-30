import React, { useState } from 'react'
import Head from 'next/head'
import Link from 'next/link';
import md5 from 'md5';

export default function User({ list, id }) {
    let [name, setName] = useState(list[0].name);
    let [nameError, setNameError] = useState();
    let [pass, setPass] = useState('');
    let [pic, setPic] = useState(list[0].avatar);
    let [cpass, setCpass] = useState('');
    let [cpassError, setCpassError] = useState('');
    let [reqSuccess, setReqSuccess] = useState(false);
    let [reqError, setReqError] = useState(false);
    
    const validate = async () => {
        if (name && name.trim()) {
            setNameError('')
        } else {
            setNameError('Invalid Name');
            return;
        }
        if (cpass === pass) {
            setCpassError('')
        } else {
            setCpassError('Confirm password not matching');
            return;
        }
        submit();
    }
    const submit = async () => {
        let body = { ...list[0] };
        body.name = name;
        body.avatar = pic;
        if (pass) {
            body.password = md5(pass);
        }
        let res = await fetch('http://localhost:3000/api/crud', {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(body)
        })
        let data = await res.json()
        if(data){
            setReqSuccess(true);
        } else {
            setReqError(true)
        }
        setTimeout(() => {
            setReqSuccess(false);
            setReqError(false);
        }, 2500);
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
                <div className="row col-12">
                    <div className="col-sm-10" />
                    <div className="col-sm-2">
                        <div className="dropdown">
                            <a className="text-decoration-none text-dark" href="javascript:void(0)" role="button" id="dropdownMenuLink" data-bs-toggle="dropdown" aria-expanded="false">
                            <img className="mx-2" src={pic} style={{ width: 50, height: 50, objectFit: 'contain', borderRadius: 25 }} />
                                {name}
                            </a>
                            <ul className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                                <li><a className="dropdown-item" href="javascript:void(0)" onClick={() => { }}>Profile</a></li>
                                <li><Link href="/screens/App"><a className="dropdown-item" href="javascript:void(0)">Logout</a></Link></li>
                            </ul>
                        </div>
                    </div>
                </div>
                <div className="row col-sm-12 m-0">
                    <div className="col-sm-2" />
                    <div className="col-sm-8 mt-5">
                    {reqSuccess ? <div className="alert alert-success" role="alert">
                                        User data updated.
                            </div> : null}
                                    {reqError ? <div className="alert alert-danger" role="alert">
                                        Something went wrong.
                            </div> : null}
                        <h3>User Profile,</h3>
                        <div className="form-group mt-3 text-center">
                            <label for="image">
                                <input type="file" name="image" id="image" style={{ display: 'none' }} accept="image/*" onChange={e => {
                                    let reader = new FileReader();
                                    reader.onload = (e) => {
                                        let image = e.target.result;
                                        setPic(image)
                                    };
                                    reader.readAsDataURL(e.target.files[0]);
                                }} />
                                <img src={pic} style={{ width: 200, height: 200, objectFit: 'contain', borderRadius: 100 }} data-toggle="tooltip" data-placement="right" title="Change Image" />
                            </label>
                        </div>
                        <div className="form-group mt-3">
                            <label for="name1" className='pb-1'>Name</label>
                            <input type="email" className={`form-control shadow-none ${nameError ? 'border border-danger' : ''}`} id="name1" placeholder="Enter name" value={name} onChange={e => setName(e.target.value)} />
                            {nameError ?
                                <small className="form-text text-danger pt-1">{nameError}</small>
                                : null}
                        </div>
                        <div className="form-group mt-3">
                            <label for="email1" className='pb-1'>Email</label>
                            <input type="email" className={`form-control shadow-none`} id="email1" placeholder="Enter email" value={list[0].email} disabled />
                        </div>
                        <div className="form-group mt-3">
                            <label for="pass1" className='pb-1'>New Password</label>
                            <input type="password" className={`form-control shadow-none`} id="pass1" placeholder="Password" value={pass} onChange={e => setPass(e.target.value)} />
                        </div>
                        <div className="form-group mt-3">
                            <label for="pass2" className='pb-1'>Confirm New Password</label>
                            <input type="password" className={`form-control shadow-none ${cpassError ? 'border border-danger' : ''}`} id="pass2" placeholder="Password" value={cpass} onChange={e => setCpass(e.target.value)} />
                            {cpassError ?
                                <small className="form-text text-danger pt-1">{cpassError}</small>
                                : null}
                        </div>
                        <div className="mt-4 d-grid gap-2 mb-1">
                            <button className="btn btn-primary bg-dark" type="button" onClick={validate}>Submit</button>
                        </div>
                    </div>
                    <div className="col-sm-2" />
                </div>
            </main>
            <script src="https://cdn.jsdelivr.net/npm/@popperjs/core@2.9.2/dist/umd/popper.min.js" integrity="sha384-IQsoLXl5PILFhosVNubq5LC7Qb9DXgDA9i+tQ8Zj3iwWAwPtgFTxbJ8NT4GN1R8p" crossorigin="anonymous"></script>
            <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.0.2/dist/js/bootstrap.min.js" integrity="sha384-cVKIPhGWiC2Al4u+LWgxfKTRIcfu0JTxR+EQDz/bgldoEyl4H0zUF0QKbrJ0EcQF" crossorigin="anonymous"></script>
        </React.Fragment>
    )
}
export async function getServerSideProps(context) {
    let res = await fetch(`http://localhost:3000/api/crud?_id=${context.query._id}`);
    let list = await res.json();
    return {
        props: { list, id: context.query._id },
    }
}