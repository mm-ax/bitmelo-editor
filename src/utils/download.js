
import cloneDeep from 'lodash.clonedeep';

import storeRegistry from 'State/storeRegistry';

export const downloadJSON = ( jsonObject, fileName ) => {
  const jsonString = JSON.stringify( jsonObject );
  const dataString = `data:text/json;charset=utf-8,${ encodeURIComponent( jsonString ) }`;
  const anchorNode = document.createElement( 'a' );
  anchorNode.setAttribute( 'href', dataString );
  anchorNode.setAttribute( 'download', fileName );
  document.body.appendChild( anchorNode );
  anchorNode.click();
  anchorNode.remove();
};

export const downloadSoundData = () => {
  const state = storeRegistry.getStore().getState();
  downloadJSON( state.sound.sounds, 'sounds.json' );
};

export const downloadProjectData = () => {
  const state = cloneDeep( storeRegistry.getStore().getState() );

  // get rid of undo data
  state.tileset = state.tileset.present;
  state.tilemap = state.tilemap.present;
  const projectName = state.project.name;
  downloadJSON( state, `${ projectName }.project.json` );
};
