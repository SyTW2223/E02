import React from 'react'
import pan1 from '../assets/panes/pan1.png'
import pan2 from '../assets/panes/pan2.png'
import Video from '../assets/videos/video.mp4'
function Main() {
  return (
    <div>
        <img src={pan1} alt="pan" />
        <h1>Quiénes Somos</h1>
        <p>En alPanPan somos panaderos vocacionales con una experiencia profesional de más de 20 años </p>
        <p>Elaboramos a diario todos nuestros productos de manera artesanal</p>
        <button>Ver más</button>
        <img src={pan2} alt="pan" />
        <video src={Video} autoPlay muted >
        </video>
    </div>

  )
}

export default Main