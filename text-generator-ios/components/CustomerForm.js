import React from 'react';
import { View, ScrollView, StyleSheet } from 'react-native';
import { Card, Title, Text } from 'react-native-paper';

const CustomerForm = () => {
  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Customer Form</Title>
      
      <Card style={styles.card}>
        <Card.Content>
          <Text>Customer form coming soon...</Text>
          <Text style={styles.subtitle}>
            This will be converted from your web app's CustomerForm component.
          </Text>
        </Card.Content>
      </Card>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5',
  },
  title: {
    textAlign: 'center',
    marginBottom: 20,
    fontSize: 24,
  },
  card: {
    marginBottom: 16,
  },
  subtitle: {
    marginTop: 8,
    color: '#666',
    fontStyle: 'italic',
  },
});

export default CustomerForm; 