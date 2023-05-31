import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Login from "./Login";

export default function LogoBar() {


  const [topButton, settopButton] = useState(false);
  const navigate = useNavigate();
  const [session, setSession] = useState();
  const [userN, setUserN] = useState([]);
  const [count, setCount] = useState();
  const [price, setPrice] = useState();
  const [user, setUser] = useState();



  useEffect(() => {
    window.addEventListener("scroll", () => {
      if (window.scrollY > 50) {
        settopButton(true)
      }
      else {
        settopButton(false)
      }
    })

    setSession(window.sessionStorage.getItem("userid"))

    var userid = window.sessionStorage.getItem("userid")
    setUser(userid)


    if (userid != null) {



      fetch("https://localhost:44344/Cartscount/" + userid)
        .then(res => res.json())
        .then((data) => {
          setCount(data)
        })

      fetch("https://localhost:44344/Users/" + userid)
        .then(res => res.json())
        .then((data) => {
          setUserN(data)
        })


      fetch("https://localhost:44344/Cartsprice/" + userid)
        .then(res => res.json())
        .then((data) => {
          setPrice(data)
        })

    }



  }, [])



  function topFunction() {
    window.scrollTo({
      top: 0,
      behavior: "smooth"
    })
  }

  function Logout() {

    window.sessionStorage.removeItem("userid")
    window.sessionStorage.removeItem("aid")
    navigate("/Home")
    window.location.reload()

  }

  return (
    <div>


      {topButton ? (<button onClick={topFunction} id="myBtn" ><i style={{ fontSize: "50px" }} className="bi bi-arrow-up-circle-fill"></i></button>) : (null)}

      <nav id="searchbar" className="container-fluid navbar navbar-expand-lg navbar-white bg-white">

        <div className="container-fluid">
          <a></a>
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
            data-bs-target="#searchbar-content" aria-controls="searchbar-content" aria-expanded="false"
            aria-label="Toggle navigation">
            <span className="navbar-toggler-icon"></span>
          </button>

          <div id="searchbar-content" className="collapse navbar-collapse justify-content-evenly">
            <a className="navbar-brand" href="/Home">
              <img onClick={() => { navigate('/Home') }} src="/Images/eshop.png" alt="" width="175" height="100" />
            </a>
            {/* <div>
        <form className="d-flex" role="search">
          <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
          <button className="btn btn-outline-success" type="submit">{session}</button>
        </form>
      </div> */}

            <div className="d-flex">

              <div>
                {(session == null) ? <button onClick={() => { navigate('/Login') }} type="button" className="btn btn-outline-success mx-2" >
                  Login
                </button> : <button onClick={() => { Logout() }} type="button" className="btn btn-outline-success mx-2" >
                  Logout
                </button>}

                {session == null ? null : (

                  <button

                    onClick={() => navigate("/Address")}

                    className="btn btn-outline-success mx-2"

                    type="submit"

                  >

                    {userN.U_First_Name + "  "}{userN.U_Last_Name}

                  </button>

                )}


                {((session == null)) ? <button onClick={() => (navigate('/Signup'))} className="btn btn-outline-success mx-2" type="submit">SignUp</button> : (null)}
              </div>
            </div>

                  <div style={{marginLeft:"600px"}}>
            {(session == null) ? (null) : <div id="cart-info" onClick={() => (navigate('/Cart'))} className="d-flex justify-content-evenly">
              <div>
                <div><span style={{ color: "maroon", fontSize: "30px"}}><i className="bi bi-cart-fill"></i></span></div>
              </div>
              <div className="d-flex flex-column" style={{ color: "white", fontWeight: "bold",borderRadius:"2px",height:"36px" }}>
                {(user != null) ? <><a><span style={{fontSize:"15px"}}>{count}</span></a>
                  <a><span>&#8377;{price} </span></a></> : (null)}
              </div>
            </div>}
            </div>
          </div>
        </div>
      </nav>
    </div>
  )

}