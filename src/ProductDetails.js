import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LoadCategory from "./LoadCategory";
import LogoBar from "./LogoBar";
import Footer from "./Footer";

export default function ProductDetails() {


  const [products, setProducts] = useState([]);
  const [config, setConfig] = useState([]);
  const [conflag, setConflag] = useState(false)
  const [quantity, setQuantity] = useState(1);
  const { name } = useParams();
  const [mssg, setMssg] = useState("");
  const navigate = useNavigate();
  const [session, setSession] = useState();
  const [cartprice, setCartPrice] = useState(0);
  const [cartcoins, setCartCoins] = useState(0)
  const [radio, setRadio] = useState(false);




  useEffect(() => {
    console.log(name)




    fetch("https://localhost:44344/Products/" + name)
      .then(res => res.json())
      .then((data) => {
        setProducts(data)
      })

    setSession(window.sessionStorage.getItem("userid"))

    setCartPrice(products[0]?.P_Emart_Price)
    setCartCoins(0)

    console.log("hii" + cartprice)
    console.log("ew" + cartcoins)


    window.scrollTo(0, 0)



  }, [])
  function BuyNow(obj){

    var userid = session;
    console.log(session)

    if (conflag == false) {

      console.log("hkj")

      var cartobj = {
        Cart_Quantity: quantity,
        Cart_Price: cartprice,
        Cart_Ecard_Points: cartcoins,
        User_U_Id: session,
        ProductP_Id: products[0].P_Id,
        ConfigurationConfig_Id: products[0].Config_Id
      };
    }

    if (conflag == true) {
      var cartobj = {
        Cart_Quantity: quantity,
        Cart_Price: cartprice,
        Cart_Ecard_Points: cartcoins,
        User_U_Id: session,
        ProductP_Id: obj.Product_P_Id,
        ConfigurationConfig_Id: obj.Config_Id

      };
      console.log("true")
    }

    let demo = JSON.stringify(cartobj)
    console.log(demo)


    fetch("https://localhost:44344/Carts",
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: demo
      }).then(r => { return r.json() }).then(res => {
        if (res) {
          navigate('/Cart');
        }
        else{
          setMssg("Something Went Wrong.Please Try Again")
        }
      });
    

  }
  function ChangeConfig(id) {

    setConflag(true);
    console.log(id)
    fetch("https://localhost:44344/Configurations/" + id)
      .then(res => res.json())
      .then((data) => {
        setConfig(data)
      })

    console.log(config)


  }

  function setQty(event) {

    setQuantity(event.target.value)
    console.log(quantity)
  }

  function AddtoCart(obj) {

    var userid = session;
    console.log(session)

    if (conflag == false) {


      var cartobj = {
        Cart_Quantity: quantity,
        Cart_Price: cartprice,
        Cart_Ecard_Points: cartcoins,
        User_U_Id: session,
        ProductP_Id: products[0].P_Id,
        ConfigurationConfig_Id: products[0].Config_Id
      };
    }

    if (conflag == true) {
      var cartobj = {
        Cart_Quantity: quantity,
        Cart_Price: cartprice,
        Cart_Ecard_Points: cartcoins,
        User_U_Id: session,
        ProductP_Id: obj.Product_P_Id,
        ConfigurationConfig_Id: obj.Config_Id

      };
      console.log("true")
    }

    let demo = JSON.stringify(cartobj)
    console.log(demo)


    fetch("https://localhost:44344/Carts",
      {
        method: 'POST',
        headers: { 'Content-type': 'application/json' },
        body: demo
      }).then(r => { return r.json() }).then(res => {
        if (res) {
          setMssg("Added To Cart")

        }
        window.location.reload();
      });
    

     
  }



  function takePrice1(event) {

    setRadio(true)

    let price2, coin2;


    if (conflag == true) {
      price2 = config[0]?.P_Emart_Price
      coin2 = 0;

      setCartPrice(price2)

      setCartCoins(coin2)

      console.log(cartprice + " " + cartcoins)
    }
    else {
      setCartPrice(products[0]?.P_Emart_Price)
      setCartCoins(0)
      console.log(cartprice + " " + cartcoins)
    }


  }

  function takePrice2(event) {

    setRadio(true)
    let price, coin;

    console.log("h2")

    if (conflag == true) {
      price = config[0]?.P_Emart_Disc_Price
      coin = config[0]?.P_Emart_Disc_Points

      setCartPrice(price)

      setCartCoins(coin)

      console.log(cartprice + " " + cartcoins)
    }
    else {
      setCartPrice(products[0]?.P_Emart_Disc_Price)
      setCartCoins(products[0]?.P_Emart_Disc_Points)
      console.log(cartprice + " " + cartcoins)
    }

  }


  return (
    <div>

      <LogoBar />




      <div id="outer-container">

        <div id="main-container" className="container-fluid ">
          <div className="row ">

            <div className="col-lg-6">
              <div className="d-flex">

                <div className="main-img d-flex flex-column justify-content-evenly align-items-center">
                  <img id="main-image" className="img-fluid" src={products[0]?.P_Image1} />
                  <div className="d-flex">
                    {/*{products.map((con) => (
                      <button className="config" onClick={() => { ChangeConfig(con.Config_Id) }} key={con.Config_Id}>{con.Config_Desc}</button>
                    ))}*/}
                  </div>
                </div>
              </div>

            </div>
            <div className="col-lg-6 ">
              <div id="description" className="mx-5 my-3">
                <h3 style={{ marginTop: "50px" }}><span className="pdetails">{products[0]?.P_Name}</span></h3>

                <h5 style={{ marginTop: "20px" }}><span id="mrp"><b>M.R.P:</b></span><span style={{ paddingLeft: "10px",fontSize:"16px" }}
                  className="a-price-symbol"><strike>&#8377; {(conflag == false) ? products[0]?.P_MRP : config[0]?.P_MRP}</strike></span></h5>

                <div className="form-check">
                  <input onClick={takePrice1} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios1" value="option1"/>
                  <label className="form-check-label" htmlfor="exampleRadios1">
                    <span id="emartprice" style={{ fontSize: "20px" }}><b>Eshop Price(per Kg) : &nbsp;&nbsp;&#8377;&nbsp;{(conflag == false) ? products[0]?.P_Emart_Price : config[0]?.P_Emart_Price}</b></span>
                  </label>
                </div>
                <div className="form-check">
                  <input onClick={takePrice2} className="form-check-input" type="radio" name="exampleRadios" id="exampleRadios2" value={{ a: "1", b: "2" }} />
                  <label className="form-check-label" htmlfor="exampleRadios2">
                    <span id="emartprice" style={{ fontSize: "20px" }}><b>Eshop Discount Price(per Kg) : &#8377;{(conflag == false) ? products[0]?.P_Emart_Disc_Price : config[0]?.P_Emart_Disc_Price} + E-Card Points : {(conflag == false) ? products[0]?.P_Emart_Disc_Points : config[0]?.P_Emart_Disc_Points} </b></span>
                  </label>
                </div>




                <div>
                  <span style={{ fontSize: "18px",color:"black"}}>Quantity (in Kg): </span>
                  <input type="number" defaultValue={1} onChange={setQty} min="1" max="10" style={{ width: "50px", height: "34px" }} />
                </div>


                  
                
                {(session==null)?<button onClick={() => { navigate('/Login') }} type="button" id="cart" className="btn"><span style={{ color: "white" }}><i style={{ marginBottom: "2px" }}
                    className="bi bi-cart-fill"></i><b style={{ paddingLeft: "10px" }}>ADD TO
                      CART</b></span></button>:<>{(radio==false)?<button disabled onClick={() => { AddtoCart(config[0]) }} type="button" id="cart" className="btn"><span style={{ color: "white" }}><i style={{ marginBottom: "2px" }}
                  className="bi bi-cart-fill"></i><b style={{ paddingLeft: "10px" }}>ADD TO
                    CART</b></span></button>:
                    <button onClick={() => { AddtoCart(config[0]) }} type="button" id="cart" className="btn"><span style={{ color: "white" }}><i style={{ marginBottom: "2px" }}
                    className="bi bi-cart-fill"></i><b style={{ paddingLeft: "10px" }}>ADD TO
                      CART</b></span></button>}<span style={{marginTop:"5px"}}>{mssg}</span> </>}

                
                      {(session==null)?<button onClick={() => { navigate('/Login') }} type="button" id="buy" className="btn"><span style={{ color: "white" }}><i
                  className="bi bi-bag-fill"></i><b style={{ paddingLeft: "10px" }}>BUY
                    NOW</b></span></button>:<>{(radio==false)?<button disabled onClick={() => { BuyNow(config[0]) }} type="button" id="buy" className="btn"><span style={{ color: "white" }}><i
                  className="bi bi-bag-fill"></i><b style={{ paddingLeft: "10px" }}>BUY
                  NOW</b></span></button>:
                    <button onClick={() => { BuyNow(config[0]) }} type="button" id="buy" className="btn"><span style={{ color: "white" }}><i
                    className="bi bi-bag-fill"></i><b style={{ paddingLeft: "10px" }}>BUY
                    NOW</b></span></button>} </>}

                    <p id="productdesc">PRODUCT DETAILS</p>
               
                <p id="description-content"> {products[0]?.P_Description}&nbsp;&nbsp;{(conflag == false) ? products[0]?.Config_Desc : config[0]?.Config_Desc}</p>

                {/* <a href="Cart.js">Procced To Checkout</a> */}
              </div>
            </div>
          </div>


        </div>
      </div>
      <div>
        <Footer/>
      </div>
    </div>
  )
}