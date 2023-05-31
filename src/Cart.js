
import React, { useEffect, useState } from "react";
import CartForm from "./CartForm";
import LogoBar from "./LogoBar";

export default function Cart() {
  const [price, setPrice] = useState(0);
  const [cart, setCart] = useState([]);
  const [deletemssg, setDeletemssg] = useState("")
  const [total, setTotal] = useState(0)


  useEffect(() => {


    var id = window.sessionStorage.getItem("userid")

    fetch("https://localhost:44344/Cartsprice/" + id)
      .then(res => res.json())
      .then((data) => {
        setPrice(data)
      })

    fetch("https://localhost:44344/Carts/" + id)
      .then(res => res.json())
      .then((data) => {
        setCart(data)
      })

    window.scrollTo(0, 0)

    console.log(cart)
  }, [])


  function RemoveItem(id) {

    fetch("https://localhost:44344/Carts/" + id,
      {
        method: 'DELETE',
        headers: { 'Content-type': 'application/json' },
      }).then(r => { r.json() }).then(res => {
        if (res) {
          console.log(res)
          window.location.reload();
        }
        else {
          console.log("failed")
          window.location.reload();
          // setDeletemssg("Delete Failed.Try Again Later")
        }
      });


  }

  function changeQty(event, obj) {

    console.log(obj)
    obj.Cart_Quantity = Number(event.target.value);
    console.log(obj)



    const demo = JSON.stringify(obj)




    fetch("https://localhost:44344/Carts/" + obj.Cart_Id,
      {
        method: 'PUT',
        headers: { 'Content-type': 'application/json' },
        body: demo
      }).then(r => { r.json() }).then(res => {
        if (res) {
          console.log(res)
          window.location.reload();
        }
        else {
          console.log("failed")
          window.location.reload();
          // setDeletemssg("Delete Failed.Try Again Later")
        }
      });



  }

  return (
    <div>

      <LogoBar />

      <div id="cart_table">
        <table className="table table-striped">
          <thead>
            <tr className="bg-light" style={{ color: "brown" }}>
              <th scope="col">Product</th>
              <th scope="col">Quantity</th>
              <th scope="col">Unit Price(&#8377;)</th>
              <th scope="col">Points to be Redeemed</th>
              <th scope="col">Total Price (&#8377;)</th>
              <th scope="col"><a>Remove</a></th>
            </tr>
          </thead>
          <tbody>

            {cart.map((img) => (

              <tr key={img.Cart_Id}>
                <th scope="row">{img.P_Name}</th>
                <td><input type="number" defaultValue={img.Cart_Quantity} min="1" max="10" onChange={e => changeQty(e, img)} style={{ width: "50px", height: "28px" }} /></td>
                <td>{img.Cart_Price}</td>
                <td>{img.Cart_Ecard_Points * img.Cart_Quantity}</td>
                <td>{img.Cart_Price * img.Cart_Quantity}</td>
                <td><button className="btn btn-secondary btn-sm" onClick={() => { RemoveItem(img.Cart_Id) }}>Remove from Cart</button></td>
                <td>{deletemssg}</td>
              </tr>
            ))}

            <td colSpan={6}><h5 style={{ marginLeft: "780px", display: "inline-block" }}>Total - <h5 style={{ marginLeft: "115px", display: "inline-block" }} >&#8377; {price} </h5></h5></td>

          </tbody>
        </table>


        <CartForm />


      </div>
    </div>
  )
}