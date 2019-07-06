
import { RESET_PROJECT } from 'State/globalActions';

// Constants
export const PENCIL_TOOL = 'PENCIL_TOOL';
export const ERASER_TOOL = 'ERASER_TOOL';

// Actions
export const SELECT_PIXEL_TOOL = 'SELECT_PIXEL_TOOL';

// Reducer
const initialState = PENCIL_TOOL;
export default function reducer( state = initialState, action ) {
  switch ( action.type ) {
    case RESET_PROJECT: {
      return initialState;
    }
    case SELECT_PIXEL_TOOL: {
      return action.payload;
    }
    default:
      return state;
  }
}


// Action Creators
export function selectPixelTool( tool ) {
  return {
    type: SELECT_PIXEL_TOOL,
    payload: tool,
  };
}
