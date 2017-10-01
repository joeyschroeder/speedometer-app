import React, { Component } from 'react';
import { StyleSheet, View } from 'react-native';

import { CompassDirection } from './compass-direction';
import PropTypes from 'prop-types';
import { Variables } from '../assets/styles/variables';

const styles = StyleSheet.create({
    container: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'center',
        padding: Variables.spacer.base
    },
    direction: {
        alignItems: 'center',
        flex: 1,
        justifyContent: 'flex-end',
        paddingHorizontal: Variables.spacer.base / 2
    },
    directionContainer: {
        flex: 1,
        flexDirection: 'row'
    }
});

export class Compass extends Component {

    shouldComponentUpdate(nextProps) {
        const { heading } = nextProps;
        return heading !== this.props.heading;
    }

    render() {
        const { style, heading } = this.props;

        return (
            <View style={[styles.container, style]}>
                <View style={styles.directionContainer}>
                    <View style={styles.direction}>
                        <CompassDirection value={'N'} active={(heading <= 55 && heading >= 0)|| heading >= 305} />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection value={'E'} active={heading >= 35 && heading <= 145} />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection value={'S'} active={heading >= 125 && heading <= 235} />
                    </View>
                    <View style={styles.direction}>
                        <CompassDirection value={'W'} active={heading >= 215 && heading <= 325} />
                    </View>
                </View>
            </View>
        );
    }
}

Compass.defaultProps = {
    heading: -1 // set to -1 to prevent flash of 0 degrees of ('N') on the compass on load
};

Compass.propTypes = {
    heading: PropTypes.number,
    style: PropTypes.oneOfType([ PropTypes.number, PropTypes.object ])
};
