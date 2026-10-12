import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";

const Login = () => {
    const {register, handleSubmit, formState:{errors}}= useForm();
    const {signInUser}= useAuth();
    const location = useLocation();
    const navigate= useNavigate();
    
    const handleLogin=data=>{
        console.log('The data are here', data);
        signInUser(data.email,data.password)
        .then(result=>{
            console.log(result.user);
            navigate(location?.state || '/');
        })
        .catch(error=>{
            console.log(error);
        })
    }

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-center text-3xl">Welcome back</h3>
        <p className="text-center">Please Login</p>
      <form onSubmit={handleSubmit(handleLogin)} className="card-body">
        <fieldset className="fieldset">
            {/* email field */}
          <label className="label">Email</label>
          <input {...register('email', {required:true})} type="email" className="input" placeholder="Email" />
          {
            errors.email?.type==='required' && <p className="text-red-500">Email is required</p>
          }

          {/* password field */}
          <label className="label">Password</label>
          <input {...register('password', {required: true, minLength:6})} type="password" className="input" placeholder="Password" />
          {
            errors.password?.type==='minLength' && <p className="text-red-500">Password must be 6 chrachter or longer</p>
          }
          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Login</button>
        </fieldset>
        <p>New to Zapshift? <Link 
        state={location.state}
        className="text-blue-400 underline font-bold" 
        to='/register'>Register</Link> </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Login;
