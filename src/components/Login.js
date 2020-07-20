import React, { Fragment, useState } from "react";
import logo from './euromobil.jpg';
import {  useHistory } from "react-router-dom";
// import { Redirect } from "react-router-dom"

const API = process.env.REACT_APP_API;



export const Login = () => {
    const [username, setUserName] = useState("");
    const [password, setPassword] = useState("");
    const history = useHistory();

    



    const handleSubmit = async (e) => {
        e.preventDefault();
        localStorage.removeItem("userdata");
        const res = await fetch(`${API}/auth`, {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                username,
                password,
            }),

        });
        if (res.ok === true) {

            const ptoken = await res.json();
            const token = "JWT " + ptoken['access_token'];
            const us = await fetch(`${API}/protectec`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": token
                },

            })
            const userdata = await us.json();
            localStorage.setItem("userdata", JSON.stringify(userdata));
            history.push("/home");
           
          } else {
            console.log("USUARIO INVALIDO");
        }



    }
    return (
        <Fragment>
            <br />
            <br />
            <div className="container">
                <div className="row">
                    <div className="col-md-3"></div>
                    <div className="col-md-6">
                        <form onSubmit={handleSubmit}>
                            <p className="text-center"><img className="mb-4 mt-4" src={logo} alt="" width={350} height={100} /></p>
                            <input type="text"
                                id="username"
                                className="form-control "
                                placeholder="Usuario"
                                onChange={(e) => setUserName(e.target.value)}
                                value={username}
                                required autoFocus />
                            <input type="password"
                                id="password"
                                className="form-control mt-3"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                                value={password}
                                required />
                            <button className="btn btn-lg btn-primary btn-block mt-4" type="submit">Login</button>
                        </form>
                    </div>
                    <div className="col-md-3"></div>
                </div>
            </div>
        </Fragment>
    )
}