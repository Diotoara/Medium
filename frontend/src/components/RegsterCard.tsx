
import { Link } from "react-router-dom"
import img from "../assets/image.png"

const RegsterCard = () => {
  return (<div className="bg-gray-100 block max-w-sm border border-gray-300 rounded-md shadow">
  <div >
    <img className="rounded-t-md" src={img} alt="image here" />
  </div>

  <div className="p-6 text-center">
    <span className="inline-flex items-center bg-blue-100 border border-blue-300 text-blue-700 text-xs font-medium px-1.5 py-0.5 rounded-sm">
      <svg className="w-3 h-3 me-1" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
        <path
          stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M18.122 17.645a7.185 7.185 0 0 1-2.656 2.495 7.06 7.06 0 0 1-3.52.853 6.617 6.617 0 0 1-3.306-.718 6.73 6.73 0 0 1-2.54-2.266c-2.672-4.57.287-8.846.887-9.668A4.448 4.448 0 0 0 8.07 6.31 4.49 4.49 0 0 0 7.997 4c1.284.965 6.43 3.258 5.525 10.631 1.496-1.136 2.7-3.046 2.846-6.216 1.43 1.061 3.985 5.462 1.754 9.23Z"
        />
      </svg>
      Medium
    </span>

    <div className="mt-3 mb-6">
      <h5 className=" text-2xl font-semibold tracking-tight text-gray-900">
        Register or Login
      </h5>
      <div className="text-md font-medium tracking-tight text-gray-800"> 
        to instantly unlock full access to all blogs.
      </div>
    </div>

    <div className="flex justify-center gap-4">
        <Link to={"/signup"}>
        <div className="inline-flex items-center text-white bg-gray-600 border border-transparent hover:bg-gray-700 focus:ring-4 focus:ring-blue-300 shadow font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none">
        Sign Up
        </div>
        </Link>

        <Link to={"/signin"}>
        <div className="inline-flex items-center text-white bg-blue-600 border border-transparent hover:bg-blue-700 focus:ring-4 focus:ring-blue-300 shadow font-medium leading-5 rounded-md text-sm px-4 py-2.5 focus:outline-none">
        Login
        <svg className="w-4 h-4 ms-1.5 rtl:rotate-180 -me-0.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" >
            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 12H5m14 0-4 4m4-4-4-4" />
        </svg>
        </div>
        </Link>
    </div>


  </div>
</div>

  )
}

export default RegsterCard