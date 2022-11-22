import React from "react";
import{ Link } from "react-router-dom";
import { auth, db, provider } from "./firebase";

function Usernavbar(){
    var user1= localStorage.getItem("Docid");
    function login(){
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
    db.collection("form1").where("Email","==",user.email).get().then((succ)=>{
        if(succ.size==0){
            db.collection("form1").add({
                Name:user.displayName,
                Email: user.email,
                UID: user.uid
            }).then((succ)=>{
                alert("added")
                console.log(succ.id)
            })
        }
        else{
            alert("already login")
            db.collection("form1").get().then((succc)=>{
                succc.forEach((abc)=>{
                    localStorage.setItem("Docid",abc.id)
                    localStorage.setItem("UID",user.uid)

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
    function logout(){
        alert("logout")
         localStorage.removeItem("Docid")
         localStorage.removeItem("UID")

    }


return(
    <nav className="navbar navbar-inverse">
        <div className="container-fluid">
            <div className="navbar-header">
                
                <div className="navbar-brand nb">
                     DEVGAN CLOTHING
                </div>

            </div>
            <ul className="nav navbar-nav navbar-right">
            <li><Link to='/'>Home</Link></li>
            
            <li><Link to='/user'>User</Link></li>
            {user1 ? (
                                                <li><button onClick={logout} className="btn btn-success navbar-btn">logout</button></li>
                                        ) : (
                                                <li><button onClick={login} className="btn btn-danger navbar-btn">login</button></li>
                                        )} 
                
            </ul>

        </div>
    </nav>
);

}
export default Usernavbar;