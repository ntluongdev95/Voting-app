import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { getEventAction, getEventByIdAction } from '../redux/actions/eventAction'
import { logoutAction } from '../redux/actions/userAction'
import{useNavigate} from 'react-router-dom'
import './trangchu.scss'
function Trangchu() {
    const dispatch = useDispatch()
    const navigate = useNavigate();
    const{userInfo} = useSelector(state=>state.userAuth)
     const{allEvents} = useSelector(state=>state.allEvents)
    const eventList =[{
        id:'1',
        backgroundImage:'https://bvote.com.vn/images/home/banner/bg.jpg',
        name:'Co dong song hanh'
    },{
        id:'2',
        backgroundImage:'https://bvote.com.vn/images/product/miss-yoga.jpg',
        name:'Vietnam Yoga Queen 2022'
    },{
        id:'3',
        backgroundImage:'https://bvote.com.vn/images/product/miss-hoan-vu.jpg',
        name:'Miss Universe Vietnam 2022' 
    }]
    useEffect(()=>{
        dispatch(getEventAction())
    },[dispatch])
    const[currentIndex,setCurrentIndex]=useState(0);
    const length =eventList.length -1;
    useEffect(()=>{
        const interval1 =setInterval(()=>{
            setCurrentIndex(currentIndex===length?0 :currentIndex+1)
        },10000)
        return ()=>clearInterval(interval1)
     },[currentIndex,length])
    
    const handleLogout =()=>{
        dispatch(logoutAction())
    }
    const navigateEvent =(id)=>{
        dispatch(getEventByIdAction(id))
         navigate(`/event/${id}`)
    }
    return (
        <div className='container'>
            <div className='nav-header'>
                
               <div className='header__avata'>
                   <img src='https://static.thenounproject.com/png/363639-200.png' alt='' />
                   <span className='span'>NTL</span>
               </div>
               {userInfo?.isAdmin &&(
                    <a href='/admin'>Admin</a>
                )}
                <p onClick={handleLogout} className='link login' >Log out</p>
                
            </div>
            <div className='section__main'>
                <h1 className='h1'>YOUR VOTE DECIDES
                <br />
                THE FUTURE OF THE UNITED STATE
                </h1>
                <div className='section__event'>
                        <h3 className='h3'>Happening events:</h3>
                       <div className='section__slice'>
                           {allEvents?.map((l,index)=>(
                          <div onClick={()=>navigateEvent(l._id)} key={index} className= {currentIndex===index? "section__item active" :"section__item"} >
                               <img className='image_item'  src={l.backgroundImage} alt='' />
                               <p className='name'>{l.name}</p>
                          </div>
                          ))}
                       </div>
                </div>
            </div>
           
        </div>
    )
}

export default Trangchu

/* <div className='image-container'>
                <img className=' img img-user' src='https://upload.wikimedia.org/wikipedia/commons/thumb/5/56/Donald_Trump_official_portrait.jpg/1200px-Donald_Trump_official_portrait.jpg'  alt='' />
                <img className=' img img-box' src='https://www.nicepng.com/png/detail/24-241692_voting-box-png-file-your-comments.png' alt='' />
                <img className='img img-user' src='https://images.mktw.net/im-417991?width=700&height=474' alt='' />
            </div>
            <h1 >Who will be the next U.S. president?</h1>
            {display && (
                <Toast />
            )}
             .image-container{
        padding-top: 100px;
      @include flex(center,center);
      .img{
         height: 300px;
         width: 300px;
        
         &.img-user{
            border-radius: 50%;
            
          }
        &.img-box{
            margin: 0 5px;
            animation: shake .5s alternate infinite;
        }
      }
    }
    h1{
       text-align: center; 
       margin-top: 50px;
       font-size: 4rem;
    }
          */