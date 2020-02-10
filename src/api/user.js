import axios from 'axios';
import has from 'lodash.has';

import { BASE_URL } from './endpoints';

export async function createUser( userName, email, password ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/user`, {
      userName,
      email,
      password,
    } );

    return response;
  }
  catch ( err ) {
    let errors = [{ msg: 'Unknown Error' }];
    if ( has( err, 'response.data.errors' ) ) {
      if ( Array.isArray( err.response.data.errors ) ) {
        errors = err.response.data.errors;
      }
    }
    return {
      isError: true,
      errors,
    };
  }
}
