import { Html, useProgress } from "@react-three/drei"
import { useAuth } from "../ContextApi/ContextApi";
import { RiTreeFill } from "react-icons/ri";

export const Loading = () =>{
const {setLoaded} = useAuth()    
const {progress} = useProgress()  

if (progress === 100) {
setLoaded(true)    
}
  
return(
<Html center>
<section className="Loading">    
<div id="bar">
<div id="mainbar" style={{width:`${progress}%`}} >
<h1>{progress.toFixed(1)}%</h1>    
</div>    
</div>
</section>
</Html>    
)    
}