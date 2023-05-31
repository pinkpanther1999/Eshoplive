import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { Navigate, useNavigate } from 'react-router-dom';
import "bootstrap/dist/css/bootstrap.min.css";
import Spinner from 'react-bootstrap/Spinner';

export default function CartForm() {

  const navigate = useNavigate();
  const [carts, setCarts] = useState();
  const [address, setAddress] = useState([]);
  const [multiaddress, setMultiaddress] = useState([])
  const [user, setUser] = useState();
  const [userid, setUserid] = useState();
  const [pointserror, setPointserror] = useState("");
  const [addressflag, setAddressflag] = useState(false);
  const [orderaddress, setOrderaddress] = useState(null)


  function selectAddress(obj) {
    setAddressflag(true)
    setOrderaddress(obj)
    console.log(orderaddress)
  }


  useEffect(() => {


    var id = window.sessionStorage.getItem("userid")
    setUserid(id);


    fetch("https://localhost:44344/Carts/" + id)
      .then(res => res.json())
      .then((data) => {
        setCarts(data)
      })

    fetch("https://localhost:44344/Addresses/" + id)
      .then(res => res.json())
      .then((data) => {
        setAddress(data)
      })

    fetch("https://localhost:44344/Users/" + id)
      .then(res => res.json())
      .then((data) => {
        setUser(data)
      })





  }, [])


  const formik = useFormik({
    initialValues: {
      A_PhoneNumber: '',
      A_DeliveryInstruction: ''
    },
    validationSchema: yup.object({

      A_PhoneNumber: yup.string(),

      A_DeliveryInstruction: yup.string()

    }),
    onSubmit: values => {

      console.log(values)
      let sumprice = 0, sumpoints = 0;
      for (var i of carts) {
        sumprice = sumprice + i.Cart_Price * i.Cart_Quantity;
        sumpoints = sumpoints + i.Cart_Ecard_Points * i.Cart_Quantity;
      }

      console.log(carts)
      console.log(sumprice + " " + sumpoints)
      console.log(user.ECard_Points + "" + user.U_First_Name)

      const orderobj = {

        O_Name: user.U_First_Name+" "+user.U_Last_Name,
        O_Alt_Mobile: values.A_PhoneNumber,
        O_Del_Instruction: values.A_DeliveryInstruction,
        O_Total_Amt: sumprice,
        O_Ecard_Points_Earned: (user.ECard_Points==-1)? parseInt(0) : parseInt(sumprice * 0.1),
        O_Ecard_Points_Redeamed: sumpoints,
        O_Ecard_Point_CL_Bal: user.ECard_Points - sumpoints,
        O_DateTime: new Date(Date.now()),
        User_U_Id: userid,
        Address_A_Id: orderaddress.A_Id

      }

      console.log(orderobj)

      const demo = JSON.stringify(orderobj)

      if ((address.length) == 0) {
        setPointserror("Please add address in your profile")
        navigate("/Address")
      }
      else if (user.ECard_Points == -1 && sumpoints != 0) {
        setPointserror("You are not a Ecard Holder")
      }

      else if ((user.ECard_Points != -1) && (user.ECard_Points - sumpoints < 0)) {
        setPointserror("Insufficient Points. Please select valid items!")
      }
      else {
        fetch("https://localhost:44344/Orders",
          {
            method: 'POST',
            headers: { 'Content-type': 'application/json', 'Accept': '/' },
            body: demo
          }).then(r => {

            if (r.status >= 400)
              console.log(r)

            return r.json()
          }).then(res => {
            console.log(res)
            if (res) {
              console.log("hiiii")
              window.sessionStorage.setItem("aid", res.Address_A_Id);

              navigate('/Order/' + res.O_Id);
            }
          })
      }
    },
  });


  return (

    <div >

      <div style={{ marginLeft: "50px" }}>
        <br />
        <h3 style={{ color: "brown" }}>Select Address for Delivery : </h3>

        {(address.length == 0) ? <h5 style={{ color: "red" }}>Please add address! 
        <button onClick={()=>{navigate("/Address")}} className="btn btn-warning">Add address</button>

        </h5> : (null)}
        <br />
        {address.map((obj, index) => (
          <div style={{ display: 'inline-block', flexDirection: 'row', marginLeft: '100px' }} key={obj.A_Id} >
            <label className="radio-buttons" >
              <div className="card" style={{ width: "250px", backgroundColor: 'lightBlue' }}>
                <div className="card-body">
                  <input className="form-check-input" type="radio" name="Address" onChange={() => selectAddress(obj)} value={obj} />
                  <p> <b>Address {index + 1} : </b></p>
                  <p> <b>Address : </b>{obj.A_Description}</p>
                  <p> <b>City : </b>{obj.A_City}</p>
                  <p> <b>PinCode : </b>{obj.A_Pincode}</p>
                  <p> <b>Country : </b>{obj.A_Country}</p>
                </div>
              </div>
            </label>
          </div>
        ))}


        <form onSubmit={formik.handleSubmit}>
          <br />
          <p>
            <label>Alternate PhoneNumber :<p style={{ color: "red" }}>(optional)</p></label><input type="text" name="A_PhoneNumber"
              value={formik.values.A_PhoneNumber} style={{ marginLeft: "22px" }}
              {...formik.getFieldProps("A_PhoneNumber")}></input>
            {formik.touched.A_PhoneNumber && formik.A_PhoneNumber ? <span style={{ color: 'red' }}>{formik.errors.A_PhoneNumber}</span> : null}
          </p>
          <br />
          <p>
            <label>Delivery Instructions : <p style={{ color: "red" }}>(optional)</p></label><textarea name="A_DeliveryInstruction"
              value={formik.values.A_DeliveryInstruction} style={{ marginLeft: "50px" }}
              {...formik.getFieldProps("A_DeliveryInstruction")}></textarea>
            {formik.touched.A_DeliveryInstruction && formik.A_DeliveryInstruction ? <span style={{ color: 'red' }}>{formik.errors.A_DeliveryInstruction}</span> : null}
          </p>
          <div className='d-flex justify-content-start' style={{ color: "red" }}><h3>{pointserror}</h3></div>
          <div className="d-flex justify-content-center">
            {(addressflag == false || carts.length == 0) ? <button className="btn btn-success" disabled type="submit" >Pay Now</button> : <button className="btn btn-success" type="submit">Pay Now</button>}
          </div>
        </form>
      </div>
      <br /><br />
    </div>
  )


}