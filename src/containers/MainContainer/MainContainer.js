
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

import {
  PROJECT_TAB,
  PLAY_TAB,
  CODE_TAB,
  TILE_TAB,
  SOUND_TAB,
  TILEMAP_TAB,
} from 'State/Layout/activeNavigationTab';
import TopBar from 'Components/TopBar/TopBar';
import Scrollbars from 'Components/Scrollbars/Scrollbars';

import ProjectEditor from 'Containers/ProjectEditor/ProjectEditor';
import Play from 'Containers/Play/Play';
import CodeEditor from 'Containers/CodeEditor/CodeEditor';
import TileEditor from 'Containers/TileEditor/TileEditor';
import TilemapEditor from 'Containers/TilemapEditor/TilemapEditor';
import SoundEditor from 'Containers/SoundEditor/SoundEditor';

import './MainContainer.scss';

class MainContainer extends React.Component {
  render() {
    const { activeNavigationTab } = this.props;
    let contentRender = null;

    switch ( activeNavigationTab ) {
      case PROJECT_TAB:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        break;
      case PLAY_TAB:
        contentRender = <Play />;
        break;
      case CODE_TAB:
        contentRender = <CodeEditor />;
        break;
      case TILE_TAB:
        contentRender = <TileEditor />;
        break;
      case TILEMAP_TAB:
        contentRender = <TilemapEditor />;
        break;
      case SOUND_TAB:
        contentRender = (
          <Scrollbars>
            <SoundEditor />
          </Scrollbars>
        );
        break;
      default:
        contentRender = (
          <Scrollbars>
            <ProjectEditor />
          </Scrollbars>
        );
        break;
    }

    return (
      <div className="main-container">
        <TopBar title="Bitmelo" />
        { contentRender }
      </div>
    );
  }
}

MainContainer.propTypes = {
  activeNavigationTab: PropTypes.string.isRequired,
};

function mapStateToProps( state ) {
  return {
    activeNavigationTab: state.layout.activeNavigationTab,
  };
}

export default connect( mapStateToProps )( MainContainer );
