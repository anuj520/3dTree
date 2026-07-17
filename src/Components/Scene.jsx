import { useGLTF, useTexture } from "@react-three/drei";
import { Canvas, useFrame, useThree } from "@react-three/fiber"
import { useEffect, useRef } from "react";
import * as THREE from "three"
import Lenis from "lenis"
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useAuth } from "../ContextApi/ContextApi";

export const Scene = () =>{
const{scene} = useGLTF("./tree.glb",true)      
const{setGrass,leaves,color} = useAuth()
  
gsap.registerPlugin(useGSAP())
gsap.registerPlugin(ScrollTrigger);

const {contextSafe} = useGSAP()

const {camera,gl,width} = useThree();


const[normalMap,levesNormal,grassNormal,levesTexture,thunkColor,specularMap,trunkmetalRuf,groundMap,
  colorLeave1,colorLeave2,colorLeave3,colorLeave4,colorLeave5,colorLeave6
] = (useTexture([
    "/textures/trunk_normal.webp",
    "/textures/leaves_metallicRoughness.webp",
     "/textures/grass.webp",
      "/textures/leaves_baseColor.webp",
     "/textures/trunk_baseColor.webp",
     "/textures/trunk_metallicRoughness.webp",
     "/textures/trunk_metallicRoughness.webp",
     "/textures/ground.webp",
     "/textures/yelowLeaf.webp",
      "/textures/rainLeaf.webp",
      "/textures/autumn.webp",
       "/textures/snowLeaf.webp",
       "/textures/fogLeaf.webp",
          "/textures/jan.webp",
])).map(texture=>{
   texture.flipY =false,
   texture.colorSpace = THREE.SRGBColorSpace   
   return texture
})


const tree_trunk  = new THREE.MeshPhysicalMaterial({
 normalMap:normalMap,
map:thunkColor,
metalnessMap:trunkmetalRuf,
metalness:0,
roughness:1,
// roughnessMap:roughnessTrunk,
clearcoat:0,
clearcoatRoughness:0
})  

const big_tree_leaves_0 =  new THREE.MeshPhysicalMaterial({
   map: leaves.current ===1 ?colorLeave1: leaves.current === 2 ? colorLeave2:leaves.current === 3? colorLeave3:
   leaves.current === 4? colorLeave4:leaves.current === 5?colorLeave5:leaves.current ===6?colorLeave6:levesTexture,
   roughnessMap: levesNormal,
   roughness:1,
   metalness:0,
  specularIntensity:1,
  specularIntensityMap:specularMap,
  transparent: true,
  alphaTest: 0.5,
  side:THREE.DoubleSide
  })   
const Cylinder_green =  new THREE.MeshPhysicalMaterial({
  // normalMap:grassNormal,
  map:groundMap,
  roughness:1,
   metalness:0,  
   specularIntensity:1,
   specularIntensityMap:specularMap,
   transparent:true,
   alphaTest:0.5
 })   

 const SpherLight = new THREE.MeshPhysicalMaterial({
 color:color.color,
  emissive: color.color,
 emissiveIntensity:2 
 })

//normalMap
normalMap.colorSpace = THREE.NoColorSpace;
tree_trunk.normalScale.set(1, 1);
grassNormal.colorSpace = THREE.NoColorSpace;
Cylinder_green.normalScale.set(1,1)
groundMap.colorSpace = THREE.SRGBColorSpace; // ✅ color texture

const tree = useRef([])

scene.traverse((child) =>{
if (child.name.includes("tree_trunk")) {
child.material = tree_trunk   
}else if (child.name.includes("big_tree_leaves_0")) {
  child.material = big_tree_leaves_0
  tree.current.push(child)
  
}else if (child.name.includes("Cylinder_green")) {
 child.material =Cylinder_green
}else if (child.name.includes("grass_grass")) {
tree.current.push(child)  
setGrass.current.push(child)
}else if (child.name.includes("Sphere")) {
child.material = SpherLight  
}    
})

useEffect(()=>{
camera.position.set(-10.287733804833131,
-5.45925731398523784,
10.506189860069362)
// gl.toneMapping =  THREE.ReinhardToneMapping,
gl.outputColorSpace =  THREE.SRGBColorSpace
},[])

const model = useRef(scene)

const addGsap  = contextSafe(()=>{
const tl = gsap.timeline({
  scrollTrigger:{
    trigger:"#section-1",
    endTrigger:"#section-4",
    start:"top top",
    end:"bottom bottom",
    scrub:true
  }
}) 
tl.to(model.current.position,{
y: "+=14",
x:14,
z: -14
}) 
.to(model.current.position,{
z:`+=27`,
y:`-=15`,
x:`-=20`
},)
.to(camera.position,{
y:`+=20`,
x:"+20",
z:"-35"
})

})


useGSAP(()=>{
addGsap()
},[])

useFrame((state) => {
  const t = state.clock.getElapsedTime()
 tree.current.map((wind,index)=>{
if (!wind.name.includes("grass_grass")) {
    wind.rotation.x = Math.sin(t + index ) * 0.01
}else{
  wind.rotation.x = Math.sin(t + index ) * 0.07
}
 })
})


let targetX = 0;
let targetY = 0;

useEffect(() => {
  const handleMove = (e) => {
     targetX = (e.clientX / window.innerWidth) * 2 - 1;
     targetY = (e.clientY / window.innerHeight) * 2 - 1;
 
  };

  window.addEventListener("mousemove", handleMove);

  return () => {
    window.removeEventListener("mousemove", handleMove);
  };
}, [leaves.current]);

// animation loop (important)
useFrame(() => {
  camera.rotation.y += targetX*0.009
  camera.rotation.x += targetY*0.009
});

const responsiveScale = width < 6 ? 0.50 : 1;

// 2. Dynamic Position-Y: Mobile par tree/model upar-neeche adjust karne ke liye
const responsivePosY = width < 6 ? -4.5 : -7;

return(
<>   
<primitive 
      object={scene}  
      position-y={responsivePosY} 
      rotation-y={-Math.PI / 4}
      scale={responsiveScale} // Yeh property scale ko fix karegi
    />
</> 
)    
}

useGLTF.preload("./tree.glb")