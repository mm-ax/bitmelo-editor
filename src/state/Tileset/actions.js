
export const CREATE_TILESET_EDITOR_SELECTION = 'CREATE_TILESET_EDITOR_SELECTION';
export const APPLY_TILESET_EDITOR_SELECTION = 'APPLY_TILESET_EDITOR_SELECTION';
export const REPOSITION_TILESET_EDITOR_SELECTION = 'REPOSITION_TILESET_EDITOR_SELECTION';

export function createTilesetEditorSelection( tilesetIndex, layerIndex, selection, editorSelection ) {
  return {
    type: CREATE_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      editorSelection,
    },
  };
}

export function applyTilesetEditorSelection( tilesetIndex, layerIndex, selection, editorSelection ) {
  return {
    type: APPLY_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      editorSelection,
    },
  };
}

export function repositionTilesetEditorSelection(
  tilesetIndex,
  layerIndex,
  selection,
  oldEditorSelection,
  newEditorSelection,
) {
  return {
    type: REPOSITION_TILESET_EDITOR_SELECTION,
    payload: {
      tilesetIndex,
      layerIndex,
      selection,
      oldEditorSelection,
      newEditorSelection,
    },
  };
}
