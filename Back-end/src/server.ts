import './db/mongoose';

import {port} from './env/config';
import app from './app'

app.listen(port, () => {
    console.log(`Server running on port ${port}`);
});