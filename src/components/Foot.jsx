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
       <footer>
       <span className={`block text-sm ${style.uiMode} sm:text-center`}>© 2023 quiz OTG™<Link to="/termsandconditions" className="hover:underline">. All Rights Reserved.</Link></span>
       </footer>
    </>
  )
}

export default Foot