import React, { useContext, useEffect, useState } from 'react';
import { useFormik } from 'formik';
import * as yup from 'yup';
import LogoBar from './LogoBar';
import { useNavigate, useParams } from "react-router-dom";
import Footer from './Footer';
export default class SignUp extends React.Component {
    render() {
        return (
            <div>
                <YUser />
            </div>
        );
    }
}
function YUser() {
    const [mssg, setMssg] = useState();
    const [username, setUserName] = useState();
    const [usertest, setUsertest] = useState()
    const [validation, setValidation] = useState("")
    const navigate = useNavigate();

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])

    const handleChangeOne = () => {
        console.log("test1")
        formik.values.ECard_Points = 0
    };

    const handleChangetwo = () => {
        console.log("test2")
        formik.values.ECard_Points = -1
    }

    const handleBlur = (event) => {
        console.log(typeof (event.target.value))

        var pattern = /^(?=.*?[A-Z,a-z])[\w\h-]{3,20}$/gm

        if (event.target.value == "") {
            setValidation("Please Enter Username")
            setUsertest(false)
        }
        else if (event.target.value.length <= 3 || event.target.value.length > 16) {
            setValidation("No of Characters should be Between 3 and 16")
            setUsertest(false)
        }

        else if ((pattern.test(event.target.value)) == false) {
            setValidation("Should not include any special character!")
            setUsertest(false)
        }
        else {
            fetch("https://localhost:44344/Users/" + event.target.value)
                .then(r => {
                    return r.json()
                }).then(res => {

                    if (res == false) {
                        setValidation("Username already exists")
                        setUsertest(false)
                    }
                    else {
                        setUsertest(true)
                    }
                });
        }
    }

    const formik = useFormik({
        initialValues: {
            U_First_Name: '',
            U_Last_Name: '',
            U_Mobile: '',
            U_Email: '',
            U_Username: '',
            U_Password: '',
            Confirm_Password: '',
            ECard_Points: ''
        },
        validationSchema: yup.object({
            U_First_Name: yup.string()
                .required('Please Enter First Name'),

            U_Last_Name: yup.string()
                .max(20, 'Name should not exceed 20 Characters')
                .required('Please Enter Last Name'),

            U_Mobile: yup.number()
                .positive('PhoneNumber Cannot be Negative')
                .max(9999999999, 'Phone Number should be of 10 digits')
                .min(1000000000, 'Phone Number should be of 10 digits')
                .required('Please Enter Mobile Number'),

            U_Email: yup.string()
                .matches(/^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i, ' sample@gmail.com ')
                .email('Invalid email address')
                .max(40, 'Name should not exceed 40 Characters')
                .required('Please Enter Email Id'),

             U_Username: yup.string()
                .matches(/^[A-Za-z0-9]{3,20}$/, 'Should not include any special character!')
                .min(3, 'UserName should be atleast 3 characters')
                .max(16, 'Name should not exceed 16 Characters')
                .required('Please Enter Username'),

            U_Password: yup.string()
                .matches(/^^(?=.*[0-9])(?=.*[!@#$%^&*])[a-zA-Z0-9!@#$%^&*]{8,16}$/, 'Password should be 8-16 characters and include at least 1 letter, 1 number and 1 special character!')
                .min(6, 'Password must be atleast 6 Characters   Sample:Xyz123@')
                .max(15, 'Password must be less than 15 Characters')
                .required('Please Enter Password'),

            Confirm_Password: yup.string()
                .oneOf([yup.ref('U_Password'), null], 'Passwords must match'),

            ECard_Points: yup.number()
                .required("Please select either 'Yes' or 'No' to continue")
        }),
        onSubmit: values => {

            console.log(values.U_Username)
            var md5 = require("md5");
            values.U_Password = md5(values.U_Password);
            values.Confirm_Password = md5(values.Confirm_Password);

            console.log(values.U_Password)

            let demo = JSON.stringify(values)
            console.log(values)

            if (usertest != false) {
                fetch("https://localhost:44344/Users",
                    {
                        method: 'POST',
                        headers: { 'Content-type': 'application/json' },
                        body: demo
                    }).then(r => {
                        return r.json()
                    }).then(res => {
                        window.sessionStorage.setItem("userid", res.U_Id)
                        console.log(res)
                        setMssg(res)

                        navigate("/Address")
                    });
            }
        },
    });

    return (
        <div>
            <LogoBar />
            <div className="container shadow p-5" style={{ maxWidth: "500px", marginTop: "100px" }}>
                <h1>Sign Up</h1>
                <form onSubmit={formik.handleSubmit}>
                    <div className='form-group'>
                        <p>
                            <label className="form-label" htmlFor="firstname">First Name : </label>
                            <input id="firstname" className="form-control" placeholder='Enter First Name' onKeyUp={formik.handleBlur} type="text" name="U_First_Name"
                                value={formik.values.U_First_Name}
                                {...formik.getFieldProps("U_First_Name")}></input>
                            {formik.touched.U_First_Name && formik.errors.U_First_Name ?
                                <span style={{ color: 'red' }}>{formik.errors.U_First_Name}</span> : null}
                        </p>
                    </div>

                    <div className='form-group'>
                        <p>
                            <label className="form-label" htmlFor="lastname">Last Name : </label>
                            <input id="lastname" className="form-control" placeholder='Enter Last Name' type="text" name="U_Last_Name"
                                value={formik.values.U_Last_Name}
                                {...formik.getFieldProps("U_Last_Name")}></input>
                            {formik.touched.U_Last_Name && formik.errors.U_Last_Name ? <span style={{ color: 'red' }}>{formik.errors.U_Last_Name}</span> : null}
                        </p>
                    </div>

                    <div className='form-group'>
                        <p>
                            <label className="form-label" htmlFor="mobile">Mobile Number : </label>
                            <input id='mobile' className="form-control" placeholder='Enter Mobile Number' type="text" name="U_Mobile"
                                value={formik.values.U_Mobile}
                                {...formik.getFieldProps("U_Mobile")}></input>
                            {formik.touched.U_Mobile && formik.errors.U_Mobile ? <span style={{ color: 'red' }}>{formik.errors.U_Mobile}</span> : null}
                        </p>
                    </div>

                    <div className='form-group'>
                        <p>
                            <label className="form-label" htmlFor="Email">Email : </label>
                            <input id='Email' className="form-control" placeholder='Enter Email' type="text" name="U_Email"
                                value={formik.values.U_Email}
                                {...formik.getFieldProps("U_Email")}></input>
                            {formik.touched.U_Email && formik.errors.U_Email ? <span style={{ color: 'red' }}>{formik.errors.U_Email}</span> : null}
                        </p>
                    </div>

                    <div className='form-group'>

                        <p>
                            <label className="form-label" htmlFor="username">Username :</label>
                            <input id='username' className="form-control" placeholder='Enter UserName' {...formik.getFieldProps("U_Username")} type="text" name="U_Username" onBlur={handleBlur} value={formik.values.U_Username}  ></input>
                            {formik.touched.U_Username && formik.errors.U_Username ? <span style={{ color: 'red' }}>{formik.errors.U_Username}</span> : null}
                            {(usertest == true) ? (null) : <span>{validation}</span>}
                        </p>
                    </div>

                    <div className='form-group'>
                        <p>
                            <label className="form-label" htmlFor="password">Password : </label>
                            <input id='password' className="form-control" placeholder='Enter Password' type="password" name="U_Password"
                                value={formik.values.U_Password}
                                {...formik.getFieldProps("U_Password")}></input>
                            {formik.touched.U_Password && formik.errors.U_Password ? <span style={{ color: 'red' }}>{formik.errors.U_Password}</span> : null}
                        </p>
                    </div>

                    <div className='form-group'>
                        <p>
                            <label className="form-label" htmlFor="confirmpassword">Confirm Password : </label>
                            <input id='confirmpassword' className="form-control" placeholder='Confirm Password' type="password" name="Confirm_Password"
                                value={formik.values.Confirm_Password}
                                {...formik.getFieldProps("Confirm_Password")}></input>
                            {formik.touched.U_Password && formik.errors.Confirm_Password ? <span style={{ color: 'red' }}>{formik.errors.Confirm_Password}</span> : null}
                        </p>
                    </div>

                    <p>
                        <label className="form-label">Do you want E-Card Membership?  : </label>
                        <div className="form-check-inline">
                            <input className="form-check-input" type="radio" name="ECard_Points" onChange={handleChangeOne} />
                            <label className="form-check-label" >
                                Yes
                            </label>
                        </div>
                        <div className="form-check-inline">
                            <input className="form-check-input" type="radio" name="ECard_Points" onChange={handleChangetwo} />
                            <label className="form-check-label" >
                                No
                            </label>
                        </div>
                        {formik.touched.ECard_Points && formik.errors.ECard_Points ? <span style={{ color: 'red' }}>{formik.errors.ECard_Points}</span> : null}
                    </p>

                    <button className="register" type="submit">Register</button>
                    {(mssg != null) ? <h4>Registered Successfully</h4> : <h3></h3>}
                </form>
            </div>
            <div>
                <Footer />
            </div>
        </div>
    )
}