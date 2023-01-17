import React, { useState, useEffect } from 'react';
import axios from "axios";
import { Form, Input, message } from 'antd';
import { Link, useNavigate } from 'react-router-dom';
import Spinner from '../components/Layout/Spinner';

const Login = () => {
    const [loading, setLoading] = useState(false);

    const navigate = useNavigate();

    const submitHandler = async (values) => {
        try {
            setLoading(true)
            const { data } = await axios.post("https://expense-management-system-mern-stack.onrender.com/api/v1/users/login", values)
            setLoading(false)
            message.success("Login Successfull")
            localStorage.setItem('user', JSON.stringify({ ...data, password: "" }))
            navigate('/')

        } catch (error) {
            setLoading(false)
            message.error("Something went wrong!!")
        }

    };
    useEffect(() => {
        if (localStorage.getItem('user')) {
            navigate("/")
        }
    }, [navigate])


    return (
        <>
     
            <div className='register-page'>
          
           
                {loading && <Spinner />}
                <h2 className='logFormHead'>Expense Management System - MERN STACK</h2>
              
                <Form className='loginform' layout='vertical' onFinish={submitHandler}>
                    <h1>Login Form</h1>

                    <Form.Item label="Email :" name="email" rules={[{ required: true, message: 'Please inter your email !' }]}>
                        <Input type='email' />
                    </Form.Item>

                    <Form.Item label="Passward :" name="passward" rules={[{ required: true, message: 'Please inter your passward !' }]}>
                        <Input type='password' />
                    </Form.Item>

                    <div className='d-flex justify-content-between'>
                        <p>
                            <Link to="/register" style={{ color:"black",fontSize:"1.2rem"}}>
                                Not a User ? Click Here to Register
                            </Link>
                        </p>
                        <p >
                            <button style={{ fontSize:"1.2rem", color:"black"}} className='btn btn-primary'>Login</button>
                        </p>

                    </div>


                </Form>


            </div>

        </>
    )
}

export default Login