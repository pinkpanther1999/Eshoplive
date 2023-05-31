import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

function Promotional() {


  const [promo, setPromo] = useState([])
  const [product, setProduct] = useState([])
  const navigate = useNavigate()
  var [count, setCount] = useState(0)

  useEffect(() => {
    fetch("https://localhost:44344/Promotions")
      .then(res => res.json())
      .then((data) => {
        setPromo(data)
      })

    console.log(promo.Promotion_Poster)

  }, [])

  
  return (
    <div>
      <div id="promotional">
        <div id="carouselExampleInterval" className="carousel slide" data-bs-ride="carousel">
          <div className="carousel-inner">

            {promo.map((img, index) => (

              <div className={(index==0)?"carousel-item active":"carousel-item"} data-bs-interval="2500" key={img.Promotion_Id}>
                <img onClick={() => { navigate('/Details/' + img.Product_P_Id) }} src={img.Promotion_Poster} height={350} className="d-block w-100" alt="..." />
              </div>

            ))}

          </div>
          <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="prev">
            <span className="carousel-control-prev-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Previous</span>
          </button>
          <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleInterval" data-bs-slide="next">
            <span className="carousel-control-next-icon" aria-hidden="true"></span>
            <span className="visually-hidden">Next</span>
          </button>
        </div>
      </div>
    </div>

  )
}
export default Promotional;

