import {
  View, Text, TextInput, StyleSheet, TouchableOpacity, Alert
} from 'react-native'
import { useState } from 'react'
import { Link, router } from 'expo-router'
import { createUserWithEmailAndPassword } from 'firebase/auth'

import Button from '../../components/Botton'
import { auth } from '../../config'

const handlePress = (email: string, password: string): void => {
  // 会員登録
  createUserWithEmailAndPassword(auth, email, password)
    .then((userCredential) => {
      console.log(userCredential.user.uid)
      router.replace('/memo/list')
    })
    .catch((error: { code: string, message: string }): void => {
      console.log(error.code, error.message)
      Alert.alert(error.message)
    })
}

const SignUp = (): JSX.Element => {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  return (
    <View style={styles.container}>
      <View style={styles.inner}>
        <Text style={styles.title}>Sign Up</Text>
        <TextInput
          onChangeText={(text) => { setEmail(text) }}
          style={styles.input}
          value={email}
          autoCapitalize='none'
          keyboardType='email-address'
          placeholder='email address'
          textContentType='emailAddress'
        />
        <TextInput
          onChangeText={(text) => { setPassword(text) }}
          style={styles.input}
          value={password}
          autoCapitalize='none'
          secureTextEntry
          placeholder='password'
          textContentType='password'
        />
        <Button label='Submit' onPress={() => { handlePress(email, password) }} />
        <View style={styles.footer}>
          <Text style={styles.footerText}>Already registered?</Text>
        <Link href={'auth/log_in'} asChild replace>
          <TouchableOpacity>
          <Text style={styles.footerLink}>Log In.</Text>
          </TouchableOpacity>
        </Link>
        </View>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f0f4f8'
  },
  inner: {
    paddingVertical: 24,
    paddingHorizontal: 27
  },
  title: {
    fontSize: 24,
    lineHeight: 32,
    fontWeight: 'bold',
    marginBottom: 24
  },
  input: {
    borderWidth: 1,
    borderColor: '#DDDDDD',
    backgroundColor: '#ffffff',
    height: 48,
    padding: 8,
    fontSize: 16,
    marginBottom: 16
  },
  button: {
    backgroundColor: '#467fd3',
    borderRadius: 4,
    alignSelf: 'flex-start',
    marginBottom: 24
  },
  buttonLabel: {
    fontSize: 16,
    lineHeight: 32,
    color: '#ffffff',
    paddingVertical: 8,
    paddingHorizontal: 24
  },
  footer: {
    flexDirection: 'row'
  },
  footerText: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#000000'
  },
  footerLink: {
    fontSize: 14,
    lineHeight: 24,
    marginRight: 8,
    color: '#467fd3'
  }
})

export default SignUp
