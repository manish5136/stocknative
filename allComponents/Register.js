import React, { useState } from 'react';
import { ScrollView, View, Text, TextInput, Button, Image, TouchableOpacity } from 'react-native';
import Toast from 'react-native-toast-message';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirmPassword: '',
    agreement: false,
  });

  const [errors, setErrors] = useState({});

  const handleInputChange = (fieldName, value) => {
    setFormData({
      ...formData,
      [fieldName]: value,
    });
    // Clear the error message when the user starts typing again
    setErrors({
      ...errors,
      [fieldName]: '',
    });
  };

  const handleSubmit = () => {
    const formErrors = {};

    if (!formData.username.trim()) {
      formErrors.username = 'Please enter a username';
    }

    if (!formData.email.trim()) {
      formErrors.email = 'Please enter an email';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      formErrors.email = 'Please enter a valid email';
    }

    if (!formData.password.trim()) {
      formErrors.password = 'Please enter a password';
    }

    if (!formData.confirmPassword.trim()) {
      formErrors.confirmPassword = 'Please confirm your password';
    } else if (formData.password !== formData.confirmPassword) {
      formErrors.confirmPassword = 'Passwords do not match';
    }

    if (!formData.agreement) {
      formErrors.agreement = 'Please accept the agreement';
    }

    if (Object.keys(formErrors).length === 0) {
      Toast.show({
        type: 'success',
        position: 'top',
        text1: 'Success',
        text2: 'You are registered successfully!',
      });
      setFormData({
        username: '',
        email: '',
        password: '',
        confirmPassword: '',
        agreement: false,
      });
    } else {
      setErrors(formErrors);
    }
  };

  return (
    <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
      <View>
        <View style={{ backgroundColor: '#1890ff', padding: 20 }}>
          <Text style={{ color: 'white', textAlign: 'center' }}>Register yourself</Text>
        </View>
        <View style={{ alignItems: 'center', marginTop: 50 }}>
          <View style={{ width: '80%', padding: 20, borderWidth: 1, borderColor: '#ccc', borderRadius: 5 }}>
            <View style={{ alignItems: 'center', marginBottom: 20 }}>
              <Image
                source={require('../assets/RegImg.png')}
                style={{ width: '100%', height: 200, borderTopLeftRadius: 5, borderTopRightRadius: 5 }}
              />
            </View>
            <View>
              <TextInput
                placeholder="Username"
                value={formData.username}
                onChangeText={(text) => handleInputChange('username', text)}
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              />
              {errors.username && <Text style={{ color: 'red' }}>{errors.username}</Text>}
              <TextInput
                placeholder="Email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              />
              {errors.email && <Text style={{ color: 'red' }}>{errors.email}</Text>}
              <TextInput
                placeholder="Password"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              />
              {errors.password && <Text style={{ color: 'red' }}>{errors.password}</Text>}
              <TextInput
                placeholder="Confirm Password"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                secureTextEntry={true}
                style={{ borderWidth: 1, borderColor: '#ccc', borderRadius: 5, padding: 10, marginBottom: 10 }}
              />
              {errors.confirmPassword && <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>}
              <TouchableOpacity
                onPress={() => handleInputChange('agreement', !formData.agreement)}
                style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 10 }}
              >
                <Text style={{ marginRight: 10 }}>I have read the agreement</Text>
                <Text>{formData.agreement ? '✔️' : '❌'}</Text>
              </TouchableOpacity>
              {errors.agreement && <Text style={{ color: 'red' }}>{errors.agreement}</Text>}
              <View style={{ alignItems: 'center' }}>
                <Button title="Register" onPress={handleSubmit} />
              </View>
            </View>
          </View>
        </View>
      </View>
      <Toast ref={(ref) => Toast.setRef(ref)} />
    </ScrollView>
  );
};

export default Register;
