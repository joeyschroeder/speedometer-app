import { Constants, KeepAwake } from 'expo';
import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { Compass } from '../compass';
import PropTypes from 'prop-types';
import { SignalStrength } from '../signal-strength';
import { Speedometer } from '../speedometer';
import { Variables } from '../../assets/styles/variables';

const styles = StyleSheet.create({
    container: { flex: 1 },
    signalStrength: {
        position: 'absolute',
        right: Variables.spacer.base / 2,
        top: Constants.statusBarHeight + Variables.spacer.base / 2
    }
});

export class DashboardScreen extends Component {

    render() {
        const { accuracy, heading, speed, speedMeasurement, style, toggleSpeedMeasurement, topSpeed } = this.props;

        return (
            <View style={[styles.container, style]}>
                <KeepAwake />
                <SignalStrength style={styles.signalStrength} accuracy={accuracy} />
                <Compass
                    heading={heading}
                    style={{ flex: 1 }}
                />
                <Speedometer
                    speed={speed}
                    speedMeasurement={speedMeasurement}
                    style={{ flex: 4 }}
                    toggleSpeedMeasurement={toggleSpeedMeasurement}
                    topSpeed={topSpeed}
                />
            </View>
        );
    }
}

DashboardScreen.defaultProps = {

};

DashboardScreen.propTypes = {
    accuracy: PropTypes.number,
    heading: PropTypes.number,
    speed: PropTypes.number,
    speedMeasurement: PropTypes.number,
    style: PropTypes.oneOfType([
        PropTypes.number,
        PropTypes.object
    ]),
    toggleSpeedMeasurement: PropTypes.func,
    topSpeed: PropTypes.number
};