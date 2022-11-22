import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { auth, db, provider } from "./firebase";

function Navbar() {

    var user1 = localStorage.getItem("Docid");

    var navi = useNavigate();

    const [id,setid]= useState(false)

    const [val,setval] = useState()
    console.log(val)
    localStorage.setItem("Val",val) 
    
    var value = localStorage.getItem("Val")
    console.log(value)

    function login() {
        alert("hlo")
        auth.signInWithPopup(provider)
            .then((result) => {
                /** @type {firebase.auth.OAuthCredential} */
                var credential = result.credential;

                // This gives you a Google Access Token. You can use it to access the Google API.
                var token = credential.accessToken;
                // The signed-in user info.
                var user = result.user;
                console.log(user)
                db.collection("form1").where("Email", "==", user.email).get().then((succ) => {
                    if (succ.size == 0) {
                        db.collection("form1").add({
                            Name: user.displayName,
                            Email: user.email,
                            UID: user.uid
                        }).then((succ) => {
                            alert("added")
                            setid(true)
                            console.log(succ.id)
                        })
                    }
                    else {
                        alert("Let's Shopping")
                        setid(true)
                        db.collection("form1").get().then((succc) => {
                            succc.forEach((abc) => {
                                localStorage.setItem("Docid", abc.id)
                                localStorage.setItem("UID", user.uid)
                            })
                        })
                    }
                })
                // ...
            }).catch((error) => {
                // Handle Errors here.
                var errorCode = error.code;
                var errorMessage = error.message;
                // The email of the user's account used.
                var email = error.email;
                // The firebase.auth.AuthCredential type that was used.
                var credential = error.credential;
                // ...
            });

    }
    function logout() {
        alert("logout")
        setid(false)
        localStorage.removeItem("Docid")
        localStorage.removeItem("UID")
        navi('/')

    }
    function cart() {
        navi("/mycart");
    }

    return (
        <nav className="navbar navbar-inverse">
            <div className="container-fluid">
                <div className="navbar-header">

                    <div className="navbar-brand nb">
                        DEVGAN CLOTHING
                    </div>

                </div>
                <ul className="nav navbar-nav navbar-right">
                    <li><Link to='/'>Home</Link></li>
                    <li><Link to='/admin'>Admin</Link></li>
                    {/* <li> <div class="dropdown">
                        <button class="btn btn-primary dropdown-toggle navbar-btn" type="button" data-toggle="dropdown">Sort By
                            <span class="caret"></span></button>
                        <ul class="dropdown-menu">
                            <button className="btn btn-warning" value={'desc'} onClick={(e)=>setval(e.target.value)}>High to Low</button>
                            <button className="btn btn-warning" value={'asc'} onClick={(e)=>setval(e.target.value)}>Low to High</button>\
                        </ul>
                    </div></li> */}
                    <li><Link to='/user'>User</Link></li>
                    <li><button onClick={logout} className="btn btn-success navbar-btn">logout</button>
                            &nbsp;&nbsp;
                            <button className="btn btn-warning navbar-btn" onClick={cart}>MY CART</button>
                        </li>


                </ul>


            </div>
        </nav>
    );

}
export default Navbar;