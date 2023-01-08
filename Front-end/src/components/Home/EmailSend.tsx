import {
    MDBInput,
    MDBCol,
    MDBRow,
    MDBBtn
} from 'mdb-react-ui-kit';
import { useState } from 'react';
import axios from 'axios';
import toast, { Toaster } from 'react-hot-toast';

export default function EmailSend() {
    const [email, setEmail] = useState('');

    const handleSubmit = async (e:any) => {
        e.preventDefault();
        var data = {
            service_id: 'service_uj1bmtf',
            template_id: 'template_6bjaflk',
            user_id: 'TjcwuzxfHx-_6UiyS',
            template_params: {
                'to': email,
                'from': 'josephbarca27@gmail.com',
                'to_name': email,
            }
        };

        axios.post('https://api.emailjs.com/api/v1.0/email/send', JSON.stringify(data), {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then(function() {
            toast.success('Correo enviado');
          }).catch(function(error) {
            toast.error('Error al enviar correo');
          });
    };
    return (
        <form onSubmit={handleSubmit}>
            <MDBRow className='d-flex justify-content-center'>
                <MDBCol size="auto">
                    <p className='pt-2'>
                        <strong>Sign up for our newsletter</strong>
                    </p>
                </MDBCol>

                <MDBCol md='5' start>
                    <MDBInput contrast type='email' label='Email address' className='mb-4'
                    onChange={(event) => setEmail(event.target.value)} />
                </MDBCol>

                <MDBCol size="auto">
                    <MDBBtn outline color='light' type='submit' className='mb-4'>
                        Subscribe
                    </MDBBtn>
                </MDBCol>
            </MDBRow>
            <Toaster />
        </form>
    )
}
