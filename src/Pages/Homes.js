import React, { useEffect, useState } from "react";
import"./Page.css";
import { Tweetbox } from "./Tweetbox";
import { Box, Divider, Modal } from "@mui/material";
 import { Posts } from "./Posts";
import { useLogginUser } from "../hooks/useLogginUser";
import CloseIcon from '@mui/icons-material/Close';
import { Tweetboxpaid } from "./Tweetboxpaid";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const Homes=()=>{
 const[posts,setPosts]=useState([])
 const[isloading,setisLoading]=useState(true);
 const[open,setOpen]=useState(true)
 const[freeopen,setFreeopen]=useState(false);
 const[paidopen,setpaidopen]=useState(false);
 const[email,setEmail]=useState()
 const[paymentid,setpaymentid]=useState()
 const[registeredemail,setregisteredemail]=useState()
 const[emailopen,setEmailOpen]=useState(false)
const [loginuser]= useLogginUser();
const[amount,setamount]=useState()
const navigate=useNavigate();
 const stylelogin={
  position: 'absolute',
  top:'32%',
  left:'33%',
  translate:'translate(-50% ,-50%)',
  width:450,
  height:320,
  bgcolor:'background.paper',
  boxShadow:24,
  borderRadius:3
}
 useEffect(()=>{
     
      fetch(`http://localhost:5000/post`)
      .then(res=>res.json()).then(data=> {
       // console.log(data)
       setPosts(data)
      })

 },[posts])
 const handleFreePost=()=>{
          setOpen(false)
          setFreeopen(true)
 }
 const loadScript=(src)=>{
  
  console.log(src)
  return new Promise((resolve)=>{
    const script=document.createElement('script')
    script.src=src;
    console.log(script)
    script.onload=(e)=>{
      console.log(e)
      resolve(true)
    }
    script.onerror=(e)=>{
      console.log(e)
      resolve(false)
    }
    document.body.appendChild(script)
    //console.log( document.body.appendChild(script))
  })
 }
  //console.log(amount)
 const handlepaidpost=async(amount)=>{
  //setEmailOpen(true)
  setOpen(false)
 //setOpen(false)
  const res=  await loadScript('https://checkout.razorpay.com/v1/checkout.js')
  console.log(res)
  if(!res){
    console.log("failed to load")
    return;
  }
  const options={
    key:"rzp_test_AfirB2i6ta9nMw",
    currency:"INR",
    amount:amount*100,
    name:"Yash Sakharkar",
    description:"Thanks to",
    handler:function(res){
    console.log(res.razorpay_payment_id)
     //setpaymentid(res.razorpay_payment_id)
     console.log("payment suceesful")
      customerinfo(res)
    },
    profile:{
      name:"Yash Sakharkar"
    }
  }
  const payment=new window.Razorpay(options)   
   const j=email
   fetch(`http://localhost:5000/payment?email=${j}`).then(res=>res.json()).then((data)=>{
    console.log(data)
    console.log(data.length)
    if(amount==100)
    {
   for(let i=0;i<data.length;i++)
    {
    if(email==data[i]?.email)
    {
      if(data[i]?.amount==100)
      {
        console.log("already taken subscription")
        alert("Already have subscirebd")
        setpaidopen(true)
        return;
      }
    }
  }
}
if(amount==1000)
{
    for(let i=0;i<data.length;i++)
   // {
    if(email==data[i]?.email)
    {
      if(data[i]?.amount==1000)
      {
        console.log("already taken subscription")
        alert("Already have subscirebd")
        setpaidopen(true)
        return;
      }
    }
  }
    console.log("no subsciption available")
     payment.open();
    
 // }
   })
   const customerinfo=(res)=>{
    const customerdetail={
      email:email,
   payment_id:res.razorpay_payment_id,
      amount:amount
    }
    console.log(customerdetail)
  
    const data= axios.post("http://localhost:5000/payment",customerdetail)
    console.log(data)
    console.log("payment succesfull")
   }
 // const customerdetail={
 //   email:email,
  //  payment_id:payment.id,
 //   amount:amount
 // }
  //console.log(customerdetail)
// const data= axios.post("http://localhost:5000/payment",customerdetail)
 //console.log(data)
  //payment.open();
 // console.log(payment.id)
 // setOpen(false)
 //console.log(payment.id)
 //if(payment.id){
    // setpaidopen(true)
 //}
 // else{
   // payment.open();
 // }
 }
    return( 
       <>
  { isloading?<Modal open= {open}
               aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
          <Box sx={stylelogin}>
           
          <br/>
           
           <span className="subsheader">Hello <b>{loginuser[0]?.name}</b>, please subscribe to start your tweets</span><br/><br/>
           <form> 
           <div className="border">  
            <input type="radio" id="free" name="1" className="box" /> <label style={{paddingLeft:3,cursor:"pointer"}} htmlFor="free" onClick={handleFreePost}>Free Plan 1/ day</label><br/>
            </div>
            <div className="border">  
            <input type="radio" id="silver" name="1"value="100" className="box"/><label style={{paddingLeft:3,cursor:"pointer"}}htmlFor="silver"  onClick={()=>{setamount(100);setEmailOpen(true)}} onChange={(e)=>setamount(e.target.value)}>Silver Plan get 5 post / day for just 100 rs/Month </label><br/>
            </div>
            <div className="border"> 
            <input type="radio" id="gold"  name="1"  value="1000" className="box"/> <label style={{paddingLeft:3,cursor:"pointer"}}htmlFor="gold"  value="1000"onClick={()=>{setamount(1000);setEmailOpen(true)}} >Gold Plan get unlimited post / day for just 1000 rs/Month </label>
            </div>
            {
              emailopen? <Modal 
               open= {emailopen}
               aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description">
                <Box sx={stylelogin}>
                <CloseIcon  className="closebutton1" onClick={()=>setOpen(false)} /> 
                    <form onSubmit={()=>handlepaidpost(amount)}>
                      <input type="email" placeholder="Enter your Email" required style={{marginLeft:90,marginTop:90,paddingLeft:40,width:300}} onChange={(e)=>setEmail(e.target.value)}/><br/>
                      <input type="submit" value="Subscribe" className="subscribebutton" />
                    </form>
                </Box> 
              </Modal>
            :" " }
            </form>
          </Box>
        </Modal>: " "}
     <div className="page">
       <div  className="page_title">
     <span >Home</span>
     </div>
      <Divider/>
     { freeopen?<Tweetbox/>:" "}
     {paidopen?<Tweetboxpaid amount={amount}/>: " "}
      {
        posts.map(p=><Posts key={p._id} p={p}/>)
      }  
     </div>
     
     </>
    );
}
export {Homes}