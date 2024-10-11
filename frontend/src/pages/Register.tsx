import {useForm} from 'react-hook-form';
import {useMutation,useQueryClient} from 'react-query';
import * as apiClient from "../api-client";
import { useAppContext } from '../contexts/AppContext';
import { Link,useNavigate } from "react-router-dom";


export type RegisterFormData = {
    firstName:string,
    lastName:string,
    email:string,
    password:string,
    confirmPassword:string
}
const Register = () =>{

    const queryClient = useQueryClient();

    const navigate = useNavigate()

    const { showToast } = useAppContext();

    const {
        register , 
        watch, //gives value of different innput
        handleSubmit /*submit form,check for errors,create error objects*/,
        formState:{ errors } // to display errors,
    } = useForm<RegisterFormData>();

    // we use react query to handle fetch request and any errors also
    const mutation = useMutation(apiClient.register,{
        onSuccess:async ()=>{ // what to do if fetch request is successful
            showToast({message:"Registration Sucessful!",type:"SUCCESS"});
            await queryClient.invalidateQueries("validateToken");
            navigate("/"); 

        },
        onError:(error:Error)=>{
            showToast({message:error.message,type:"ERROR"});
            
        }
    });


    // our function which will use handleSubmit
    const onSubmit = handleSubmit((data)=>{
        mutation.mutate(data);
    })

    return(
        <form className="flex flex-col gap-5" onSubmit={onSubmit}>
            <h2 className="text-3xl font-bold">Create an Account</h2>  
            <div className="flex flex-col md:flex-row gap-5">
                <label className="text-gray-700 text-sm font-bold flex-1">
                    First Name
                    <input className="font-normal border rounded w-full py-1 px-2"
                        {...register("firstName",{required:"This field is required"})}
                        // ... spread registers properties to all of its arguements
                    ></input>
                    {errors.firstName && (
                        <span className="text-red-500">{errors.firstName.message}</span> 
                    )}
                </label>
                <label className="text-gray-700 text-sm font-bold flex-1">
                    Last Name
                    <input className="font-normal border rounded w-full py-1 px-2"
                        {...register("lastName",{required:"This field is required"})}
                    ></input>
                    {errors.lastName && (
                        <span className="text-red-500">{errors.lastName.message}</span> 
                    )}
                </label>
            </div>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Email
                <input
                    type="email" //validates email
                    className="font-normal border rounded w-full py-1 px-2"
                    {...register("email",{required:"This field is required"})}
                ></input>
                {errors.email && (
                    <span className="text-red-500">{errors.email.message}</span> 
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Password
                <input
                    type="password" //masks the characters
                    className="font-normal border rounded w-full py-1 px-2"
                    {...register("password",{
                        required:"This field is required",
                        minLength:{
                            value:6,
                            message:"Password must be atleast 6 characters"
                        }
                    })}
                ></input>
                {errors.password && (
                    <span className="text-red-500">{errors.password.message}</span> 
                )}
            </label>
            <label className="text-gray-700 text-sm font-bold flex-1">
                Confirm Password
                <input
                    type="password" //masks the characters
                    className="font-normal border rounded w-full py-1 px-2"
                    {...register("confirmPassword",{
                        // Custom validation by react-hook-form
                        validate:(val /*Value entered by the user*/)=>{ 
                            if(!val){
                                return "This field is required";
                            }else if(watch("password")!==val){
                                return "Your passwords do not match";
                            }
                        }
                    })}
                ></input>
                {errors.confirmPassword && (
                    <span className="text-red-500">{errors.confirmPassword.message}</span> 
                )}
            </label>
            
            <span className="flex items-center justify-between">
                <span className="text-sm">
                    Already Registered?{" "}
                    <Link className="underline" to="/sign-in">
                        Create an account here
                    </Link>
                </span>
                <button
                    type="submit" 
                    className="bg-blue-600 text-white p-2 font-bold hover:bg-blue-500 text-xl"
                >
                    Create Account
                </button>
            </span>
        </form>
    );
}
export default Register;