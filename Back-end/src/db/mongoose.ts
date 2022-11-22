import {connect} from 'mongoose';
import {databaseHost, databasePort, databaseUser, databasePassword, databaseName, databaseConnectionOpts } from '../env/config';

console.log(databaseUser)
const remoteUrl: string = `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}?${databaseConnectionOpts}`
/**
 * Conexión a la URL.
 */
connect(remoteUrl).then(() => {
  console.log('Conexión con el servidor de MongoDB establecida');
}).catch(() => {
  console.log('No se ha podido establecer la conexión con el servidor de MongoDB');
});