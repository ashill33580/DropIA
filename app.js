
import React, { useState, useEffect } from 'react';
import { I18nManager, SafeAreaView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import * as Localization from 'expo-localization';
import i18n from 'i18n-js';
import AsyncStorage from '@react-native-async-storage/async-storage';

// Traductions
i18n.translations = {
  fr: {
    welcome: "Bienvenue sur DropIA",
    ask: "Posez votre question",
    send: "Envoyer",
    loading: "Chargement...",
    error: "Une erreur s’est produite.",
    placeholder: "Écrivez ici...",
  },
  en: {
    welcome: "Welcome to DropIA",
    ask: "Ask your question",
    send: "Send",
    loading: "Loading...",
    error: "An error occurred.",
    placeholder: "Type here...",
  }
};

i18n.locale = Localization.locale;
i18n.fallbacks = true;

export default function App() {
  const [message, setMessage] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);

  const sendToAI = async () => {
    if (!message) return;
    setLoading(true);
    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer VOTRE_CLÉ_OPENAI_ICI"
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [{ role: "user", content: message }]
        })
      });

      const data = await res.json();
      const reply = data.choices?.[0]?.message?.content || i18n.t("error");
      setResponse(reply);
    } catch (e) {
      setResponse(i18n.t("error"));
    }
    setLoading(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>{i18n.t("welcome")}</Text>
      <TextInput
        style={styles.input}
        placeholder={i18n.t("placeholder")}
        value={message}
        onChangeText={setMessage}
        multiline
      />
      <TouchableOpacity style={styles.button} onPress={sendToAI}>
        <Text style={styles.buttonText}>{i18n.t("send")}</Text>
      </TouchableOpacity>
      <View style={styles.responseBox}>
        <Text>{loading ? i18n.t("loading") : response}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#0a0a0a",
    padding: 20,
    justifyContent: "flex-start",
  },
  title: {
    fontSize: 24,
    color: "#fff",
    fontWeight: "bold",
    marginBottom: 20,
  },
  input: {
    backgroundColor: "#1e1e1e",
    color: "#fff",
    padding: 15,
    borderRadius: 10,
    minHeight: 100,
    textAlignVertical: "top",
  },
  button: {
    backgroundColor: "#007aff",
    padding: 15,
    borderRadius: 10,
    marginTop: 10,
    alignItems: "center",
  },
  buttonText: {
    color: "#fff",
    fontWeight: "bold",
  },
  responseBox: {
    marginTop: 20,
    backgroundColor: "#1e1e1e",
    padding: 15,
    borderRadius: 10,
  }
});
