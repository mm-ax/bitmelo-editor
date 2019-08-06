
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';

import ToolPicker from 'Components/ToolPicker/ToolPicker';

import { TILE_DRAW_TOOL, TILE_ERASE_TOOL, selectTileTool } from 'State/PixelTools/selectedTileTool';

import './TilemapToolPicker.scss';

class TilemapToolPicker extends React.Component {
  constructor( props ) {
    super( props );

    this.handleKeyDown = this.handleKeyDown.bind( this );
  }

  componentDidMount() {
    window.addEventListener( 'keydown', this.handleKeyDown );
  }

  componentWillUnmount() {
    window.removeEventListener( 'keydown', this.handleKeyDown );
  }

  handleKeyDown( event ) {
    if ( event.which === 66 ) { // b
      this.handleSelectedToolChange( TILE_DRAW_TOOL );
    }
    else if ( event.which === 69 ) { // e
      this.handleSelectedToolChange( TILE_ERASE_TOOL );
    }
  }

  handleSelectedToolChange( tool ) {
    const { _selectTileTool } = this.props;
    _selectTileTool( tool );
  }

  render() {
    const { selectedTool } = this.props;

    const tools = [
      { key: TILE_DRAW_TOOL, title: 'Draw', icon: 'pencil' },
      { key: TILE_ERASE_TOOL, title: 'Eraser', icon: 'eraser' },
    ];

    return (
      <ToolPicker
        tools={ tools }
        selectedTool={ selectedTool }
        onSelectedToolChange={ tool => this.handleSelectedToolChange( tool ) }
      />
    );
  }
}

TilemapToolPicker.propTypes = {
  selectedTool: PropTypes.string.isRequired,
  _selectTileTool: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    selectedTool: state.pixelTools.selectedTileTool,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _selectTileTool: selectTileTool,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( TilemapToolPicker );
