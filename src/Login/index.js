import {useNavigation} from '@react-navigation/native';
import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from 'react-native';
import NormaliseSize, { normalizeFont } from '../Utils/NormaliseSize';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const navigation = useNavigation();

  const validateEmail = email => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleLogin = () => {
    let valid = true;

    // Clear previous errors
    setEmailError('');
    setPasswordError('');

    if (!email) {
      setEmailError('Email is required');
      valid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Invalid email format');
      valid = false;
    }

    if (!password) {
      setPasswordError('Password is required');
      valid = false;
    }

    if (valid) {
      navigation.reset({
        index: 0,
        routes: [
          {
            name: 'HousingList',
          },
        ],
      });
      // Handle login logic here
      console.log('Email:', email);
      console.log('Password:', password);
    }
  };

  return (
    <>
      <View style={styles.container}>
        <Text style={styles.title}>Login</Text>
        <TextInput
          style={[styles.input, emailError ? styles.errorInput : null]}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          keyboardType="email-address"
          autoCapitalize="none"
        />
        {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}

        <TextInput
          style={[styles.input, passwordError ? styles.errorInput : null]}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />
        {passwordError ? (
          <Text style={styles.errorText}>{passwordError}</Text>
        ) : null}

        <TouchableOpacity style={styles.button} onPress={handleLogin}>
          <Text style={styles.buttonText}>Login</Text>
        </TouchableOpacity>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    paddingHorizontal: NormaliseSize.nW(20),
    backgroundColor: '#f5f5f5',
  },
  title: {
    fontSize: normalizeFont(32),
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: NormaliseSize.nH(40),
  },
  input: {
    height: NormaliseSize.nH(50),
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: NormaliseSize.nW(8),
    paddingHorizontal: NormaliseSize.nW(10),
    backgroundColor: '#fff',
    marginBottom: NormaliseSize.nH(10), // Adjusted for error text spacing
  },
  errorInput: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: normalizeFont(12),
    marginBottom: NormaliseSize.nH(10), // Adjusted for spacing between input and error text
  },
  button: {
    height: NormaliseSize.nH(50),
    backgroundColor: '#007bff',
    borderRadius: NormaliseSize.nW(8),
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: NormaliseSize.nH(20),
  },
  buttonText: {
    color: '#fff',
    fontSize: normalizeFont(18),
    fontWeight: 'bold',
  },
});

export default Login;
