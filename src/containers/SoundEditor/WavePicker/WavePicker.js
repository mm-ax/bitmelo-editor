
import React from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import PropTypes from 'prop-types';

import Card from '../../../components/Card/Card';
import Select from '../../../components/Select/Select';
import { setSoundData } from '../../../state/Sound/sounds';

import './WavePicker.scss';

class WavePicker extends React.Component {
  handleWaveTypeChange( newValue ) {
    const { setSound, activeSound, soundData } = this.props;
    const waveValue = Number.parseInt( newValue, 10 );
    setSound( activeSound, { ...soundData, wave: waveValue } );
  }

  render() {
    const { soundData } = this.props;
    const waveTypeItems = [
      { value: '0', display: 'Sine' },
      { value: '1', Buttondisplay: 'Triangle' },
      { value: '2', display: 'Square' },
      { value: '3', display: 'Sawtooth' },
    ];

    return (
      <Card className="wave-picker">
        <Select
          title="Wave Type"
          items={ waveTypeItems }
          value={ soundData.wave.toString() }
          onValueChange={ newValue => this.handleWaveTypeChange( newValue ) }
        />
      </Card>
    );
  }
}

WavePicker.propTypes = {
  soundData: PropTypes.shape( {
    volumeTics: PropTypes.arrayOf( PropTypes.number ),
    wave: PropTypes.object.isRequired,
  } ).isRequired,
  activeSound: PropTypes.number.isRequired,
  setSound: PropTypes.func.isRequired,
};

function mapStateToProps( state ) {
  const { sounds, activeSound } = state.sound;

  return {
    soundData: sounds[activeSound],
    activeSound,
  };
}

function mapDispatchToProps( dispatch ) {
  return bindActionCreators( {
    setSound: setSoundData,
  }, dispatch );
}

export default connect( mapStateToProps, mapDispatchToProps )( WavePicker );
