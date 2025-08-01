import { useEffect, useState } from 'react'
import Navbar from '../shared/Navbar'
import { Label } from '../ui/label'
import { Input } from '../ui/input'
import { RadioGroup } from '../ui/radio-group'
import { Button } from '../ui/button'
import { Link, useNavigate } from 'react-router-dom'
import { USER_API_END_POINT } from '@/utils/constant'
import { toast } from 'sonner'
import axios from 'axios'
import { useDispatch, useSelector } from 'react-redux'
import { setLoading, setUser } from '@/redux/authSlice'
import { Loader2 } from 'lucide-react'


const Login = () => {
    const [input, setInput] = useState({
        email: "",
        password: "",
        role: "",
    });
    const { loading,user } = useSelector(store => store.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    }

    // const submitHandler = async (e) => {
    //     e.preventDefault();
    //     try {
    //         dispatch(setLoading(true));
    //         const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
    //             headers: {
    //                 "Content-Type": "application/json"
    //             },
    //             withCredentials: true,
    //         });
    //         if (res.data.success) {
    //             dispatch(setUser(res.data.user));
    //             navigate("/");
    //             toast.success(res.data.message);
    //         }
    //     } catch (error) {
    //         console.log(error);
    //         toast.error(error.response.data.message);
    //     }
    //     finally {
    //         dispatch(setLoading(false));
    //     }
    // }
    
    const submitHandler = async (e) => {
        e.preventDefault();
      
        try {
          dispatch(setLoading(true));
      
          const res = await axios.post(`${USER_API_END_POINT}/login`, input, {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true, // Ensure your backend allows credentials
          });
      
          if (res.data.success) {
            dispatch(setUser(res.data.user));
            navigate("/");
            toast.success(res.data.message);
          } else {
            toast.error("Something went wrong. Please try again.");
          }
        } catch (error) {
          console.error("Login Error:", error);
      
          // Safely handle different error scenarios
          if (error.response) {
            // Server responded with a status code outside 2xx
            toast.error(error.response.data?.message || "Server Error. Please try again.");
          } else if (error.request) {
            // Request was made, but no response received
            toast.error("No response from the server. Check your network connection.");
          } else {
            // Something else caused the error
            toast.error(error.message || "An unexpected error occurred.");
          }
        } finally {
          dispatch(setLoading(false));
        }
      };
      useEffect(()=>{
        if(user){
            navigate("/");
        }
    },[navigate,user])
    return (
        <div>
            <Navbar />
            <div className='flex items-center justify-center max-w-7xl mx-auto'>
                <form onSubmit={submitHandler} className='w-1/2 border border-gray-200 rounded-md p-4 my-10'>
                    <h1 className='font-bold text-xl mb-5'>Login</h1>
                    <div className='my-2'>
                        <Label>Email</Label>
                        <Input type="text" value={input.email} name='email' onChange={changeEventHandler} placeholder=" veeran@gmail.com" />
                    </div>
                    <div className='my-2'>
                        <Label>Password</Label>
                        <Input type="text" value={input.password} name='password' onChange={changeEventHandler} placeholder=" " />
                    </div>
                    <div className='flex items-center justify-between'>
                        <RadioGroup className='flex items-center gap-4 my-5'>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='student' checked={input.role == 'student'}
                                    onChange={changeEventHandler} className='cursor-pointer' />
                                <Label htmlFor="r1">Student</Label>
                            </div>
                            <div className="flex items-center space-x-2">
                                <Input type='radio' name='role' value='recruiter' checked={input.role == 'recruiter'}
                                    onChange={changeEventHandler} className='cursor-pointer' />
                                <Label htmlFor="r2">Recruiter</Label>
                            </div>
                        </RadioGroup>
                    </div>
                    {
                        loading ? <Button className="w-full my-4"> <Loader2 className='mr-2 h-4 w-4 animate-spin' /> Please wait </Button> : <Button type="submit" className="w-full my-4 bg-black text-white">Login</Button>
                    }
                    <span className='text-sm'> Do not have an account? <Link to='/signup' className='text-blue-600'>Signup</Link></span>
                </form>
            </div>
        </div>

    )
}

export default Login
