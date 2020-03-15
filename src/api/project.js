import axios from 'axios';

import { BASE_URL } from './endpoints';
import catchErrors from './catchErrors';


export async function createProject( projectData ) {
  try {
    const response = await axios.post( `${ BASE_URL }/api/projects`, projectData, { withCredentials: true } );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}

export async function updateProject( projectId, projectData ) {
  try {
    const response = await axios.put(
      `${ BASE_URL }/api/projects/${ projectId }`,
      projectData,
      { withCredentials: true },
    );

    return response;
  }
  catch ( err ) {
    return catchErrors( err );
  }
}