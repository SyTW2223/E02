import pan2 from '../../../public/panes/pan2.png'
import Video from './Video'
import Carrousel from './Carrousel'
import CardDisplay from '../Card/CardDisplay'
import styles from '../../css/Home.module.css';
export default function Home() {
    return (
        <>

        <Carrousel/>
        <CardDisplay />
        <div className='container mt-5 mb-5'>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-8 ">
                        <div className="card-body ">
                            <h5 className="card-title text-center"><strong>Quiénes Somos</strong></h5>
                            <p className="card-text"> En alPanPan somos panaderos vocacionales con una experiencia profesional de más de 20 años..</p>
                            <button type="button" className={styles.Button}>Contáctanos</button>
                            <p className="card-text"><small className="text-muted">Last updated 3 mins ago</small></p>
                        </div>
                    </div>
                    <div className="col-md-4 p-4">
                        <img src={pan2} className='card-img' alt='Panes'/>
                    </div>
                </div>
            </div>
        </div>
        <div className='container mt-5 mb-5'>
            <div className="card mb-3">
                <div className="row">
                    <div className="col-md-8 ">
                        <div className="card-body ">
                            <h5 className="card-title text-center"><strong>Donde Comprar nuestro Pan</strong></h5>
                                <p className="card-text"> Sevilla Centro Plaza de la Encarnación, 16 Frente a la puerta este del mercado</p>
                                <p className="card-text"> Accede a nuestra Tienda online</p>
                                <button type="button" className={styles.Button} onClick={() => window.location.href='/tienda' }>
                                    Tienda Online
                                    </button>
                            </div>
                        </div>
                        <div className="col-md-4 p-6">
                            <Video/>
                        </div>
                    </div>
                </div>
            </div>
            </>
    )
}