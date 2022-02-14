import React from 'react';
import { StyleSheet, Text } from 'react-native';

const WalletPropertyText = (props) => {
    return(
        <Text style={styles.propertyStyle}>{props.children}</Text>
    )
};

const styles = StyleSheet.create({
    propertyStyle:{
        fontSize:20,
        marginLeft:10,
        marginRight:20
    }
});

export default WalletPropertyText;