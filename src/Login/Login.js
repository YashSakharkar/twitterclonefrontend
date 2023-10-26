import React, { useState }  from "react";
import"./Login.css";
import { Navigate, useNavigate } from "react-router-dom";
import auth from "../firebase.init";
import { useSignInWithGoogle } from 'react-firebase-hooks/auth';
import PhoneIcon from '@mui/icons-material/Phone';
import { PhoneLogin } from "./phoneLogin/PhoneLogin";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import { RecaptchaVerifier ,signInWithPhoneNumber} from "firebase/auth";
 

const Login=()=>
{
   const[open,setOpen]=useState(false)
   const [phone,setPhone]=useState();
   const[otp,setotp]=useState();
   const[isLoading,setisLoading]=useState(false);
   const [confirmObj,setConfirmObj]=useState();
   const[openveri,setVeriOpen]=useState( )
 
    const navigate=useNavigate();
    const [signInWithGoogle, googleuser, googleloading, googleerror] = useSignInWithGoogle(auth);
    const Googlesubmit=(e)=>{
       e.preventDefault()
     signInWithGoogle(googleuser);
     if(googleuser)
     {
      console.log(googleuser)
      navigate("/home/homes")
   }
    }
    const stylelogin={
      position: 'absolute',
      top:'40%',
      left:'41%',
      translate:'translate(-50% ,-50%)',
      width:350,
      height:195,
      bgcolor:'background.paper',
      boxShadow:24,
      borderRadius:3
    }
 
    const setupRecaptha =()=>{
    window.recaptchaVerifier = new RecaptchaVerifier(auth, 'recaptcha-container', {
      'size': 'invisible',
      'callback': (response) => {
        // reCAPTCHA solved, allow signInWithPhoneNumber.
        onSignInSubmit();
      }
    });}
     
   const onSignInSubmit=(e)=>{
      e.preventDefault();
      setupRecaptha();
      const phoneNumber =`+91${phone}`;
      console.log(phoneNumber)
      const appVerifier = window.recaptchaVerifier;
      console.log(auth)
      signInWithPhoneNumber(auth, phoneNumber, appVerifier)
          .then((confirmationResult) => {
            // SMS sent. Prompt user to type the code from the message, then sign the
            // user in with confirmationResult.confirm(code).
            window.confirmationResult = confirmationResult;
            setConfirmObj(confirmationResult)
             setisLoading(true)

          }).catch((error) => {
            // Error; SMS not sent
            console.log(error)
            // ...
          });
     };   
     const onHandleOtp=(e)=>{
      e.preventDefault();
      console.log(confirmObj)
      confirmObj.confirm(otp).then((result) => {
        // User signed in successfully.
        console.log("user sign in succesfully")
        const user = result.user;
        navigate("/home/homes")
        // ...
      }).catch((error) => {
        // User couldn't sign in (bad verification code?)
        // ...
      });
     }
    return(
       <div className="conatiner">
            <div className="image-container">
                <img className="img1"src="./x.png" />
            </div>
         <div className="sign-conatiner">
         <div className="sign-cont-2">
            <h1 style={{paddingRight:53}}> Happening now</h1>
            <br/>
            <br/>
            <h3>Join twitter today</h3>
             <br/>
             <button className="btn1" style={{fontWeight:"bold"}} onClick={Googlesubmit}><img className="logo"src="./google.png"/>&nbsp;&nbsp;Sign up with Google</button>
             <br/>
             <br/>
             <br/>
              <button className="btn1" style={{fontWeight:"bold"}} onClick={()=>setOpen(true)}><PhoneIcon/> &nbsp;&nbsp;Login with Phone</button>
              <Modal 
               open= {open}
               aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={stylelogin}>
                <CloseIcon className="closebutton" onClick={()=>setOpen(false)}/> 
                 <h5 style={{paddingLeft:47,paddingTop:10}}>Enter your Mobile Number</h5>
                 <form  onSubmit={onSignInSubmit}>
                 <div id='recaptcha-container'></div>
                  <input type="number"className="mobileinput" onChange={(e)=>{setPhone(e.target.value)}}/><br/>
                  <input type="submit" value="Send Otp" placeholder="Enter"  className="mobilesubmit" onClick={()=>setVeriOpen(true)}/>
                 </form>
                </Box> 
              </Modal>
              {isLoading ?<Modal 
                        open= {openveri}
                            aria-labelledby="modal-modal-title"
                                 aria-describedby="modal-modal-description">
                                   <Box sx={stylelogin}>
                                     <CloseIcon className="closebutton" onClick={()=>{setVeriOpen(false); setOpen(false)}}/> 
                                <h5 style={{paddingLeft:47,paddingTop:10}}>Enter the OTP</h5>
                              <form onSubmit={onHandleOtp}>
                            <input type="number"className="mobileinput" onChange={(e)=>setotp(e.target.value)}/><br/>
                          <input type="submit" value="Enter Otp" className="mobilesubmit"  />
                       </form>
                    </Box> 
              </Modal>:" "}
               <br/>
              <br/>
              <p style={{fontSize :16,textAlign :"left",paddingLeft:200}}> or</p> 
             <button className="btn1 " style={{backgroundColor:"#4285f4",color:"white"}} onClick={(e)=>{ navigate("/CreateAccount");e.preventDefault()}}   >create account</button> <br/>
             <br/>
             <p> By signing up, you agree to the Terms of Service and Privacy Policy<br/>, including Cookie Use.</p>
             <br/>
             
          <p style={{fontSize:14,fontWeight:"bold"}}> Already have an account ?</p>   
              
             <button className="btn1" style={{color:"blue",fontWeight:"bold"}} onClick={()=>{ navigate("/singin")}}>Sign in</button>
        
         </div>
         </div>
       </div> 
    );

}
export default Login;
