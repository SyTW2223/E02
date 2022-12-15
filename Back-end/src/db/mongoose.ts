import {connect} from 'mongoose';
import {database} from '../env/config';

const remoteUrl: string = database as string;
/**
 * Conexión a la URL.
 */
connect(remoteUrl).then(() => {
  console.log('Conexión con el servidor de MongoDB establecida');
}).catch(() => {
  console.log('No se ha podido establecer la conexión con el servidor de MongoDB');
});