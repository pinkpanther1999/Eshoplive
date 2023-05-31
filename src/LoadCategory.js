import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import LogoBar from "./LogoBar";
import Promotional from "./Promotional";
import Footer from "./Footer";


export default function LoadCategory() {

  const [topButton, settopButton] = useState(false);
  const [categories2, setCategories2] = useState([]);
  const [session, setSession] = useState();


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

    window.scrollTo(0, 0)


  }, [])


  const [categories, setCategories] = useState([]);
  var [level, setLevel] = useState(0);
  const navigate = useNavigate();


  useEffect(() => {
    fetch("https://localhost:44344/Categories")
      .then(res => res.json())
      .then((data) => {
        setCategories(data)
      })


    fetch("https://localhost:44344/Categories")
      .then(res => res.json())
      .then((data) => {
        setCategories2(data)
      })
    console.log(categories)
  }, [])

  function NextCategory1(cat) {
    setLevel(level = level + 1)
    console.log(cat)

    fetch("https://localhost:44344/Categories/" + cat.Cat_Name)
      .then(res => res.json())
      .then((data) => {
        setCategories(data)
      })

    console.log(categories)
  }

  function NextCategory2(cat) {
    setLevel(level = level + 1)
    console.log(cat.Flag)

    if (cat.Flag == false) {
      fetch("https://localhost:44344/Categories/" + cat.Sub_Cat_Name)
        .then(res => res.json())
        .then((data) => {
          setCategories(data)
        })

      console.log(categories.Cat_Name)
    }
    else {

      navigate('/Details/' + cat.Sub_Cat_Name)
    }
  }


  function LoadCategory(cat) {

    setLevel(level = level + 1)

    fetch("https://localhost:44344/Categories/" + cat.Cat_Name)
      .then(res => res.json())
      .then((data) => {
        setCategories(data)
      })

    console.log(categories)
  }



  return (
    <div>

      <div>

        <LogoBar />

        <nav id="navbar" className="container-fluid navbar navbar-expand-lg navbar-white bg-white ">
          <div className="container-fluid">
            <a></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse"
              data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false"
              aria-label="Toggle navigation">
              <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse justify-content-evenly " id="navbarSupportedContent">

              <a className="nav-link" onClick={() => { window.location.reload(); }}><img src="Images\home.gif" alt="home" style={{ marginRight: "5px" }} height="20px" width="22px" />Home</a>
              {categories2.map((category) => (


                <a className="nav-link" onClick={() => { LoadCategory(category) }} key={category.Cat_Id}>{category.Cat_Name}</a>

              ))}




            </div>
          </div>
        </nav>




        <Promotional />



      </div>


      <div id="load-products" className="container">
        <div className="row justify-content-evenly align-items-center">
          {categories.map((img) => (

            <div className="col-lg-3 col-md-4 col-sm-6 col-12 mb-3 mt-3 d-flex justify-content-center" key={img.Cat_Id}>
              <div>
                <div className="card" onClick={(level == 0) ? (() => NextCategory1(img)) : (() => NextCategory2(img))} style={{ width: "14rem" }}>
                  <img src={img.Cat_Image} className="card-img-top" alt="..." style={{ height: "200px" }} />
                  <div className="card-body d-flex flex-column align-items-center">




                    {((level == 0)) ? <h5 style={{ fontSize: "20px" }} className="card-title ">{img.Cat_Name}</h5> : <h5 style={{ fontSize: "20px" }} className="card-title ">{img.Sub_Cat_Name}</h5>}


                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div>
        <Footer />
      </div>
    </div>
  )

}