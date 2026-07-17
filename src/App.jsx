import { Canvas } from '@react-three/fiber'
import './App.css'
import { PiRainbow } from "react-icons/pi";
import { Scene } from './Components/Scene'
import { Environment, OrbitControls } from '@react-three/drei'
import { Scetion1 } from './Components/Section1'
import { Section2 } from './Components/Section2';
import { Section3 } from './Components/Section3';
import { Section4 } from './Components/section4';
import { useAuth } from './ContextApi/ContextApi';
import { Suspense } from 'react';
import { Loading } from './Loading/loading';
import ScrollSmoother from "./Components/ScrollSmoother"
// import Section5 from './Components/section5';

function App() {
const{directionLight,ambatedLight,color,load} = useAuth() 

  return (
 <main> 
<ScrollSmoother/>  
<Canvas 
id='canvas-elem'
style={{width:"100vw",
  height:"100vh",
  position:"fixed",
  top:0,
  left:0,
  zIndex:1,
  backgroundColor: color.bg,
  backgroundImage:"url(https://dogstudio.co/app/themes/portfolio-2018/static/assets/images/home/background-m.png)"
  }} >
<Suspense fallback={<Loading/>}>     
<Scene/>  
<Environment preset="forest"/>
<directionalLight intensity={3} color={"#123072"} ref={directionLight}/>
<ambientLight intensity={1} color={"#283C78"} ref={ambatedLight}/>
<OrbitControls enableDamping={true} 
enableZoom={false}
maxZoom={0}
minZoom={0}
/>
</Suspense>
</Canvas>
<header>
{Array.from({length:1}).map((_ ,i)=>(
<div id="GiMonsteraLeaf"><PiRainbow style={{color:color.color}}/></div>
))
}  
</header>
{load &&
<>
<Scetion1/>
<Section2/>
<Section3/>
<Section4/>
{/* <Section5/>   */}
</>
}
</main>  
  )
}

export default App
