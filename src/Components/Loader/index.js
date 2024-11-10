import { ColorRing } from 'react-loader-spinner';
import "./index.css"

const Loader=()=>{


  return (
    <div className="sweet-loading">
        <ColorRing
  visible={true}
  height="80"
  width="80"
  ariaLabel="color-ring-loading"
  wrapperStyle={{}}
  wrapperClass="color-ring-wrapper"
  colors={[ '#f47e60',"blue"]}
  />
      
    </div>
  );
}

export default Loader;