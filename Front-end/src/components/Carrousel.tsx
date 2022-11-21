import {
    MDBCarousel,
    MDBCarouselItem,
    MDBContainer,
    MDBRow,
    MDBCol,

} from 'mdb-react-ui-kit';
import pan1 from '../assets/panes/pan1.png'
import pan3 from '../assets/panes/pan3.png'
import './carrousel.css'
export default function Carrousel() {
    return (
        <MDBContainer className='img-back'>
            <MDBRow>
                <MDBCol size='md'>
                </MDBCol>
                <MDBCol size='md'>
                    <MDBCarousel dealy={1000}>
                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={1}
                            src={pan1}
                            alt='pan1'
                        >
                        </MDBCarouselItem>
                        <MDBCarouselItem
                            className='w-100 d-block'
                            itemId={2}
                            src={pan3}
                            alt='pan4'
                        />
                    </MDBCarousel>
                </MDBCol>
                <MDBCol size='md'>
                </MDBCol>
            </MDBRow>
        </MDBContainer>


    );
}


