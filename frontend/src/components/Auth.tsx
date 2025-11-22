import { Link, useNavigate } from "react-router-dom"
import LabelledInput from "./LabelledInput"
import { useState } from "react"
import type { SignupInput } from "@aryan-jha/medium-common";
import axios from "axios";
import { BACKEND_URL } from "../config";
import Spinner from "./Spinner";

const Auth = ({type} : {type : "signup" | "signin"}) => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState("")
  const navigate = useNavigate();
  const [postInputs, setPostInputs] = useState<SignupInput>({
    name : "",
    email : "",
    password : ""
  });

  async function sendRequest() {
    setLoading(true)
    try {
      const response = await axios.post(`${BACKEND_URL}/api/v1/user/${type==="signup" ? "signup" : "signin"}`,postInputs);
      const jwt = response.data.token;
      {console.log(jwt)}
      localStorage.setItem("token",jwt);
      navigate("/blogs")
    } catch (err:any) {
      const error = err.response?.data?.message
      setLoading(false)
      setError(error)
      console.log(err)
    }
  }

  return (
    <div className="h-screen flex justify-center flex-col">
      <div className="flex justify-center" >
        <div>

          <div className="px-10">
            <div className="text-3xl font-extrabold">
              {type==="signup" ? "Create an Account" : "Log into your Account" }
                
            </div>
            <div className="text-slate-400 text-center">
              {type === "signin" ? "Don't have an Account?" :"Already have an account?"}
              
              <Link to={type==="signin" ? "/signup" : "/signin"} className="pl-1 underline underline-offset-1" >
              {type==="signin" ? "SignUp" : "Login"}
              </Link>
            </div>
          </div>

          
          <div className="relative">
            {loading ? 
              <div className="absolute z-10 w-full h-full flex justify-center items-center pb-10 flex-col "><Spinner/></div>
             : <></>}
          {/* labels */}
            <div className={`${loading ? "opacity-30" : ""} pt-4`}>
              {type==="signup" ? <LabelledInput label="Name" placeholder="Aryan Kumar..." onChange={(e)=>{
                setPostInputs({
                  ...postInputs, 
                  name: e.target.value
                })
              }} /> : null}

              <LabelledInput label="Email" placeholder="johndoe@gmail.com" onChange={(e)=>{
                setPostInputs({
                  ...postInputs, 
                  email: e.target.value
                })
              }} />

              <LabelledInput label="Password" type={"password"} placeholder="*******" onChange={(e)=>{
                setPostInputs({
                  ...postInputs, 
                  password: e.target.value
                })
              }} />

              <button onClick={sendRequest} type="button" className="w-full text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700">{type === "signup" ? "Sign Up" : "Sign In"}</button>

              <div className="flex justify-center text-red-500 font-medium " >
                {error ? `${error}` : ``}
              </div>

            </div>
          </div>
          {/* labels end */}

        </div>
      </div>
    </div>
  )

}

export default Auth