import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import Navbar from "./navbar";
function Adminlogin(){
    var navi = useNavigate() 
function adminform(e){

    e.preventDefault();
    var data=new FormData(e.currentTarget);

    var username = data.get('name');
    var password = data.get('pass');
    
    console.log(username + password)
    db.collection("ADMIN").where("Email", "==", username).where("Password", "==", password).get().then((succ) => {
        if (succ.size == 0) {
            alert("Unauthorized prson")
        }
        else {
            alert("Let's Make Changes")
          navi('/admin')
        }
    })

}
    return(
        <div>
            {/* <Navbar/> */}
            <div className="abc">
                <form className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 box" onSubmit={adminform}>
                    <h1 className="acc">Admin Login</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="email" name="name"></input>
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="password" name="pass"></input>
                    </div>
                    <br />
                    <div className="form-group">
                        <button className="btn btn-primary adbut">Login As Admin</button>
                    </div>
                </form>


            </div>
        </div>
    );
}
export default Adminlogin;