import React, { useState } from 'react';
import { View, Text, TextInput, Button, StyleSheet, TouchableOpacity } from 'react-native';

export default function App() {
  const [num1, setNum1] = useState('');
  const [num2, setNum2] = useState('');
  const [operation, setOperation] = useState('add');
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);


  const [altura, setAltura] = useState('');
  const [peso, setPeso] = useState('');
  const [imcResult, setResultImc] = useState(null);
  const [imcError, setErrorImc] = useState(null);

  const handleCalculate = async () => {
    try {
      setError(null); // Reset error
      const response = await fetch(
        `http://192.168.56.1:3000/calculate?num1=${num1}&num2=${num2}&operation=${operation}`
      );
      const data = await response.json();

      if (response.ok) {
        setResult(data.result);
      } else {
        setError(data.error);
        setResult(null);
      }
    } catch (err) {
      setError('Erro de rede ou servidor!');
      setResult(null);
    }
  };
{/*imc */}
  const handleImc = async () => {
    try {
      setErrorImc(null); // Reset error
      const response = await fetch(
        `http://192.168.56.1:3000/imc?altura=${altura}&peso=${peso}`
      );
      const data = await response.json();

      if (response.ok) {
        setResultImc(data.result);
      } else {
        setErrorImc(data.error);
        setResultImc(null);
      }
    } catch (err) {
      setErrorImc('Erro de rede ou servidor!');
      setResultImc(null);
    }
  };


  const getButtonStyle = (op) => {
    return operation === op ? styles.selectedButton : styles.button;
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Calculadora</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número 1"
        value={num1}
        onChangeText={setNum1}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Número 2"
        value={num2}
        onChangeText={setNum2}
      />

      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={getButtonStyle('add')}
          onPress={() => setOperation('add')}
        >
          <Text style={styles.buttonText}>Adicionar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('subtract')}
          onPress={() => setOperation('subtract')}
        >
          <Text style={styles.buttonText}>Subtrair</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('multiply')}
          onPress={() => setOperation('multiply')}
        >
          <Text style={styles.buttonText}>Multiplicar</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('divide')}
          onPress={() => setOperation('divide')}
        >
          <Text style={styles.buttonText}>Dividir</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={getButtonStyle('par')}
          onPress={() => setOperation('par')}
        >
          <Text style={styles.buttonText}>Par/Impar</Text>
        </TouchableOpacity>
      </View>

      <Button title="Calcular" onPress={handleCalculate} />

      {result !== null && <Text style={styles.result}>Resultado: {result}</Text>}
      {error && <Text style={styles.error}>Erro: {error}</Text>}
    
      {/*IMC*/}

      <Text style={styles.title}>Calcular IMC</Text>

      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="alturaEmCm"
        value={altura}
        onChangeText={setAltura}
      />
      <TextInput
        style={styles.input}
        keyboardType="numeric"
        placeholder="Peso"
        value={peso}
        onChangeText={setPeso}
      />

      <Button title="Calcular IMC" onPress={handleImc} />

      {imcResult !== null && <Text style={styles.result}>Resultado: {imcResult}</Text>}
      {imcError && <Text style={styles.error}>Erro: {imcError}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 16,
  },
  title: {
    fontSize: 24,
    textAlign: 'center',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 12,
    paddingHorizontal: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 16,
  },
  button: {
    backgroundColor: 'lightgray',
    padding: 10,
    borderRadius: 5,
  },
  selectedButton: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 12,
  },
  result: {
    fontSize: 18,
    textAlign: 'center',
    marginTop: 16,
  },
  error: {
    fontSize: 18,
    color: 'red',
    textAlign: 'center',
    marginTop: 16,
  },
});







