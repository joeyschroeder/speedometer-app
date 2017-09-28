import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { convertMetersPerSecondToKilometersPerHour, convertMetersPerSecondToMilesPerHour } from '../util/convert-units';

import PropTypes from 'prop-types';
import { SPEED_MEASUREMENTS } from '../ducks/speed-measurement';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: { position: 'relative' },
    text: {
        backgroundColor: 'transparent',
        fontFamily: Variables.fonts.digital.regular,
        fontSize: Variables.fontSizes.large,
        lineHeight: Variables.lineHeights.large
    },
    textBackground: {
        opacity: 0.2,
        position: 'absolute'
    }
});

export class Speed extends Component {

    constructor(props) {
        super(props);

        this.convertValue = this.convertValue.bind(this);
        this.renderValue = this.renderValue.bind(this);
    }

    convertValue() {
        const { unit, value } = this.props;
        const conversion = unit === SPEED_MEASUREMENTS.KILOMETERS ? convertMetersPerSecondToKilometersPerHour : convertMetersPerSecondToMilesPerHour;

        return conversion(value);
    }

    renderValue() {
        const value = Math.round(this.convertValue());

        let result = 0;

        if (value < 0) {
            result = '  0';
        } else if (value < 10) {
            result = '  ' + value;
        } else if (value < 100) {
            result = ' ' + value;
        } else {
            result = value;
        }

        return result;
    }

    render() {
        const { color } = this.props;

        return (
            <View style={styles.container}>
                <Text style={[styles.text, styles.textBackground, { color: color }]}>000</Text>
                <Text style={[styles.text, { color }]}>{this.renderValue()}</Text>
            </View>
        );
    }
}

Speed.defaultProps = {
    color: Variables.colors.white,
    value: 0,
    unit: SPEED_MEASUREMENTS.KILOMETERS
};

Speed.propTypes = {
    color: PropTypes.object,
    value: PropTypes.number,
    unit: PropTypes.number
};
