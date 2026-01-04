import { Link} from "react-router-dom";
import { useContext } from 'react';
import { Context } from '../MyContext';

const Foot = () => {

  const {dark} = useContext(Context);
  const style = {
    uiMode: dark ?
      "text-white bg-slate-900"
      :
      "text-black bg-green-300"
  }
  return (
    <>
       <footer className="">
       <span className={`block md:text-sm text-xs ${style.uiMode} text-center`}>© 2026 quiz OTG™<Link to="/termsandconditions" className="hover:underline">. All Rights Reserved.</Link></span>
       </footer>
    </>
  )
}

export default Foot