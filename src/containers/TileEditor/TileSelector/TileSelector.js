
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToggleHeader from 'Components/ToggleHeader/ToggleHeader';
import Button from 'Components/Button/Button';

import { toggleTileSelector } from 'State/Layout/tileSelectorIsOpen';
import { setTilesetSelection } from 'State/Tileset/tilesets';

import EditTilesetModal from './EditTilesetModal/EditTilesetModal';
import TileSelectorCanvas from './TileSelectorCanvas/TileSelectorCanvas';

import './TileSelector.scss';

class TileSelector extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      editModalIsOpen: false,
    };
  }

  handleSelectionChange( selection ) {
    const { activeIndex, _setTilesetSelection } = this.props;
    _setTilesetSelection( selection, activeIndex );
  }

  render() {
    const {
      isOpen,
      _toggleTileSelector,
      tileset,
      tileSize,
      palette,
      isInMapEditor,
    } = this.props;

    const { editModalIsOpen } = this.state;

    const className = isOpen ? 'tile-selector open'
      : 'tile-selector closed';

    const contentClass = isOpen ? 'content' : 'content closed';

    const editButtonRender = !isInMapEditor ? (
      <Button
        title="Edit Tileset"
        click={ () => this.setState( { editModalIsOpen: true } ) }
        standard
      />
    ) : null;

    const content = (
      <div className={ contentClass }>
        <TileSelectorCanvas
          width={ tileSize * tileset.width }
          height={ tileSize * tileset.height }
          palette={ palette }
          data={ tileset.layers[0].data }
          selectedTile={ tileset.selectedTile }
          selectionWidth={ tileset.selectionWidth }
          selectionHeight={ tileset.selectionHeight }
          tileSize={ tileSize }
          onSelectionChange={ s => this.handleSelectionChange( s ) }
        />
        { editButtonRender }
      </div>
    );

    const editModalRender = editModalIsOpen ? (
      <EditTilesetModal
        onClose={ () => this.setState( { editModalIsOpen: false } ) }
      />
    ) : null;

    return (
      <div className={ className }>
        <ToggleHeader
          title="Tiles"
          onToggle={ _toggleTileSelector }
        />
        { editModalRender }
        { content }
      </div>
    );
  }
}

TileSelector.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  _toggleTileSelector: PropTypes.func.isRequired,
  tileset: PropTypes.object.isRequired,
  tileSize: PropTypes.number.isRequired,
  palette: PropTypes.array.isRequired,
  activeIndex: PropTypes.number.isRequired,
  _setTilesetSelection: PropTypes.func.isRequired,
  isInMapEditor: PropTypes.bool,
};

TileSelector.defaultProps = {
  isInMapEditor: false,
};

function mapStateToProps( state ) {
  const { tileSize } = state.project;
  const { activeIndex } = state.tileset.present;
  const activeTileset = state.tileset.present.tilesets[activeIndex];

  return {
    isOpen: state.layout.tileSelectorIsOpen,
    palette: state.palette.colors,
    activeIndex,
    tileset: activeTileset,
    tileSize,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleTileSelector: toggleTileSelector,
    _setTilesetSelection: setTilesetSelection,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TileSelector );
