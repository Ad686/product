import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { db } from "./firebase";
import Navbar from "./navbar";
function Home() {

    var navi = useNavigate()
    function subform(e){
        e.preventDefault();
        var data=new FormData(e.currentTarget);

        var nm = data.get('name')
        var pss = data.get('pass')
        
        console.log(nm + pss)
        db.collection("user").where("EMAIL", "==", nm).get().then((succ) => {
            if (succ.size == 0) {
                alert("register first")
            }
            else {
                alert("already login")
                db.collection("user").get().then((succc) => {
                    succc.forEach((abc) => {
                        // console.log(abc.data())
                        localStorage.setItem("Docid", abc.id)
                        console.log(abc.id)
                    })
                }).then((dox)=>{
                    navi('/user')
                })  
            }
        })

    }

    return (
        <div>
            {/* <Navbar/> */}
            <div className="abc">
                <form className="col-lg-6 col-lg-offset-3 col-md-6 col-md-offset-3 col-sm-6 col-sm-offset-3 col-xs-6 col-xs-offset-3 box" onSubmit={subform}>
                    <h1 className="acc">Login Here</h1>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="email" name="name"></input>
                    </div>

                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="password" name="pass"></input>
                    </div>
                    <br />
                    <div className="form-group">
                        <button className="btn btn-primary but">LOGIN</button>&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                        <span className="usr">Became a user</span>
                        <Link to="/signup" className="usr1"> Signup Now</Link>
                    </div>
                </form>


            </div>
        </div>
    );
}
export default Home;