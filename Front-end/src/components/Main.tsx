import React from 'react'
import pan1 from '../assets/panes/pan1.png'
import pan2 from '../assets/panes/pan2.png'
//import Video from '../assets/videos/video.mp4'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import Video from './Video';
function Main() {
    return (
        <div>
            <h1 className='text-center'>Quiénes Somos</h1>
            <p className='text-center'>En alPanPan somos panaderos vocacionales con una experiencia profesional de más de 20 años </p>
            <p className='text-center'>Elaboramos a diario todos nuestros productos de manera artesanal</p>
            <Button>Ver más</Button>
            <Video />
            <Image className='Image' src={pan2} alt="pan" fluid />

        </div>

    )
}

export default Main