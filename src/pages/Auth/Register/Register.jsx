import React from "react";
import { useForm } from "react-hook-form";
import useAuth from "../../../hooks/useAuth";
import { Link, useLocation, useNavigate } from "react-router";
import SocialLogin from "../SocialLogin/SocialLogin";
import axios from "axios";
import useAxiosSecure from "../../../hooks/useAxiosSecure";

const Register = () => {
    const {register,handleSubmit, formState:{errors}}= useForm();
    const {registerUser,updateUserProfile}= useAuth();

    const location= useLocation();
    const navigate= useNavigate();
    const axiosSecure= useAxiosSecure();

    const handleRegistration = data=>{
        const profileImg = data.photo[0];

        registerUser(data.email,data.password)
        .then(()=>{
          
            //store the image and get the photo url
            const formData= new FormData();
            formData.append('image',profileImg);
            const image_API_URL= `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_image_host_key}`;


            axios.post(image_API_URL,formData)
            .then(res=>{
                const photoURL= res.data.data.url;

                //create user in the database
                const userInfo={
                  email:data.email,
                  displayName:data.name,
                  photoURL:photoURL
                }
                axiosSecure.post('/users',userInfo)
                .then(res=>{
                  if(res.data.insertedId){
                    console.log('user created in the database');
                  }
                })

                //update user profile to firebase
                const userProfile={
                    displayName: data.name,
                    photoURL: photoURL 
                }
                updateUserProfile(userProfile)
                .then(()=>{
                    console.log('User profile update done');
                    navigate(location.state|| '/');
                })
                .catch(error=>console.log(error));
            })

            //update user profile
        })
        .catch(error=>{
            console.log(error);
        })
    }

  return (
    <div className="card bg-base-100 w-full mx-auto max-w-sm shrink-0 shadow-2xl">
        <h3 className="text-center text-3xl">Welcome to ZapShift</h3>
        <p className="text-center">Please Register</p>
      <form className="card-body" onSubmit={handleSubmit(handleRegistration)}>
        <fieldset className="fieldset">

            {/* Name field */}
          <label className="label">Name</label>
          <input type="text" {...register('name',{required:true})} className="input" placeholder="Your name" />
            {errors.name?.type==='required' && <p className="text-red-500 font-bold">Name is required</p>}


            {/* Photo image field */}
          <label className="label">Photo</label>
          <input type="file" {...register('photo',{required:true})} className="file-input" placeholder="Your photo" />
            {errors.photo?.type==='required' && <p className="text-red-500 font-bold">Photo is required</p>}

            {/* email field */}
          <label className="label">Email</label>
          <input type="email" {...register('email',{required:true})} className="input" placeholder="Email" />
            {errors.email?.type==='required' && <p className="text-red-500 font-bold">Email is required</p>}

          {/* password */}
          <label className="label">Password</label>
          <input type="password" {...register('password',{
            required:true,
            minLength: 6,
            pattern:/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/,
            })} className="input" placeholder="Password" />
            {
                errors.password?.type==='required' && <p className="text-red-500 font-bold">Password is required</p>
            }
            {
                errors.password?.type==='minLength' && <p className="text-red-500 font-bold">Password length minimum 6 charachter is required </p>
            }
            {
                errors.password?.type==='pattern' && <p className="text-red-500 font-bold">Password must have atleast one uppercase ,atleast one lowercase, atleast one number and atleast one special charachter</p>
            }

          <div>
            <a className="link link-hover">Forgot password?</a>
          </div>
          <button className="btn btn-neutral mt-4">Register</button>
        </fieldset>
        <p>Already have an account? <Link 
        state={location.state}
        className="text-blue-400 underline font-bold" 
        to='/login'>Login</Link> </p>
      </form>
      <SocialLogin></SocialLogin>
    </div>
  );
};

export default Register;
