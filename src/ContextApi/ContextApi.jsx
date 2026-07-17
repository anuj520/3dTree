import { useTexture } from "@react-three/drei";
import { createContext, useContext, useRef, useState } from "react";
import * as THREE from "three"
const AuthContext = createContext();

export const AuthProvider = ({children})=>{
const setGrass = useRef([])    
const directionLight = useRef()
const ambatedLight = useRef()
const[color,setColor] = useState({
color:"#384AC5",
bg:""    
})
const leaves = useRef(0)

    const handleColor = (vl,cl1,cl2,cl3) =>{
leaves.current = vl 
     setGrass.current.map((color,_)=>(
     color.material.color.set(cl1)   
     ))   
directionLight.current.color.set(cl1)
ambatedLight.current.color.set(cl1)
 
setColor((prev)=>({...prev,color: cl1}))    
setColor((prev)=>({...prev,bg:cl3}))
    }

const[load,setLoaded] = useState(false)    

return<AuthContext.Provider value={{handleColor,setGrass,directionLight,ambatedLight,color,leaves,setLoaded,load}}>{children}</AuthContext.Provider>    
}

export const useAuth = () => useContext(AuthContext)