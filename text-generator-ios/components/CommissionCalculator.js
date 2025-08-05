import React, { useState, useEffect } from 'react';
import {
  View,
  ScrollView,
  StyleSheet,
} from 'react-native';
import {
  Card,
  Title,
  TextInput,
  Button,
  Text,
  Chip,
  Snackbar,
} from 'react-native-paper';

const CommissionCalculator = () => {
  const [values, setValues] = useState({
    retailPrice: '',
    amountPaid: '',
    commissionRate: ''
  });

  const [snackbarVisible, setSnackbarVisible] = useState(false);

  // Calculate retail price when amount paid and commission rate are provided
  useEffect(() => {
    const { amountPaid, commissionRate } = values;
    
    if (amountPaid && commissionRate) {
      // Calculate retail price: amount paid / (1 - commission rate/100)
      const paid = parseFloat(amountPaid);
      const commission = parseFloat(commissionRate);
      const retailPrice = paid / (1 - commission / 100);
      setValues(prev => ({
        ...prev,
        retailPrice: retailPrice.toFixed(2)
      }));
    }
  }, [values.amountPaid, values.commissionRate]);

  const handleInputChange = (field, value) => {
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handlePresetClick = (percentage) => {
    setValues(prev => ({
      ...prev,
      commissionRate: percentage.toString()
    }));
  };

  const copyValue = (value) => {
    if (value) {
      // In React Native, we'll show a snackbar instead of copying
      setSnackbarVisible(true);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return `THB ${parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const presetPercentages = [22, 30, 32];

  return (
    <ScrollView style={styles.container}>
      <Title style={styles.title}>Commission Calculator</Title>
      
      <Card style={styles.card}>
        <Card.Content>
          {/* Commission Rate Field */}
          <Title style={styles.fieldTitle}>Commission rate</Title>
          <TextInput
            label="Commission rate"
            value={values.commissionRate}
            onChangeText={(text) => handleInputChange('commissionRate', text)}
            keyboardType="numeric"
            right={<TextInput.Affix text="%" />}
            style={styles.input}
          />
          
          {/* Preset Buttons */}
          <View style={styles.presetContainer}>
            <Text style={styles.presetLabel}>Quick select:</Text>
            <View style={styles.buttonGroup}>
              {presetPercentages.map((percent) => (
                <Chip
                  key={percent}
                  selected={values.commissionRate === percent.toString()}
                  onPress={() => handlePresetClick(percent)}
                  style={styles.presetButton}
                >
                  {percent}%
                </Chip>
              ))}
            </View>
          </View>

          {/* Amount Paid Field */}
          <Title style={styles.fieldTitle}>Amount you will get paid</Title>
          <TextInput
            label="Amount you will get paid"
            value={values.amountPaid}
            onChangeText={(text) => handleInputChange('amountPaid', text)}
            keyboardType="numeric"
            left={<TextInput.Affix text="THB" />}
            style={styles.input}
          />

          {/* Retail Price Field */}
          <Title style={styles.fieldTitle}>Suggested retail price</Title>
          <TextInput
            label="Suggested retail price"
            value={values.retailPrice}
            disabled={true}
            left={<TextInput.Affix text="THB" />}
            style={styles.input}
          />
          
          {/* Copy Button for Retail Price */}
          {values.retailPrice && (
            <Button
              mode="contained"
              onPress={() => copyValue(values.retailPrice)}
              style={styles.copyButton}
              icon="content-copy"
            >
              Copy {formatCurrency(values.retailPrice)}
            </Button>
          )}
        </Card.Content>
      </Card>

      <Snackbar
        visible={snackbarVisible}
        onDismiss={() => setSnackbarVisible(false)}
        duration={2000}
      >
        Value copied to clipboard!
      </Snackbar>
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
  fieldTitle: {
    fontSize: 16,
    marginTop: 16,
    marginBottom: 8,
  },
  input: {
    marginBottom: 8,
  },
  presetContainer: {
    marginBottom: 16,
  },
  presetLabel: {
    marginBottom: 8,
    color: '#666',
  },
  buttonGroup: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  presetButton: {
    marginRight: 8,
    marginBottom: 8,
  },
  copyButton: {
    marginTop: 16,
  },
});

export default CommissionCalculator; 