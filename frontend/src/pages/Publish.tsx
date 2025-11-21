import AppBar from "../components/AppBar"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { useState, type ChangeEvent } from "react"
import { useNavigate } from "react-router-dom"

const Publish = () => {
    const [title,setTitle] = useState("");
    const [content,setContent] = useState("");
    const navigate = useNavigate();
  return (
    <div>
        <AppBar/>

        <div className="flex justify-center w-full pt-3 text-3xl font-bold">
            Create your new Blog
        </div>

        <div className="flex justify-center w-full pt-8">
            <div className="max-w-screen-xl w-full">
                <input onChange={(e)=>{
                    setTitle(e.target.value)
                }} type="text" className=" focus:outline-none block w-full ps-3 py-3 bg-slate-100 border border-default-medium font-semibold text-lg rounded-xl focus:ring-brand focus:border-brand shadow-xs placeholder:text-body" placeholder="Title"></input>
                <div className="pt-3">
                    <TextEditor onChange={(e)=>{
                        setContent(e.target.value)
                    }} />
                </div>
                <div className="pt-3">
                    <button onClick={ async ()=>{
                        const response = await axios.post(`${BACKEND_URL}/api/v1/blog`,{
                            title,
                            content
                        },{
                            headers: {
                                Authorization: localStorage.getItem("token")
                            }
                        });
                        navigate(`/blog/${response.data.id}`)
                    }} type="button" className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">Publish</button>
                </div>
            </div>
        </div>
    </div>
  )
}

function TextEditor({onChange}:{onChange:(e : ChangeEvent<HTMLTextAreaElement>)=>void}){
    return (
        <div>
            <textarea onChange={onChange} id="message" rows={6} className=" focus:outline-none bg-slate-50 border border-default-medium text-heading text-md rounded-base focus:ring-brand focus:border-brand block w-full p-3.5 shadow-xs placeholder:text-body" placeholder="Write your thoughts here..."></textarea>
        </div>
    )
}

export default Publish