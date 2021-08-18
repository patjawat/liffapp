import React,{useState,useEffect} from 'react'
import Select from "react-select";
import { useForm,Controller } from "react-hook-form";
import { yupResolver } from '@hookform/resolvers/yup';
import * as Yup from 'yup';
import Swal from 'sweetalert2'
import withReactContent from 'sweetalert2-react-content'
import axios  from 'axios';

const MySwal = withReactContent(Swal)

export default function Register() {
    const [profile, setProfile] = useState({})
    const [categorisClass, setCategorisClass] = useState([])
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
            MySwal.fire({
              position: 'center-end',
              icon: 'success',
              title: 'บันทึกข้อมูลสำเร็จ',
              showConfirmButton: false,
              timer: 1500
            }).then(()=>{
              liff.closeWindow()
            })
            
            // setSave(data)
        } catch (error) {
            console.log(error)
        }
    };


    const getCategories = async () => {
        const {data} = await axios.get(`${process.env.API}categoris-types`)
        await setCategorisClass(data[0].ids);
        // await setCategorisClass([
        //   ...new Set(data.map((item, i) => item.name)),
        // ]);
        console.log(data[0].ids)
    }

    const { register, handleSubmit, reset, formState,control } = useForm(formOptions);
    const { errors } = formState;


    // useEffect(async () => {
    //   await getCategories()
    // },[])

    useEffect(async () => {
      await reset({line_id:profile.userId,displayName:profile.displayName,pictureUrl:profile.pictureUrl})
    
       const liff = (await import('@line/liff')).default
      try {
        await liff.init({ liffId });
        const profile = await liff.getProfile()
        await setProfile(profile)
        await getCategories()

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
            <h1 className="text-center">ลงทะเบียน</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
            <input name="email" type="text" {...register('line_id')}  className={`form-control ${errors.line_id ? 'is-invalid' : ''}`} hidden="true"/>
            <input name="email" type="text" {...register('displayName')} className={`form-control ${errors.displayName ? 'is-invalid' : ''}`} hidden="true" />
            <input name="email" type="text" {...register('pictureUrl')}  className={`form-control ${errors.pictureUrl ? 'is-invalid' : ''}`} hidden="true" />
      
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
        <label>สังกัด</label>
        <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={categorisClass.map((option) => ({
            ...option,
            label: option.title,
            value: option.id,
            clearableValue: true
        }))}
        />}
      />
        </div>

        <div className="form-group">
            <label>โทรศัพท์</label>
            <input name="email" type="text" {...register('phone')} className={`form-control ${errors.phone ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.phone?.message}</div>
        </div>

        <div className="form-group">
        <label>ยื่นขอในตำแหน่ง</label>
        <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={categorisClass.map((option) => ({
            ...option,
            label: option.title,
            value: option.id,
            clearableValue: true
        }))}
        />}
      />
        </div>

        <div className="form-group">
        <label>สาขาวิชา</label>
        <Controller
        name="iceCreamType"
        control={control}
        render={({ field }) => <Select 
          {...field} 
          options={categorisClass.map((option) => ({
            ...option,
            label: option.title,
            value: option.id,
            clearableValue: true
        }))}
        />}
      />
        </div>

        <div className="form-group">
            <label htmlFor="exampleInputEmail1">email(ถ้ามี)</label>
            <input name="email" type="text" {...register('lname')} className={`form-control ${errors.lname ? 'is-invalid' : ''}`} />
            <div className="invalid-feedback">{errors.lname?.message}</div>
        </div>
        <button type="submit" className="btn btn-primary btn-lg btn-block">ลงทะเบียน</button>
        </form>
      </div>
    );
}
