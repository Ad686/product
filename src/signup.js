import React from "react";
import { Link } from "react-router-dom";
import { db } from "./firebase";


function Signup(){
    function xyz(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);
        
                var fname=data.get("fname");
                var lname=data.get("lname");
                var mnumb=data.get("mnumb");
                var mail=data.get("mail");
                var pwd=data.get("pwd");
                
                console.log(fname + lname + mnumb + mail + pwd)
                db.collection("user").add({
                    FIRSTNAME:fname,
                    LASTNAME:lname,
                    MOBILENUMBER:mnumb,
                    EMAIL:mail,
                    PASSWORD:pwd
                }).then((succ)=>{
                    alert("data added");
                }).catch((err)=>{
                    alert("can't add");
                })
                e.target.reset();
                e.target.fname.focus();
            }
            
    
    return(
        <div>
      
    <div className="abc">
            <form className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 box1" onSubmit={xyz}>
                <h1 className="acc">Sign Up</h1>
            <div className="form-group">
            <input type="text" className="form-control" placeholder="Firstname" name="fname"></input>
        </div>
        
        <div className="form-group">
            <input type="text" className="form-control" placeholder="Lastname" name="lname"></input>
        </div>
        <div className="form-group">
            <input type="number" className="form-control" placeholder="Mobile no." name="mnumb"></input>
        </div>
        <div className="form-group">
            <input type="email" className="form-control" placeholder="E-mail" name="mail"></input>
        </div>
        <div className="form-group">
            <input type="password" className="form-control" placeholder="Create password" name="pwd"></input>
        </div>
        <br/>
         <div className="form-group">
           <button className="btn btn-primary but">Signup</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
           <span className="usr">Already a user</span>
        <Link to="/" className="usr1"> Sign in</Link>
        </div>
            </form>     
      
    
        </div>
    </div>
    );
}
export default Signup;