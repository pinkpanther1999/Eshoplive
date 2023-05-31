
import React, { useEffect, useRef, useState } from "react"
import { Navigate, useNavigate, useParams } from "react-router-dom";
import LogoBar from "./LogoBar";
import Footer from "./Footer";

export default class SignUp extends React.Component {
  render() {
    return (
      <div>
        <Order />
      </div>
    );
  }
}
function Order() {

  //const [session,setSession]=useState();
  const [Order, setOrder] = useState([]);
  const [Address, setAddress] = useState([]);
  var aid = window.sessionStorage.getItem("aid");
  var uid = window.sessionStorage.getItem("userid")
  const { id } = useParams();
  const navigate = useNavigate();
  //var oid=  window.sessionStorage.getItem("oid");
  //     var id=session;
  useEffect(() => {
    fetch("https://localhost:44344/Orders/" + id + "/" + uid)

      .then(res => res.json())
      .then((data) => {

        if (data.length == 0) {
          navigate('/ErrorPage')
        }

        else {
          setOrder(data)
        }

      })
    console.log(Order)

    fetch("https://localhost:44344/Addresses/A/" + aid)
      .then(res => res.json())
      .then((data) => {
        setAddress(data)
      })
    console.log(Address)

    window.scrollTo(0, 0)

      fetch("https://localhost:44344/Email/"+id)
        .then((res) => console.log(res.ok))
  }, [])


  return (
    <div>
      <LogoBar />
      <div style={{ marginTop: "150px" }} className="tick d-flex justify-content-center ">
        <img src="/Images/tick.gif" alt="" width="150" height="120" /> </div>
      <h2 align="center" id="ordersuccess">    Your order has been placed successfully!  </h2>
      <h5 align="center" id="ordermsg">Thanks for being awesome, we hope you enjoyed your purchase!</h5>

      <table>
        <tbody>
        <tr>
          <td scope="col"><h4 style={{ color: "maroon" }}>Customer Name : </h4></td>
          <td scope="row"><h4>{Order[0]?.O_Name}</h4></td>
        </tr>
        <tr>
          <td scope="col"><h4 style={{ color: "maroon" }}>Shipping Address :</h4></td>
          <td scope="row"><h4>{Address.A_Description}, {Address.A_City}, {Address.A_Pincode}, {Address.A_Country}</h4></td>
        </tr>
        <tr>
          <td scope="col"><h4 style={{ color: "maroon" }}>E-Card points earned : </h4></td>
          <td scope="row"><h4>{Order[0]?.O_Ecard_Points_Earned}</h4></td>
        </tr>
        <tr>
          <td scope="col"><h4 style={{ color: "maroon" }}>E-Card points redeemed : </h4></td>
          <td scope="row"><h4>{Order[0]?.O_Ecard_Points_Redeamed}</h4></td>
        </tr>
        <tr>
          <td scope="col"><h4 style={{ color: "maroon" }}>E-Card points closing balance : </h4></td>
          <td scope="row"><h4>{Order[0]?.O_Ecard_Point_CL_Bal==-1? "Not subscribed to E-Card" : Order[0]?.O_Ecard_Point_CL_Bal}</h4></td>
        </tr>
        </tbody>
      </table>

      <table className="table table-striped" >
        <thead className="bg-warning">
          <tr>
            <th scope="col">Product Name</th>
            <th scope="col">Quantity</th>
            <th scope="col">Unit Price</th>
            <th scope="col">Points Redeemed</th>
            <th scope="col">Total Price</th>
            <th scope="col">Estimated Delivery Date</th>
          </tr>
        </thead>
        <tbody>
          {
            Order.map((img) => (

              <tr key={img.O_P_Config_Id}>
                <td scope="row">{img.O_P_Name}<br /> <span className="blockquote-footer">{img.O_P_Config_Desc}</span></td>
                <td>{img.O_Cart_Quantity}</td>
                <td>{img.O_P_Emart_Price}</td>
                <td>{img.O_P_Ecard_Redem_Points*img.O_Cart_Quantity}</td>
                <td>{img.O_P_Emart_Price*img.O_Cart_Quantity}</td>
                <td>{img.O_Est_Del_Date.substr(0, 10)}</td>
              </tr>


            ))}
        </tbody>
        <tr>
          <td scope="col"><h4 style={{ color: "maroon" }}>Total amount : </h4></td>
          <td scope="row"><h4>{Order[0]?.O_Total_Amt}</h4></td>
        </tr>
      </table>
      <div className="d-flex justify-content-center">
        <marquee height="150px" style={{ color: "maroon", fontWeight: "bold", fontSize: "25px" }}>Please refer to your email for order details!</marquee>
      </div>
      <Footer />
    </div>

  )

}