import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { useState } from 'react';
import { useRouter } from 'expo-router';
import { FontAwesome, Feather, Ionicons } from '@expo/vector-icons';
import useRighteousFont from '../hooks/Font/index';

export default function SignIn() {
  const fontLoaded = useRighteousFont();
  const router = useRouter();

  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    password: '',
  });

  if (!fontLoaded) {
    return null;
  }

  const handleChange = (field: string, value: string) => {
    setForm({ ...form, [field]: value });
  };

  const handleSubmit = () => {
    console.log(form);
    router.replace('/login');
  };

  const formatarTelefone = (text: string) => {
    const numeros = text.replace(/\D/g, '');

    let telefoneFormatado = '';

    if (numeros.length <= 2) {
      telefoneFormatado = `(${numeros}`;
    } else if (numeros.length <= 7) {
      telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2)}`;
    } else if (numeros.length <= 11) {
      telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7)}`;
    } else {
      telefoneFormatado = `(${numeros.slice(0, 2)}) ${numeros.slice(2, 7)}-${numeros.slice(7, 11)}`;
    }

    return telefoneFormatado;
  };

  return (
    <View style={styles.container}>
      <View style={styles.logo}>
        <Image source={require('../assets/logo.png')} style={styles.logoImage} resizeMode="contain" />
      </View>
      <Text style={styles.title}>Crie sua conta:</Text>
      <Text style={styles.subtitle}>Peça corridas ainda hoje!</Text>

      <View style={styles.inputWrapper}>
        <FontAwesome name="user" size={20} color="#fff" />
        <TextInput
          placeholder="Insira seu Nome Completo"
          placeholderTextColor="#aaa"
          onChangeText={(text) => handleChange('name', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="mail" size={20} color="#fff" />
        <TextInput
          placeholder="Insira seu E-mail"
          placeholderTextColor="#aaa"
          onChangeText={(text) => handleChange('email', text)}
          style={styles.input}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Feather name="phone" size={20} color="#fff" />
        <TextInput
          placeholder="Insira seu Telefone"
          placeholderTextColor="#aaa"
          keyboardType="numeric"
          value={form.phone}
          onChangeText={(text) => handleChange('phone', formatarTelefone(text))}
          style={styles.input}
        />
      </View>

      <View style={styles.inputWrapper}>
        <Ionicons name="eye-outline" size={20} color="#fff" />
        <TextInput
          placeholder="Insira sua Senha"
          placeholderTextColor="#aaa"
          secureTextEntry
          onChangeText={(text) => handleChange('password', text)}
          style={styles.input}
        />
      </View>

      <TouchableOpacity style={styles.button} onPress={handleSubmit}>
        <Text style={styles.buttonText}>Criar Conta</Text>
      </TouchableOpacity>

      <TouchableOpacity onPress={() => router.push('/login')}>
        <Text style={styles.linkText}>Já possui conta? Faça login!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#000',
    paddingHorizontal: 30,
    justifyContent: 'center',
  },
  logo: {
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: -30,
    marginTop: -185,
  },
  logoImage: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 400,
    height: 400,
  },
  title: {
    fontFamily: 'Righteous',
    fontSize: 24,
    color: '#fff',
    textAlign: 'center',
  },
  subtitle: {
    color: '#fff',
    textAlign: 'center',
    marginBottom: 30,
    fontFamily: 'Righteous',
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#111',
    borderColor: '#333',
    borderWidth: 1,
    paddingHorizontal: 12,
    paddingVertical: 10,
    borderRadius: 8,
    marginBottom: 15,
  },
  input: {
    flex: 1,
    color: '#fff',
    fontFamily: 'Righteous',
    marginLeft: 10,
  },
  button: {
    backgroundColor: '#fff',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginBottom: 15,
  },
  buttonText: {
    color: '#000',
    fontFamily: 'Righteous',
    fontSize: 16,
    textAlign: 'center',
  },
  linkText: {
    color: '#fff',
    textAlign: 'center',
    textDecorationLine: 'underline',
    fontFamily: 'Righteous',
  },
});
