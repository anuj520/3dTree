import { useAuth } from "../ContextApi/ContextApi"

export const Section2 = () =>{
const {handleColor} = useAuth()
return(
<section id='section-2'>
<div id="climatename">    
<h1 onClick={() =>handleColor(1,"#EFBD2A","#efbe2ac1","#efbe2ab8")}>Sunny Glow <span>(click)</span></h1>
<h1 onClick={()=>handleColor(2,"#567D00","#105b04c2","#557d00c7")}>Rain Mood <span>(click)</span></h1>
<h1 onClick={()=>handleColor(6, "#A86491","#a86491c9","#a86491bb")}>jacaranda Aura <span>(click)</span></h1>
<h1 onClick={()=>handleColor(4,"#D6E4ED","#d6e4edc9","#d6e4edc6")}>Snow Calm <span>(click)</span></h1>
<h1 onClick={()=>handleColor(5,"#F29A92","#F29A92","#f29a92c8")}>Spring Mood <span>(click)</span></h1>    
<h1 onClick={()=>handleColor(3,"#8D2C33","#8d2c32c6","#8d2c32c7")}>Autumn Hue <span>(click)</span></h1>
</div>

</section>    
)    
}