import React, { useEffect, useState } from "react";
import { db } from "./firebase";
import Navbar from "./navbar";
import Usernavbar from "./usernavbar"

function User() {
  var value = localStorage.getItem("Val")
  console.log(value)

  var user = localStorage.getItem("Docid");
  console.log(user)
  const [nm, setnm] = useState()
  const [em, setem] = useState()

  const [val, setval] = useState('asc')
  function getoneuser() {
    db.collection("form1").doc(user).get().then((succ) => {
      // console.log(succ.data())
      setnm(succ.data().Name)
      setem(succ.data().Email)
    })
  }
  useEffect(() => {
    getoneuser()
  }, [user]);
  const [data, setdata] = useState([]);
  console.log(val)

  const [limit,setlimit] = useState(5)
  
  function getdata() {
    db.collection("admin").orderBy("PRICE", val).limit(limit).onSnapshot((succ) => {
      var ar = [];
      succ.forEach((abc) => {
        ar.push(abc);
      });
      setdata(ar);
    });
  }
  useEffect(() => {
    getdata();
  }, [val,limit]);

  function addcart(x) {
    var crt = db.collection("form1").doc(user).collection("mycart");

    crt.where("PID", "==", x.id).get().then((succ) => {
      if (succ.size == 0) {

        var obj1 = x.data();

        var obj3 = { PID: x.id, Qty: 1, Uname: nm, UEmail: em }

        Object.assign(obj1, obj3);
        console.log(obj1)

        crt.add(obj1).then((succc) => {
          alert("added to cart")
        })
      } else {
        alert("alredy exists")
      }
    })
  }


  return (
    <div>
      <Navbar />
      <div className="form-group col-xs-4">
        <h4>Select Order Of Pricing</h4>
        <select className="form-control" onChange={(e) => setval(e.target.value)}>
          <option value={'asc'}>low to high</option>
          <option value={'desc'}>high to low</option>
        </select>

        <h4>No. Of Products To Be Shown</h4>
        <select className="form-control" onChange={(e) => setlimit(e.target.value)}>
          <option value={7}>7</option>
          <option value={10}>10</option>
          <option value={20}>20</option>
        </select>
      </div>

      <div className="clearfix"></div>
      <div className="col-lg-12">
        {data.map((row) => (
          <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 boxx">
            <div className="bott">
              <img src={row.data().IMAGE} className="img-responsive image" />
            </div>
            <h4 className="pn">{row.data().PRODUCTNAME}</h4>
            <p className="pd">{row.data().PRODUCTDISCRIPTION}</p>
            <p className="rp">&#x20b9;{row.data().PRICE}</p>
            {/* <p>{row.data().OPTION}</p> */}
            <button
              className="btn btn-primary form-control atc"
              onClick={() => addcart(row)}
            >
              Add To Cart
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default User;