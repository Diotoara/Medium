import Auth from "../components/Auth"
import Qoute from "../components/Qoute"

const Signup = () => {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2">
      <div>
        <Auth type="signin"/>
      </div>
      <div className=" lg:visible invisible">
        <Qoute/>
      </div>
    </div>
  )
}

export default Signup