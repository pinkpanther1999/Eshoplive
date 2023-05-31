import React, { useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LogoBar from './LogoBar';
import Footer from './Footer';
import { useNavigate } from "react-router-dom";
export default class Address extends React.Component {

  render() {

    return (

      <div>
        <YUser />
      </div>

    );

  }

}

function YUser() {

  const [addr, setAddr] = useState([]);
  const [session, setSession] = useState();
  const [mssg, setMssg] = useState();
  const [username, setUserName] = useState();
  const [user1, setUser1] = useState([]); //new
  const [userid, setUserid] = useState(); //new
  const navigate=useNavigate();
  //const user =window.sessionStorage.getItem("userid");

  //new
  useEffect(() => {
    var aid = window.sessionStorage.getItem("aid")
    var id = window.sessionStorage.getItem("userid")
    setUserid(id);


    fetch("https://localhost:44344/Users/" + id)
      .then(res => res.json())
      .then((data) => {
        setUser1(data)
      })


    fetch("https://localhost:44344/Addresses/" + id)
      .then(res => res.json())
      .then((data) => {
        setAddr(data)
        console.log(data)
      })

      window.scrollTo(0, 0)
  }, []);


  const formik = useFormik({

    initialValues: {
      A_Description: "",
      A_City: "",
      A_Pincode: "",
      A_Country: "",

    },

    validationSchema: yup.object({

      A_Description: yup.string()
        .max(50, "Name should not exceed 50 Characters!")
        .required("Please Enter Address!"),

      A_City: yup.string()
        .max(20, "Name should not exceed 20 Characters!")
        .required("Please Enter City!"),

      A_Pincode: yup.number()
      .positive('Pincode Cannot be Negative')
                .max(999999, 'Pincode should be of 6 digits')
                .min(100000, 'Pincode should be of 6 digits')
                .required("Please Enter Pincode!"),

      A_Country: yup.string()
      .max(30, "Country should not exceed 30 Characters!")
      .required("Please Enter Country!"),

    }),



    onSubmit: values => {

      console.log(values)

      const obj = {

        A_Description: values.A_Description,

        A_City: values.A_City,

        A_Pincode: values.A_Pincode,

        A_Country: values.A_Country,

        User_U_Id: userid

      }
      console.log(obj)

      let demo = JSON.stringify(obj)

      // if(username==true)

      // {

      fetch("https://localhost:44344/Addresses",

        {

          method: 'POST',

          headers: { 'Content-type': 'application/json' },

          body: demo
        }).then(r => {
          return r.json()
        }).then(res => {
          setMssg(res)
          window.location.reload();
        });
      // }
    },

  });

  return (


    <div id="profile">
      <h2 style={{marginLeft:"100px",color:"brown"}}><b>Profile Details</b></h2>
      <div style={{marginLeft:"100px"}} className="d-flex justify-content-evenly align-items-center">
        <div>
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Name</th>
              <td scope="col">{user1.U_First_Name} {user1.U_Last_Name}</td>
            </tr>
          </thead>
          <tbody>
            <tr>
              <th scope="row">Mobile</th>
              <td>{user1.U_Mobile}</td>
            </tr>
            <tr>
              <th scope="row">Email</th>
              <td>{user1.U_Email}</td>
            </tr>
            <tr>
              <th scope="row">ECard Points</th>
              <td>{(user1.ECard_Points!=-1)?user1.ECard_Points:"Not Subscribed to E-Card"}</td>
            </tr>
          </tbody>
        </table>
        </div>
<div><button onClick={()=>{navigate("/OrderHistory")}} className="btn btn-warning">Previous Orders</button></div>
        
      </div>
      <LogoBar />
      <br/>
      <div>
    <hr style={{color:"grey"}}/>
    <br/>
        <h2 style={{marginLeft:"100px",color:"brown"}}><b>Add Address</b></h2>
        <br></br>
        <form onSubmit={formik.handleSubmit}>

          <p>
            <label style={{marginLeft:"107px"}}> Address :
              <textarea onKeyUp={formik.handleBlur} name="A_Description" value={formik.values.A_Description} placeholder="Flat no, Building name, Street name, Landmark" style={{marginLeft:"63px"}}
                {...formik.getFieldProps("A_Description")} ></textarea>
              {formik.touched.A_Description && formik.errors.A_Description ? (
                <span style={{ color: "red",marginLeft:"15px" }}>
                  {formik.errors.A_Description}
                </span>) : null}
            </label>
          </p>

          <p>
            <label style={{marginLeft:"103px"}}> City :
              <input type="text" name="A_City" value={formik.values.A_City} placeholder="Mumbai" style={{marginLeft:"95px"}}
                {...formik.getFieldProps("A_City")} ></input>
              {formik.touched.A_City && formik.errors.A_City ? (
                <span style={{ color: "red",marginLeft:"15px" }}>{formik.errors.A_City}</span>
              ) : null}
            </label>
          </p>

          <p>
            <label style={{marginLeft:"102px"}}> Pincode :
              <input type="text" name="A_Pincode" value={formik.values.A_Pincode} placeholder="400001" style={{marginLeft:"73px"}}
                {...formik.getFieldProps("A_Pincode")} ></input>
              {formik.touched.A_Pincode && formik.errors.A_Pincode ? (
                <span style={{ color: "red",marginLeft:"15px"}}>{formik.errors.A_Pincode}</span>
              ) : null}
            </label>
          </p>

          <p>
            <label style={{marginLeft:"102px"}}> Country :
              <input type="text" name="A_Country" value={formik.values.A_Country} placeholder="India" style={{marginLeft:"72px"}}
                {...formik.getFieldProps("A_Country")} ></input>
              {formik.touched.A_Country && formik.errors.A_Country ? (
                <span style={{ color: "red",marginLeft:"15px" }}>{formik.errors.A_Country}</span>
              ) : null}
            </label>
          </p>
          <br></br>
          <button type="submit" id="addaddress" style={{marginLeft:"100px"}}><b>Add Address</b></button>
          {(mssg != null) ? <h4 style={{marginTop:"40px",marginLeft:"20px",color:"green"}}>Address Added Successfully!</h4> : <h3 ></h3>}

        </form>
        <br></br>
      </div>
      <hr style={{color:"grey"}}/>
      <br></br>
      <h2 style={{marginLeft:"100px",color:"brown"}}><b>Your Address Details</b></h2>
      <br></br>
      {addr.map((ad, index) => (
        <div style={{marginLeft:"100px"}} key={ad.A_Id}>
          <p style={{ display: 'inline-block' }}><b> Address {index + 1} : </b>{ad.A_Description} , </p>    <p style={{ display: 'inline-block' }}>{ad.A_City} , </p>     <p style={{ display: 'inline-block' }}> {ad.A_Pincode} , </p>       <p style={{ display: 'inline-block' }}> {ad.A_Country}</p>
        </div>

      ))}
      <br></br>
      <div>
        <Footer/>
      </div>
    </div>




  )

}