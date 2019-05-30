
import React from 'react';

import PixelToolSettings from 'Containers/PixelEditor/PixelToolSettings/PixelToolSettings';
import PixelToolPicker from 'Containers/PixelEditor/PixelToolPicker/PixelToolPicker';
import TilePixelEditor from 'Containers/TileEditor/TilePixelEditor/TilePixelEditor';
import PalettePicker from 'Containers/PalettePicker/PalettePicker';

import './TileEditor.scss';

class TileEditor extends React.Component {
  render() {
    return (
      <div className="tile-editor">
        <PixelToolSettings />
        <PixelToolPicker />
        <div className="editor-section">
          <TilePixelEditor />
          <PalettePicker />
        </div>
        <div className="data-section" />
      </div>
    );
  }
}

export default TileEditor;