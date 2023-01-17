import React, { useEffect, useState } from 'react';
import axios from "axios";
import { Form, Input ,message} from 'antd';
import { Link , useNavigate} from 'react-router-dom';
import Spinner from '../components/Layout/Spinner';


const Register = () => {
   const[loading,setLoading] =useState(false);

    const navigate = useNavigate();
    //Form Submit
    const submitHandler = async(values) => {
        try {
            setLoading(true)
            await axios.post("https://expense-management-system-mern-stack.onrender.com/api/v1/users/register",values)
            setLoading(false)
            message.success("Registration Successfull")
            navigate('/login')
            
        } catch (error) {
            setLoading(false)
            message.error("Something went wrong!!")
        }
    };

    //prevent for login user
    useEffect(()=>{
        if(localStorage.getItem('user')){
            navigate("/")
        }
    },[navigate])




    return (
        <>
            <div className='register-page'>
                {loading && <Spinner />}
                <Form className='registerform' layout='vertical' onFinish={submitHandler}>
                    <h1>Register Form</h1>
                    <Form.Item label="Name :" name="name" rules={[{ required: true, message: 'Please inter your name !' }]}>
                        <Input />
                    </Form.Item>
                    <Form.Item label="Email :" name="email" rules={[{ required: true, message: 'Please inter your email !' }]}>
                        <Input type='email' />
                    </Form.Item>
                    <Form.Item label="Passward :" name="passward" rules={[{ required: true, message: 'Please inter your passward !' }]}>
                        <Input type='password' />
                    </Form.Item>
                    <div className='d-flex justify-content-between'>
                        <Link to="/login" style={{ color:"black",fontSize:"1.2rem"}}>Already Register ? Click Here to login </Link>
                        <button style={{ color:"black",fontSize:"1.2rem"}} className='btn btn-primary'>Register</button>

                    </div>


                </Form>


            </div>


        </>
    )
}

export default Register