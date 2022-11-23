import React, { useEffect, useState } from "react";
import Navbar from "./navbar";
import { db } from "./firebase";
import { storage } from "./firebase"
import Usernavbar from "./usernavbar";
function Admin() {

    var value = localStorage.getItem("Val")
    console.log(value)
    
    function xyz(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);

        var file = data.get("file");
        var prname = data.get("prname");
        var prdis = data.get("prdis");
        var mrp = data.get("mrp");
        var opt = data.get("opt");

        //  console.log(file + prname + prdis + mrp + opt)
        console.log(file)
        var storageref = storage.ref('/abc/' + file.name).put(file);
        storageref.then((succ) => {
            storageref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(downloadURL);
                db.collection("admin").add({
                    IMAGE: downloadURL,
                    PRODUCTNAME: prname,
                    PRODUCTDISCRIPTION: prdis,
                    PRICE: mrp,
                    OPTION: opt
                }).then((succ) => {
                    alert("data entered")
                }).catch((err) => {
                    alert("can't add data")
                })
            })
        })

        e.target.reset();
        e.target.file.focus();
    }
    const [data, setdata] = useState([]);
    function getdata() {
        db.collection("admin").onSnapshot((succ) => {
            var ar = [];
            succ.forEach((abc) => {
                ar.push(abc);
            })
            setdata(ar)
        })
    }
    useEffect(() => {
        getdata();
    }, [])
    function del(x) {
        if (window.confirm("ready to delete it")) {
            alert("deleted")
            db.collection("admin").doc(x).delete();
        }

    };
    const [id1, setid1] = useState()

    function edit(x) {
        setid1(x)
    }
    const [pn, setpn] = useState('')
    const [pd, setpd] = useState('')
    const [rs, setrs] = useState('')
    const [opt, setopt] = useState('')

    function getoneuser() {
        if (id1) {
            db.collection("form2").doc(id1).get().then((succ) => {
                setpn(succ.data().PRODUCTNAME)
                setpd(succ.data().PRODUCTDISCRIPTION)
                setrs(succ.data().PRICE)
                setopt(succ.data().OPTION)


            });
        }
    }
    useEffect(() => {
        getoneuser()
    }, [id1])
    function editform(e) {
        e.preventDefault();
        var data = new FormData(e.currentTarget);
        var file = data.get("file");
        console.log(file)
        var storageref = storage.ref("/abc" + file.name).put(file);
        storageref.then((succ) => {
            storageref.snapshot.ref.getDownloadURL().then((downloadURL) => {
                console.log(downloadURL)

                db.collection("admin").doc(id1).update({
                    IMAGE: downloadURL,
                    PRODUCTNAME: pn,
                    PRODUCTDISCRIPTION: pd,
                    PRICE: rs,
                    OPTION: opt

                }).then((succ) => {
                    alert("updated")
                })
            })

        })
    }
    return (
        <>
            <Usernavbar/>

            <form className="col-lg-3 form" onSubmit={xyz}>
                <div className="form-group">
                    <h1>Admin Form</h1>
                </div>
                <div className="form-group">
                    <input type={"file"} name="file" />
                </div>
                <div className="form-group">
                    <input type={"text"} className="form-control" name="prname" placeholder="product name" />
                </div>
                <div className="form-group">
                    <input type={"text"} className="form-control" name="prdis" placeholder="product discription" />
                </div>
                <div className="form-group">
                    <input type={"number"} className="form-control" name="mrp" placeholder="price" />
                </div>
                <div className="form-group">
                    <select className="form-control" name="opt">
                        <option value={"plain shirt"}>plain</option>
                        <option value={"horizontal line"}>horizontal line</option>
                        <option value={"vertical line"}>vertical line</option>
                        <option value={"partywear"}>partywear</option>
                        <option value={"checked"}>checked</option>
                        <option value={"denim"}>denim</option>
                        <option value={"overshirt"}>overshirt</option>


                    </select>
                </div>
                <div className="form-group">
                    <input type={"submit"} className="btn btn-success" />
                </div>
            </form>

            <div className="col-lg-8">
                <table className="table table-bordered">
                    <thead>
                        <tr>
                            <th>Product Image</th>
                            <th>Product Name</th>
                            <th>Discription</th>
                            <th>Price</th>
                            <th>Type</th>
                            <th colSpan={2}>Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((row) => (
                            <tr key={row.id}>
                                <td className="photo"><img src={row.data().IMAGE} className="img-responsive" /></td>
                                <td>{row.data().PRODUCTNAME}</td>
                                <td>{row.data().PRODUCTDISCRIPTION}</td>
                                <td>&#x20b9;{row.data().PRICE}</td>
                                <td>{row.data().OPTION}</td>
                                <td><button className="btn btn-danger" onClick={() => del(row.id)}>delete</button></td>
                                <td><button className="btn btn-success" data-toggle="modal" data-target="#mymodal" onClick={() => edit(row.id)}>Edit</button></td>

                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <div className="modal fade" role="dialog" id="mymodal">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <div className="modal-title">
                                <button className="close" data-dismiss="modal">x</button>
                                <h2>Edit Form</h2>
                            </div>
                        </div>
                        <div className="modal-body">
                            <form onSubmit={editform}>
                                <div className="form-group">
                                    <input type="file" name="file"></input>
                                </div>

                                <div className="form-group">
                                    <input type="text" value={pn} onChange={(e) => setpn(e.target.value)} className="form-control" placeholder="product name" name="prname"></input>
                                </div>

                                <div className="form-group">
                                    <input type="text" value={pd} onChange={(e) => setpd(e.target.value)} className="form-control" placeholder="product discription" name="prdis"></input>
                                </div>
                                <div className="form-group">
                                    <input type="text" value={rs} onChange={(e) => setrs(e.target.value)} className="form-control" placeholder="product MRP" name="mrp"></input>
                                </div>


                                <div className="form-group">
                                    <select className="form-control" onChange={(e) => setopt(e.target.value)} name="opt">
                                        <option value={"plain shirt"}>plain</option>
                                        <option value={"horizontal line"}>horizontal line</option>
                                        <option value={"vertical line"}>vertical line</option>
                                        <option value={"partywear"}>partywear</option>
                                        <option value={"checked"}>checked</option>
                                        <option value={"denim"}>denim</option>
                                        <option value={"overshirt"}>overshirt</option>


                                    </select>
                                </div>



                                <div className="form-group">
                                    <input type="submit" className="btn btn-success" value={'edit form'}></input>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </>


    )
}
export default Admin;