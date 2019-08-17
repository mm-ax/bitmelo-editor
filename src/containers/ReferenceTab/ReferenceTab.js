
import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import ReferenceConsole from 'Containers/ReferenceContent/ReferenceConsole/ReferenceConsole';
import Articles from 'Containers/ReferenceContent/Articles/Articles';

import TopBar from 'Components/TopBar/TopBar';
import Button from 'Components/Button/Button';
import Scrollbars from 'Components/Scrollbars/Scrollbars';

import { toggleReferencePanel } from 'State/Layout/referencePanelIsOpen';
import { setReferenceRoute, CONSOLE, ARTICLES } from 'State/Layout/referenceRoutes';

import './ReferenceTab.scss';

class ReferenceTab extends React.Component {
  handleBackClick() {
    const { _setReferenceRoute, section, route } = this.props;
    const newRoute = [...route.current];
    if ( newRoute.length > 1 ) {
      newRoute.pop();
      _setReferenceRoute( section, newRoute );
    }
  }

  render() {
    const {
      _toggleReferencePanel,
      isOpen,
      topBarTitle,
      route,
      section,
    } = this.props;
    const className = isOpen ? 'reference-tab' : 'reference-tab closed';

    let contentRender = (
      <div>
        Missing Content
      </div>
    );

    if ( route.current.length > 0 ) {
      switch ( route.current[0] ) {
        case CONSOLE: {
          contentRender = (
            <ReferenceConsole />
          );
          break;
        }
        case ARTICLES: {
          contentRender = (
            <Scrollbars>
              <Articles
                route={ route }
                section={ section }
              />
            </Scrollbars>
          );
          break;
        }
        default: break;
      }
    }

    const showBackButton = route.current.length > 1;

    const mainRender = isOpen ? (
      <div className="reference-main">
        <TopBar
          title={ topBarTitle }
          showBackButton={ showBackButton }
          onBackClick={ () => this.handleBackClick() }
        />
        { contentRender }
      </div>
    ) : null;

    return (
      <div className={ className }>
        <Button
          className="toggle-btn"
          title="Toggle Reference Panel"
          icon="play"
          click={ () => _toggleReferencePanel() }
          hideTitle
        />
        { mainRender }
      </div>
    );
  }
}

ReferenceTab.propTypes = {
  isOpen: PropTypes.bool.isRequired,
  _toggleReferencePanel: PropTypes.func.isRequired,
  topBarTitle: PropTypes.string.isRequired,
  route: PropTypes.object.isRequired,
  section: PropTypes.string.isRequired,
  _setReferenceRoute: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { activeNavigationTab } = state.layout;
  const route = state.layout.referenceRoutes[activeNavigationTab];
  return {
    isOpen: state.layout.referencePanelIsOpen,
    topBarTitle: state.layout.referenceTabTitle,
    route,
    section: activeNavigationTab,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _toggleReferencePanel: toggleReferencePanel,
    _setReferenceRoute: setReferenceRoute,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( ReferenceTab );
