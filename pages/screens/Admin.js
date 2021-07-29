import React, { useState } from 'react'
import Head from 'next/head'

export default function Admin({ list }) {
    let [data, setData] = useState(list);
    let [name, setName] = useState('');
    let [nameError, setNameError] = useState('');
    let [email, setEmail] = useState('');
    let [emailError, setEmailError] = useState('');
    let [editData, setEditData] = useState();
    let [index, setIndex] = useState();
    let [isAdmin, setIsAdmin] = useState(false);
    let [isModalVisible, setIsModalVisible] = useState(false);
    let [reqSuccess, setReqSuccess] = useState(false);
    let [reqError, setReqError] = useState(false);
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
    const Edit = (val, i) => {
        setIndex(i);
        setEditData(val);
        setName(val.name);
        setEmail(val.email);
        setIsAdmin(val.root);
        setIsModalVisible(true);
    }
    const Delete = async (val, i) => {
        let body = {
            _id: val._id
        }
        let res = await fetch(`http://localhost:3000/api/crud`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'delete',
            body: JSON.stringify(body)
        })
        let list = await res.json();
        if (list) {
            let Updated = data.filter((ival, index) => i !== index);
            setData(Updated);
        }
    }
    const content = (col, val, i) => {
        if (!col) {
            return i + 1;
        } else if (col == 'avatar') {
            return <img src={val[col]} style={{ height: 60, width: 60, objectFit: 'contain' }} />;
        } else if (col == 'edit') {
            return <button className="btn btn-primary shadow-none" type="button" onClick={() => Edit(val, i)}>Edit</button>;
        } else if (col == 'delete') {
            return <button className="btn btn-danger shadow-none" type="button" onClick={() => {
                setIndex(i);
                setEditData(val);
            }} data-bs-toggle="modal" data-bs-target="#exampleModal">Delete</button>;
        } else if (col == 'root') {
            return val[col] ? 'Yes' : 'no';
        } else {
            return val[col];
        }
    }
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
        submit();
    }
    const submit = async () => {
        if (editData.email === email) {
            doUpdate();
        } else {
            let res = await fetch(`http://localhost:3000/api/crud?email=${email}`);
            let check = await res.json();
            if (check.length) {
                setEmailError(`This email-${email} already exsist`);
            } else {
                doUpdate();
            }
        }
    }
    const doUpdate = async () => {
        let body = {
            ...editData,
            name,
            email,
            root: isAdmin
        }
        let res = await fetch(`http://localhost:3000/api/crud`, {
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            method: 'put',
            body: JSON.stringify(body)
        })
        let list = await res.json();
        if (list) {
            let Updated = [...data];
            Updated[index] = body;
            setData(Updated);
            setReqSuccess(true);
            setTimeout(() => {
                setReqSuccess(false);
                setIsModalVisible(false);
            }, 2500);
        } else {
            setReqError(true)
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
                {isModalVisible ?
                    <div class="modal-dialog modal-lg">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Edit User</h5>
                                <button type="button" class="btn-close" onClick={() => setIsModalVisible(false)}></button>
                            </div>
                            <div class="modal-body">
                                {reqSuccess ? <div class="alert alert-success" role="alert">
                                    User data updated.
                            </div> : null}
                                {reqError ? <div class="alert alert-danger" role="alert">
                                    Something went wrong.
                            </div> : null}
                                <div className="form-group mt-1">
                                    <label for="name" className='pb-1'>Name</label>
                                    <input type="text" className={`form-control shadow-none ${nameError ? 'border border-danger' : ''}`} id="name" aria-describedby="nameHelp" placeholder="Enter email" onChange={e => setName(e.target.value)} value={name} />
                                    {nameError ?
                                        <small id="nameHelp" className="form-text text-danger pt-1">{nameError}</small>
                                        : null}
                                </div>
                                <div className="form-group mt-3">
                                    <label for="email" className='pb-1'>Email</label>
                                    <input type="text" className={`form-control shadow-none ${emailError ? 'border border-danger' : ''}`} id="email" aria-describedby="emailHelp" placeholder="Enter email" onChange={e => setEmail(e.target.value)} value={email} />
                                    {emailError ?
                                        <small id="emailHelp" className="form-text text-danger pt-1">{emailError}</small>
                                        : null}
                                </div>
                                <div class="form-check mt-3">
                                    <input class="form-check-input shadow-none" type="checkbox" value="" id="defaultCheck1" checked={isAdmin} onClick={() => setIsAdmin(!isAdmin)} />
                                    <label class="form-check-label" for="defaultCheck1">
                                        Is Admin ?
                                    </label>
                                </div>

                                <div class="mt-4 d-grid gap-2 mb-1">
                                    <button class="btn btn-primary" type="button" onClick={validate}>Update</button>
                                </div>
                            </div>
                        </div>
                    </div> :
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
                    </table>}
                <div class="modal fade" id="exampleModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                    <div class="modal-dialog">
                        <div class="modal-content">
                            <div class="modal-header">
                                <h5 class="modal-title" id="exampleModalLabel">Modal title</h5>
                                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                            </div>
                            <div class="modal-body">
                                Are you sure you want to delete {editData ? editData.name : ''} ?
                            </div>
                            <div class="modal-footer">
                                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                                <button type="button" class="btn btn-primary" onClick={() => Delete(val, i)}>Save changes</button>
                            </div>
                        </div>
                    </div>
                </div>

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