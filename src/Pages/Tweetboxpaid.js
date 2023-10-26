import React, { useEffect, useState } from "react";
import"./Page.css"
import"./Tweet.css"
import { Avatar, Divider } from "@mui/material";
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import axios from "axios";
import { useAuthState } from "react-firebase-hooks/auth";
import auth from "../firebase.init";
import { useLogginUser } from "../hooks/useLogginUser";
import { Box, IconButton, Modal } from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
const Tweetboxpaid=({amount})=>{
    const[post,setPost]=useState('')
    const[imageurl,setImageUrl]=useState('')
    const[name,setName]=useState('')
    const[username,setUsername]=useState('')
    const [isLoading,setIsLoading]=useState('')
     const [isLocked,setisLocked]=useState(false)
     const [cometommorow,setComeTommorow]=useState(false)
     const [count,setCount]=useState(1)
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
    const [loginuser]= useLogginUser();
       //    const profileImage=loginuser[0]?.profileImage;
        //  const coverImage=loginuser[0]?.coverImage;
    const profilepic =loginuser[0]?.profilepic ? loginuser[0]?.profilepic : "https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png";
    const [user]=useAuthState(auth);
     const email=user?.email;
   //console.log(email)
    const handleimage=(e)=>{
        e.preventDefault()
        setIsLoading(true)
        console.log('click')
        const image=e.target.files[0];
        const formdata=new FormData();
        formdata.set('image',image);
        axios.post("https://api.imgbb.com/1/upload?key=2ff4c459eb4c8b8ed4d7c5bdb063d953",formdata)
        .then(res=>{  
             setImageUrl(res.data.data.display_url)
            console.log(res.data.data.display_url)
            setIsLoading(false)
        }
            ).catch((error)=>{
                console.log(error)
                setIsLoading(false)
            })
        
    }
    
    const handletweet=(e)=>{
        e.preventDefault()
       console.log('click '); 
       if(isLocked)
      {
      console.log("Already tweeted")
        setPost("")
        setComeTommorow(true)
       }
        
      if(!isLocked)
      {
        if(amount==100)
        {
        //setisLocked(true)
        console.log('click'); 
       // console.log(count)
        console.log(user.providerData[0].providerId)
      if(user.providerData[0].providerId==='password')
      {
        fetch(
            fetch(`http://localhost:5000/loginuser?email=${email}`)
    .then(res=>res.json()).
   then(data=> {
    console.log(data[0]?.name)
    setName(data[0]?.name)
    console.log(data[0]?.userName)
setUsername(data[0]?.userName)})
        )
   }
        const userpost={
            post:post,
           image:imageurl,
           name:loginuser[0]?.name,
           username:loginuser[0]?.userName,
           email:email
        }
        console.log(post)
        console.log(userpost)
        setPost('')
        setImageUrl('')
    const data = axios.post(`http://localhost:5000/post`,userpost)
    console.log(data)
    setCount(count + 1)
    console.log(count)
    alert("You have Succesfully tweeted "+count+"/5 times")
       //fetch(`http://localhost:5000/post`,
   //  {
      //    method:"POST",
      //     headers:{
       //         'content-type':'application/json'
       //    },
       //    body: JSON.stringify(userpost)
   //    })
     //  .then(res=> res.json())
     //   .then(data=>
     //    {console.log(data)}).catch(err=>{
       //        console.log(err)
       //     })          
} 
if(count==5)
{
 setisLocked(true)
 setTimeout(()=>{
    setisLocked(false)
    count = 0;
    console.log("count after 10 sec "+count)
},  86400000)
}
}
if(amount==1000)
{
      //setisLocked(true)
      console.log('click'); 
     // console.log(count)
      console.log(user.providerData[0].providerId)
    if(user.providerData[0].providerId==='password')
    {
      fetch(
          fetch(`http://localhost:5000/loginuser?email=${email}`)
  .then(res=>res.json()).
 then(data=> {
  console.log(data[0]?.name)
  setName(data[0]?.name)
  console.log(data[0]?.userName)
setUsername(data[0]?.userName)})
      )
 }
      const userpost={
          post:post,
         image:imageurl,
         name:loginuser[0]?.name,
         username:loginuser[0]?.userName,
         email:email
      }
      console.log(post)
      console.log(userpost)
      setPost('')
      setImageUrl('')
  const data = axios.post(`http://localhost:5000/post`,userpost)
  console.log(data)
   
  alert("You have Succesfully tweeted ")
     //fetch(`http://localhost:5000/post`,
 //  {
    //    method:"POST",
    //     headers:{
     //         'content-type':'application/json'
     //    },
     //    body: JSON.stringify(userpost)
 //    })
   //  .then(res=> res.json())
   //   .then(data=>
   //    {console.log(data)}).catch(err=>{
     //        console.log(err)
     //     })          
}
}
 
    return(
<div className="tweetbox"> 
        <div className="tweet">
        <form onSubmit={handletweet}> 
        <div className="tweet"> 
        <Avatar src=  { loginuser[0]?.profileImage?loginuser[0]?.profileImage:'https://cdn.pixabay.com/photo/2016/08/08/09/17/avatar-1577909_960_720.png'}></Avatar>
            <input type="text" placeholder="Whats Happening ?" style={{border:"none",fontSize:20,width:500}} onChange={(e)=>setPost(e.target.value)} value={post} required/>
            </div>  
           <label htmlFor="image" className="imageicon">
           {
                isLoading?<span className="imageloading">uploading</span>: <span  className="imageloading" > {imageurl?"image uploaded":<AddPhotoAlternateIcon/>}</span>
            }
           </label>  
           <input type="file" id="image" className="imageinput"  onChange={handleimage} />
            <input type="submit" value="Tweet" className="tweetpost"/>
         </form>
         {
              cometommorow ? <Modal 
               open= {setComeTommorow}
               aria-labelledby="modal-modal-title" 
                aria-describedby="modal-modal-description">
                <Box sx={stylelogin}>
                <CloseIcon  className="closebutton1" onClick={()=>setComeTommorow(false)}/> 
                   <label className="alreadytweet">Already tweeted pls come tommorow</label>
                </Box> 
              </Modal>
             :" " }
        </div>
        </div>
    );
}
export{Tweetboxpaid}