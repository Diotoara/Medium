import { Link } from "react-router-dom"
import Avatar from "./Avatar"

const AppBar = () => {
  return (
    <div className="border-b border-red-300 flex justify-between px-10 py-3">

      <div>
        <Link to={"/blogs"} className=" flex flex-col justify-center font-bold text-xl cursor-pointer">
              Medium
        </Link>
      </div>
      
      <div>
        <Link to={'/publish'}>
          <button type="button" className=" mr-3 focus:outline-none text-white bg-green-700 hover:bg-green-800 font-medium rounded-xl text-sm px-5 py-2.5 me-2 mb-2">New</button>
        </Link>

          <Avatar name="Raj" size="big"/>
      </div>
        
    </div>
  )
}

export default AppBar