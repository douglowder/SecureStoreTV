import { useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  TextInput,
  Button,
  Platform,
} from 'react-native';
import * as SecureStore from 'expo-secure-store';

async function save(key: string, value: string) {
  await SecureStore.setItemAsync(key, value);
}

async function getValueFor(key: string) {
  let result = await SecureStore.getItemAsync(key);
  if (result) {
    alert("🔐 Here's your value 🔐 \n" + result);
  } else {
    alert('No values stored under that key.');
  }
}

export default function App() {
  const [key, onChangeKey] = useState('Your key here');
  const [value, onChangeValue] = useState('Your value here');

  return (
    <View style={styles.container}>
      <Text style={styles.paragraph}>Save an item, and grab it later!</Text>
      {}

      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={(text) => onChangeKey(text)}
        value={key}
      />
      <TextInput
        style={styles.textInput}
        clearTextOnFocus
        onChangeText={(text) => onChangeValue(text)}
        value={value}
      />
      {}
      <Button
        title="Save this key/value pair"
        onPress={() => {
          save(key, value);
          onChangeKey('Your key here');
          onChangeValue('Your value here');
        }}
      />
      <Text style={styles.paragraph}>🔐 Enter your key 🔐</Text>
      <TextInput
        style={styles.textInput}
        onSubmitEditing={(event) => {
          getValueFor(event.nativeEvent.text);
        }}
        placeholder="Enter the key for the value you want to get"
      />
    </View>
  );
}

const scale = Platform.OS === 'ios' ? 2 : 1;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingTop: 10 * scale,
    backgroundColor: '#ecf0f1',
    padding: 8 * scale,
  },
  paragraph: {
    marginTop: 34 * scale,
    margin: 24 * scale,
    fontSize: 18 * scale,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  textInput: {
    height: 35 * scale,
    borderColor: 'gray',
    borderWidth: 0.5 * scale,
    padding: 4 * scale,
  },
});
