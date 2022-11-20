import {
    MDBCarousel,
    MDBCarouselItem,
} from 'mdb-react-ui-kit';
import pan1 from '../assets/panes/pan1.png'
import pan3 from '../assets/panes/pan3.png'
export default function Carrousel() {
    return (
        <MDBCarousel showControls dealy={1000}>
            <MDBCarouselItem
                className='w-100 d-block'
                itemId={1}
                src={pan1}
                alt='pan1'
            />
            <MDBCarouselItem
                className='w-100 d-block'
                itemId={2}
                src={pan3}
                alt='pan4'
            />
        </MDBCarousel>
    );
}