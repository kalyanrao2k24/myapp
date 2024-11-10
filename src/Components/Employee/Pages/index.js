import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

import "./index.css";



const Pages=(props)=>{
    let {emplyoeeData,onSetDisplayList}=props
    let dataLength=Math.ceil(emplyoeeData.length/10)
    let pageCount=[]
    for(let i=1;i<=dataLength;i++){
        pageCount.push(i)
    }


    const settings = {
        dots: false,
        infinite:false,
        speed: 500,
        slidesToShow: 5,
        slidesToScroll: 1
      };



    return(
        
        <div className="page-main-containetr">
                  

        <Slider {...settings}>
            {pageCount.map(each=>{
                return(
                    <div key={each}>
                        <button className="page-numbers" onClick={()=>onSetDisplayList(each)}>{each}</button>
                    </div>
                )
            })}
    </Slider>

</div>
  
     
    )
}

export default Pages;