
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';
import enhanceWithClickOutside from 'react-click-outside';

import Button from '../../../components/Button/Button';
import DropDownMenu from '../../../components/DropDownMenu/DropDownMenu';
import CreateProjectModal from '../CreateProjectModal/CreateProjectModal';

import { logoutUser } from '../../../state/User/currentUser';

import './UserButton.scss';

class UserButton extends React.Component {
  constructor( props ) {
    super( props );

    this.state = {
      dropDownIsOpen: false,
      createProjectModalIsOpen: false,
    };
  }

  handleClickOutside() {
    const { dropDownIsOpen } = this.state;
    if ( dropDownIsOpen ) {
      this.setState( { dropDownIsOpen: false } );
    }
  }

  handleMenuSelection( key ) {
    const { _logoutUser } = this.props;
    switch ( key ) {
      case 'logout':
        _logoutUser();
        break;
      case 'create-project':
        this.setState( { createProjectModalIsOpen: true, dropDownIsOpen: false } );
        break;
      default: break;
    }
  }

  render() {
    const { currentUser } = this.props;
    const { dropDownIsOpen, createProjectModalIsOpen } = this.state;

    const dropDownItems = [
      {
        key: 'create-project',
        display: 'Create New Project',
      },
      {
        key: 'my-projects',
        display: 'My Projects',
      },
      {
        key: 'logout',
        display: 'Log Out',
      },
    ];

    const dropDownRender = dropDownIsOpen ? (
      <DropDownMenu
        items={ dropDownItems }
        onClose={ () => this.setState( { dropDownIsOpen: false } ) }
        onSelect={ k => this.handleMenuSelection( k ) }
      />
    ) : null;

    const createProjectModalRender = createProjectModalIsOpen ? (
      <CreateProjectModal
        onClose={ () => this.setState( { createProjectModalIsOpen: false } ) }
      />
    ) : null;
    return (
      <div className="user-button-container">
        <Button
          className="user-button"
          title={ currentUser.displayName }
          click={ () => this.setState( { dropDownIsOpen: !dropDownIsOpen } ) }
        />
        { dropDownRender }
        { createProjectModalRender }
      </div>
    );
  }
}

UserButton.propTypes = {
  currentUser: PropTypes.object.isRequired,
  _logoutUser: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  return {
    currentUser: state.user.currentUser,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    _logoutUser: logoutUser,
  }, dispatch );
}

// eslint-disable-next-line no-class-assign
UserButton = enhanceWithClickOutside( UserButton );

export default connect( mapStateToProps, mapDispatchToProps )( UserButton );