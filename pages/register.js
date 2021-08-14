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
      // liff.login();
    }
  }, [profile.userId])


    // form validation rules 
    const validationSchema = Yup.object().shape({
        fullname: Yup.string()
            .required('username is required'),
        phone: Yup.string()
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
            {/* {JSON.stringify(profile, null, 2)}; */}
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name="email" type="text" {...register('userId')} value={profile.userId} className={`form-control ${errors.userId ? 'is-invalid' : ''}`}  hidden="true"/>
            <input name="email" type="text" {...register('displayName')} value={profile.displayName} className={`form-control ${errors.displayName ? 'is-invalid' : ''}`} hidden="true" />
            <input name="email" type="text" {...register('pictureUrl')} value={profile.pictureUrl} className={`form-control ${errors.pictureUrl ? 'is-invalid' : ''}`} hidden="true" />
      
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">ชื่อ-นามสกุล</label>
            <input name="email" type="text" {...register('fullname')} className={`form-control ${errors.fullname ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.fullname?.message}</div>
        </div>

        <div className="form-group">
            <label>โทรศัพท์</label>
            <input name="email" type="text" {...register('phome')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">ลงทะเบียน</button>
        </form>
       
      </div>
    );
}
