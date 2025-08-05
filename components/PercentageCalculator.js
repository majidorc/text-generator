import React, { useState } from 'react';
import {
  Box,
  Paper,
  Typography,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  Divider,
  Alert,
  IconButton,
  Tooltip
} from '@mui/material';
import {
  Calculate as CalculateIcon,
  Clear as ClearIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';

const PercentageCalculator = () => {
  const [calculations, setCalculations] = useState({
    // Basic percentage calculation
    basic: {
      value: '',
      percentage: '',
      result: ''
    },
    // Percentage of a number
    percentageOf: {
      number: '',
      percentage: '',
      result: ''
    },
    // Percentage change
    percentageChange: {
      oldValue: '',
      newValue: '',
      result: ''
    },
    // Percentage increase/decrease
    percentageIncrease: {
      originalValue: '',
      percentage: '',
      result: ''
    }
  });

  const [activeCalculation, setActiveCalculation] = useState('basic');

  const calculateBasic = () => {
    const { value, percentage } = calculations.basic;
    if (value && percentage) {
      const result = (parseFloat(value) * parseFloat(percentage)) / 100;
      setCalculations(prev => ({
        ...prev,
        basic: { ...prev.basic, result: result.toFixed(2) }
      }));
    }
  };

  const calculatePercentageOf = () => {
    const { number, percentage } = calculations.percentageOf;
    if (number && percentage) {
      const result = (parseFloat(number) * parseFloat(percentage)) / 100;
      setCalculations(prev => ({
        ...prev,
        percentageOf: { ...prev.percentageOf, result: result.toFixed(2) }
      }));
    }
  };

  const calculatePercentageChange = () => {
    const { oldValue, newValue } = calculations.percentageChange;
    if (oldValue && newValue) {
      const old = parseFloat(oldValue);
      const newVal = parseFloat(newValue);
      const change = ((newVal - old) / old) * 100;
      setCalculations(prev => ({
        ...prev,
        percentageChange: { ...prev.percentageChange, result: change.toFixed(2) }
      }));
    }
  };

  const calculatePercentageIncrease = () => {
    const { originalValue, percentage } = calculations.percentageIncrease;
    if (originalValue && percentage) {
      const original = parseFloat(originalValue);
      const percent = parseFloat(percentage);
      const result = original + (original * percent / 100);
      setCalculations(prev => ({
        ...prev,
        percentageIncrease: { ...prev.percentageIncrease, result: result.toFixed(2) }
      }));
    }
  };

  const handleInputChange = (calculationType, field, value) => {
    setCalculations(prev => ({
      ...prev,
      [calculationType]: {
        ...prev[calculationType],
        [field]: value
      }
    }));
  };

  const clearCalculation = (calculationType) => {
    setCalculations(prev => ({
      ...prev,
      [calculationType]: {
        ...prev[calculationType],
        value: '',
        percentage: '',
        result: '',
        number: '',
        oldValue: '',
        newValue: '',
        originalValue: ''
      }
    }));
  };

  const copyResult = (result) => {
    if (result) {
      navigator.clipboard.writeText(result);
    }
  };

  const calculationTypes = [
    {
      key: 'basic',
      title: 'Basic Percentage',
      description: 'Calculate X% of a number',
      fields: [
        { name: 'value', label: 'Number', type: 'number' },
        { name: 'percentage', label: 'Percentage (%)', type: 'number' }
      ],
      calculate: calculateBasic,
      resultLabel: 'Result'
    },
    {
      key: 'percentageOf',
      title: 'Percentage of Number',
      description: 'What percentage is X of Y',
      fields: [
        { name: 'number', label: 'Number', type: 'number' },
        { name: 'percentage', label: 'Percentage (%)', type: 'number' }
      ],
      calculate: calculatePercentageOf,
      resultLabel: 'Result'
    },
    {
      key: 'percentageChange',
      title: 'Percentage Change',
      description: 'Calculate percentage increase/decrease',
      fields: [
        { name: 'oldValue', label: 'Old Value', type: 'number' },
        { name: 'newValue', label: 'New Value', type: 'number' }
      ],
      calculate: calculatePercentageChange,
      resultLabel: 'Percentage Change (%)'
    },
    {
      key: 'percentageIncrease',
      title: 'Percentage Increase/Decrease',
      description: 'Add/subtract percentage to a value',
      fields: [
        { name: 'originalValue', label: 'Original Value', type: 'number' },
        { name: 'percentage', label: 'Percentage (%)', type: 'number' }
      ],
      calculate: calculatePercentageIncrease,
      resultLabel: 'Final Value'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Percentage Calculator
      </Typography>
      
      <Grid container spacing={3}>
        {calculationTypes.map((calc) => (
          <Grid item xs={12} md={6} key={calc.key}>
            <Card 
              sx={{ 
                height: '100%',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                },
                border: activeCalculation === calc.key ? 2 : 1,
                borderColor: activeCalculation === calc.key ? 'primary.main' : 'divider'
              }}
              onClick={() => setActiveCalculation(calc.key)}
            >
              <CardContent>
                <Typography variant="h6" gutterBottom>
                  {calc.title}
                </Typography>
                <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                  {calc.description}
                </Typography>
                
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  {calc.fields.map((field) => (
                    <TextField
                      key={field.name}
                      label={field.label}
                      type={field.type}
                      value={calculations[calc.key][field.name]}
                      onChange={(e) => handleInputChange(calc.key, field.name, e.target.value)}
                      fullWidth
                      size="small"
                    />
                  ))}
                  
                  <Box sx={{ display: 'flex', gap: 1, mt: 2 }}>
                    <Button
                      variant="contained"
                      startIcon={<CalculateIcon />}
                      onClick={calc.calculate}
                      fullWidth
                    >
                      Calculate
                    </Button>
                    <Tooltip title="Clear">
                      <IconButton
                        onClick={() => clearCalculation(calc.key)}
                        color="secondary"
                      >
                        <ClearIcon />
                      </IconButton>
                    </Tooltip>
                  </Box>
                  
                  {calculations[calc.key].result && (
                    <Alert 
                      severity="success" 
                      sx={{ mt: 2 }}
                      action={
                        <Tooltip title="Copy result">
                          <IconButton
                            size="small"
                            onClick={() => copyResult(calculations[calc.key].result)}
                          >
                            <CopyIcon />
                          </IconButton>
                        </Tooltip>
                      }
                    >
                      <Typography variant="body2">
                        <strong>{calc.resultLabel}:</strong> {calculations[calc.key].result}
                      </Typography>
                    </Alert>
                  )}
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          Quick Tips
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Use positive percentages for increases, negative for decreases
          • The percentage change calculation shows the relative change between two values
          • All results are rounded to 2 decimal places for precision
        </Typography>
      </Box>
    </Box>
  );
};

export default PercentageCalculator; 