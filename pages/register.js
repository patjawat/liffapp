import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import axios  from 'axios';

export default function Register() {
    const [profile, setProfile] = useState({})

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID

  useEffect(async () => {
    // const liff = (await import('@line/liff')).default
    // await liff.ready
    // const profile = await liff.getProfile()
    // setProfile(profile)
     const liff = (await import('@line/liff')).default
    try {
      await liff.init({ liffId });
      const profile = await liff.getProfile()
      await setProfile(profile)
      console.log(profile)
    } catch (error) {
      console.error('liff init error', error.message)
    }
    if (!liff.isLoggedIn()) {
      liff.login();
    }
  }, [profile.userId])


    // form validation rules 
    const validationSchema = Yup.object().shape({
        username: Yup.string()
            .required('username is required'),
        email: Yup.string()
            .required('Email is required')
            .email('Email is invalid'),
        password: Yup.string()
            .min(6, 'Password must be at least 6 characters')
            .required('Password is required'),
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    
    const onSubmit = data => {
        try {
            const res = axios.post(`${process.env.SHEET_USERS_API}`,data)
            console.log(res)
        } catch (error) {
            console.log(error)
        }
    };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <div className="container">
            <h1 className="text-center">ลงทะเบียน</h1>
            {JSON.stringify(profile)}
      <form onSubmit={handleSubmit(onSubmit)}>
      
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">username</label>
            <input name="email" type="text" {...register('username')} className={`form-control ${errors.username ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.username?.message}</div>
        </div>

        <div className="form-group">
            <label>Email</label>
            <input name="email" type="text" {...register('email')} className={`form-control ${errors.email ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.email?.message}</div>
        </div>

        <div className="form-group">
            <label htmlFor="exampleInputPassword1">Password</label>
            <input name="password" type="password" {...register('password')} className={`form-control ${errors.password ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.password?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary">Submit</button>
        </form>

      </div>
    );
}
