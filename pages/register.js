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
        fname: Yup.string()
            .required('ต้องระบุบ ชื่อ'),
        lname: Yup.string()
            .required('ต้องระบุบ นามสกุล'),
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    
    const onSubmit = data => {
        try {
            const res = axios.post(`${process.env.SHEET_USERS_API}`,data)
            // console.log(res)
            console.log(data)
        } catch (error) {
            console.log(error)
        }
    };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;

    return (
        <div className="container">

            <h1 className="text-center">ลงทะเบียน</h1>
            {JSON.stringify(profile, null, 2)};
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name="email" type="text" {...register('userId')} value={profile.userId} className={`form-control ${errors.userId ? 'is-invalid' : ''}`}  hidden="true"/>
            <input name="email" type="text" {...register('displayName')} value={profile.displayName} className={`form-control ${errors.displayName ? 'is-invalid' : ''}`} hidden="true" />
            <input name="email" type="text" {...register('pictureUrl')} value={profile.pictureUrl} className={`form-control ${errors.pictureUrl ? 'is-invalid' : ''}`} hidden="true" />
      
        <div className="form-group">
            <label htmlFor="exampleInputEmail1">ชื่อ</label>
            <input name="email" type="text" {...register('fname')} className={`form-control ${errors.fname ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.fname?.message}</div>
        </div>

        <div className="form-group">
            <label htmlFor="exampleInputEmail1">นามสกุล</label>
            <input name="email" type="text" {...register('lname')} className={`form-control ${errors.lname ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.lname?.message}</div>
        </div>

        <div className="form-group">
            <label>โทรศัพท์</label>
            <input name="email" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>

        <button type="submit" className="btn btn-primary btn-lg btn-block">ลงทะเบียน</button>
        </form>
       
      </div>
    );
}
