import React, { useEffect, useState } from "react";
import firebase from "firebase";
import { db } from "./firebase";
import Navbar from "./navbar";
function Cart() {
  var user = localStorage.getItem("Docid");

  const [data, setdata] = useState([]);
  function getcart() {
    db.collection("form1")
      .doc(user)
      .collection("mycart")
      .onSnapshot((succ) => {
        var ar = [];
        succ.forEach((abc) => {
          ar.push(abc);
          console.log(abc.data());
        });
        setdata(ar);
      });
  }
  useEffect(() => {
    getcart();
  }, []);

  
  function placeorder(x) {
    var orderno = 1;
    console.log(x.id);
    // orderno++;
    console.log(orderno)
    var obj = x.data();
    console.log(obj)
    db.collection("Orders").add(obj).then((succ)=>{
      alert("placed order")
      db.collection("form1").doc(user).collection("mycart").doc(x.id).delete();
    })
  }

  function incre(x){
    var idd = x.id
    console.log(idd)
    // console.log(x.data())
    db.collection("form1").doc(user).collection("mycart").doc(idd).update({
        Qty:firebase.firestore.FieldValue.increment(1)
    })
  }
  function decre(x){
    var idd = x.id
    console.log(idd)
    // console.log(x.data())
    db.collection("form1").doc(user).collection("mycart").doc(idd).update({
        Qty:firebase.firestore.FieldValue.increment(-1)
    })
  }
  function del(x){
    var idd = x.id
    console.log(idd)
    // console.log(x.data())
    db.collection("form1").doc(user).collection("mycart").doc(idd).delete().then((succ)=>{
        alert("deleted")
    })
  }
  return (
    <div>
      <Navbar />
      <div className="col-lg-12">
        {data.map((row) => (
          <div className="col-lg-2 col-md-4 col-sm-6 col-xs-12 boxx1">
            <div className="bott">
              <img src={row.data().IMAGE} className="img-responsive image1"/>
            </div>
            <h4 className="pn">{row.data().PRODUCTNAME}</h4>
            <p className="pd">{row.data().PRODUCTDISCRIPTION}</p>
            <p className="rp">&#x20b9;{row.data().PRICE * row.data().Qty}</p>

            <div className="btn btn-group btn1">
              <button className="btn" onClick={()=>incre(row)}>+</button>
              <button className="btn" disabled>
                {row.data().Qty}
              </button>

              {row.data().Qty <= 1 ? (
                <button className="btn"><span className="glyphicon glyphicon-trash" onClick={()=>del(row)}></span></button>
              ) : (
                <button className="btn"  onClick={()=>decre(row)}>-</button>
              )}
            </div>
            {/* <p className="rp">qty: {row.data().Qty}</p> */}
            {/* <p>{row.data().OPTION}</p> */}
            <button
              className="btn btn-success form-control atc"
              onClick={() => placeorder(row)}
            >
              Place Order
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
export default Cart;