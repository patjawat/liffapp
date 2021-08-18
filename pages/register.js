import React,{useState,useEffect} from 'react'
import { useForm } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios  from 'axios';

const MySwal = withReactContent(Swal)

export default function Register() {
    const [profile, setProfile] = useState({})
    const [save, setSave] = useState({})

    const liffId = process.env.NEXT_PUBLIC_LIFF_ID


    // form validation rules 
    const validationSchema = Yup.object().shape({
        fname: Yup.string()
            .required('ต้องระบุบ ชื่อ'),
        lname: Yup.string()
            .required('ต้องระบุบ นามสกุล'),
        
    });
    const formOptions = { resolver: yupResolver(validationSchema) };

    
    const onSubmit = async data => {
        try {
            const res = await axios.post(`${process.env.API}profiles/add-me`,data)
            // console.log(res)
            console.log(res)
            // MySwal.fire({
            //   position: 'top-end',
            //   icon: 'success',
            //   title: 'Your work has been saved',
            //   showConfirmButton: false,
            //   timer: 1500
            // }).then(()=>{
            //   liff.closeWindow()
            // })
            
            // setSave(data)
        } catch (error) {
            console.log(error)
        }
    };
    const { register, handleSubmit, reset, formState } = useForm(formOptions);
    const { errors } = formState;


    useEffect(async () => {
      await reset({line_id:profile.userId,displayName:profile.displayName,pictureUrl:profile.pictureUrl})
    
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
  

    
    return (
        <div className="container">
{JSON.stringify(profile)}
            <h1 className="text-center">ลงทะเบียน</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name="email" type="text" {...register('line_id')}  className={`form-control ${errors.line_id ? 'is-invalid' : ''}`} />
            <input name="email" type="text" {...register('displayName')} className={`form-control ${errors.displayName ? 'is-invalid' : ''}`}  />
            <input name="email" type="text" {...register('pictureUrl')}  className={`form-control ${errors.pictureUrl ? 'is-invalid' : ''}`}  />
      
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
