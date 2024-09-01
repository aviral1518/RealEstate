// libs
import React from 'react';
import { Dimensions, StyleSheet, View } from 'react-native';
import { ActivityIndicator } from 'react-native-paper';

const styles = StyleSheet.create({
  loading: {
    backgroundColor: 'rgba(0,0,0,0.5)',
    elevation: 10000,
    flex: 1,
    height: Dimensions.get('screen').height,
    justifyContent: 'center',
    position: 'absolute',
    width: Dimensions.get('screen').width,
  },
  loadingContent: {
    height: '100%',
    justifyContent:'center',
    alignItems:'center',
},
});

function Loader({
    loading,
}) {
  return (
    loading && (
      <View style={styles.loading}>
        <View
          style={styles.loadingContent}
        >
          <ActivityIndicator animating color={'cyan'} size="large" />
        </View>
      </View>
    )
  );
}

export default Loader;
