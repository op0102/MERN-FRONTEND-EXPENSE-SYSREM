import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { message,Avatar } from 'antd';
import {UserOutlined  } from "@ant-design/icons";

const Header = () => {
  const navigate = useNavigate()
  const [loginUser, setLoginUser] = useState("");
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem('user'))
    if (user) {
      setLoginUser(user)
      // console.log(user);
    }
  }, [])

  const logoutHandler = ()=>{
    setLoginUser(localStorage.removeItem('user'))
    message.success("Logout Successfully!!")
    navigate("/login")
    
  }

  return (
    <>
      <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
          <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarTogglerDemo01" aria-controls="navbarTogglerDemo01" aria-expanded="false" aria-label="Toggle navigation">
            <span className="navbar-toggler-icon" />
          </button>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo01">
            <Link className="navbar-brand" to="/" ><h2>Expense Management</h2> </Link>
            <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li>  <Avatar className='avtar' icon={<UserOutlined />} /> </li>
              <li className="nav-item"> <p className="nav-link btn btn-success">
               {loginUser && loginUser.user.name} </p></li>
              
            

              <li className="nav-item">
                <button className="nav-link btn btn-success" onClick={logoutHandler}>Logout</button>

              </li>


            </ul>
          </div>
        </div>
      </nav>

    </>
  )
}

export default Header