import { RegisterFormData } from './pages/Register';
import { SignInFormData } from './pages/SignIn';

const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

export const register = async (formData:RegisterFormData) => {
    const response =  await fetch(`${API_BASE_URL}/api/users/register`,{
        method:"POST",
        credentials:"include", //include any http cookies along with the request, set any cookies to the server that we get from the browser
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),

    })
    
    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }

    return responseBody;
}
export const signIn = async (formData:SignInFormData) => {
    const response =  await fetch(`${API_BASE_URL}/api/auth/login`,{
        method:"POST",
        credentials:"include", //include any http cookies along with the request, set any cookies to the server that we get from the browser
        headers:{
            "Content-Type":"application/json",
        },
        body: JSON.stringify(formData),

    })
    
    const responseBody = await response.json();
    if(!response.ok){
        throw new Error(responseBody.message);
    }

    return responseBody;
}

export const signOut = async () => {
    const response =  await fetch(`${API_BASE_URL}/api/auth/logout`,{
        method:"POST", 
        credentials:"include", //include any http cookies along with the request, set any cookies to the server that we get from the browser
    })
    
    if(!response.ok){
        throw new Error("Error while signing out");
    }
}


export const validateToken = async () => {
    const response = await fetch(`${API_BASE_URL}/api/auth/validate-token`, {
      credentials: "include",
    });
  
    if (!response.ok) {
      throw new Error("Token invalid");
    }
  
    return response.json();
  };