import { useGLTF } from "@react-three/drei";
import { useEffect, useRef } from "react";
import { GiDeer } from "react-icons/gi";
import { GiMonsteraLeaf } from "react-icons/gi";
import { SiLeaflet } from "react-icons/si";
import { useAuth } from "../ContextApi/ContextApi";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";

export const Scetion1 = () =>{
const scrollRef = useRef();
const{color} = useAuth()
const{contextSafe} = useGSAP()

useGLTF.preload("./tree.glb")
useEffect(()=>{
const box = scrollRef.current
if(!box) return;

let Speed = 5
let animationId

const loop = () =>{
if (box.scrollTop  + box.clientHeight+5 >= box.scrollHeight) {
box.scrollTop  = 0    
}else{
box.scrollTop  +=Speed    
}    
animationId = requestAnimationFrame(loop)
}

animationId = requestAnimationFrame(loop);

return () =>  cancelAnimationFrame(animationId)

},[])

const addGSAP  = contextSafe(() =>{
gsap.from("#section-1 #mainHeading h1 span",{
opacity:0,
stagger:.2, 
ease:"bounce.out",
duration:1   
}) 
gsap.from("#section-1 #TdEffects .manage3d,.Experience,#deer",{
scale:0,
duration:1,
ease:"back.out",
stagger:.5    
})   

})

useGSAP(()=>{
addGSAP()    
})

return(
<section id='section-1'>
<div id="mainHeading">
<h1>
<span>i</span>
<span>n</span>
<span>t</span>
<span>e</span>
<span>r</span>
<span>a</span> 
<span>c</span> 
<span>t</span>
<span>i</span>
<span>v</span> 
<span>e</span> 
</h1>
</div> 
<div id="TdEffects">
<div className="manage3d">
<p className="Experience">Experience a dynamic 3D environment where nature responds to time, mood, and weather.</p> 
 <h1 className="Experience">3d</h1>
<h1 className="Experience">Effects</h1>   
</div>
</div> 
<div id="deerPara">
<div id="handler">
<div id="para">
<h1 className="Experience">Wild</h1>    
</div> 
<div id="deer">
<GiDeer/>    
</div>   
</div>
</div>

<div id="handleLeaf">
<div id="handleScroll" ref={scrollRef}>
{Array.from({length:7}).map((_,i)=>(
<SiLeaflet style={{color:color.color}}/>    
))
}
</div>    
</div>
</section>    
)    
}