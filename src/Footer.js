import React from "react";

export default function Footer() {

  return (

    <div>
      <footer className="text-center text-lg-start bg-light text-muted " style={{ paddingTop: "5px" }}>
        <section className="">
          <div className="container text-center text-md-start mt-5">
            {/* <!-- Grid row --> */}
            <div className="row mt-5">
              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-4 col-xl-3 mx-auto mb-4">
                {/* <!-- Content --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  <i className="fas fa-gem me-3"></i>E-Shop
                </h6>
                <p>
                  E-Shop is guided by four principles: customer obsession rather than competitor focus, 
                  passion for invention, commitment to operational excellence, and long-term thinking. 
                  E-Shop strives to be Earth’s most customer-centric company, 
                  Earth’s best employer, and Earth’s safest place to work
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-3 col-lg-2 col-xl-2 mx-auto mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">
                  Useful links
                </h6>
                <p>
                  <a id="useful_link" href="Home" >Home</a>
                  </p>
                  <p>
                  <a id="useful_link" href="SignUp">Register Now</a>
                </p>
              </div>
              {/* <!-- Grid column --> */}

              {/* <!-- Grid column --> */}
              <div className="col-md-4 col-lg-3 col-xl-3 mx-auto mb-md-0 mb-4">
                {/* <!-- Links --> */}
                <h6 className="text-uppercase fw-bold mb-4">Contact</h6>
                <p> CDAC PATNA </p>
                <p id="useful_link">
                  diveshpawar.dp@gmail.com
                </p>
                <p id="useful_link"> +1 999 999 99</p>
                <p id="useful_link"> +1 234 567 89</p>
              </div>
              {/* <!-- Grid column --> */}
            </div>
            {/* <!-- Grid row --> */}
          </div>
        </section>
        {/* <!-- Section: Links  --> */}

        {/* <!-- Copyright --> */}
        <div className="text-center p-4" style={{ backgroundColor: "rgba(0, 0, 0, 0.05)" }}>
          © 2023 Copyright:
          <a>E-Shop.com</a>
        </div>
        {/* <!-- Copyright --> */}
      </footer>
    </div>
  )

}