import React, { useState, useEffect } from 'react';
import {
  Box,
  Typography,
  TextField,
  Grid,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Alert
} from '@mui/material';
import {
  Help as HelpIcon,
  ContentCopy as CopyIcon
} from '@mui/icons-material';

const PercentageCalculator = () => {
  const [values, setValues] = useState({
    retailPrice: '',
    amountPaid: '',
    commissionRate: ''
  });

  const [activeField, setActiveField] = useState('retailPrice');

  // Calculate amount paid when retail price and commission rate change
  useEffect(() => {
    if (values.retailPrice && values.commissionRate) {
      const retail = parseFloat(values.retailPrice);
      const commission = parseFloat(values.commissionRate);
      const commissionAmount = retail * (commission / 100);
      const amountPaid = retail - commissionAmount;
      setValues(prev => ({
        ...prev,
        amountPaid: amountPaid.toFixed(2)
      }));
    }
  }, [values.retailPrice, values.commissionRate]);

  // Calculate commission rate when retail price and amount paid change
  useEffect(() => {
    if (values.retailPrice && values.amountPaid && activeField === 'amountPaid') {
      const retail = parseFloat(values.retailPrice);
      const paid = parseFloat(values.amountPaid);
      const commissionAmount = retail - paid;
      const commissionRate = (commissionAmount / retail) * 100;
      setValues(prev => ({
        ...prev,
        commissionRate: commissionRate.toFixed(2)
      }));
    }
  }, [values.retailPrice, values.amountPaid, activeField]);

  // Calculate retail price when amount paid and commission rate change
  useEffect(() => {
    if (values.amountPaid && values.commissionRate && activeField === 'retailPrice') {
      const paid = parseFloat(values.amountPaid);
      const commission = parseFloat(values.commissionRate);
      const retailPrice = paid / (1 - commission / 100);
      setValues(prev => ({
        ...prev,
        retailPrice: retailPrice.toFixed(2)
      }));
    }
  }, [values.amountPaid, values.commissionRate, activeField]);

  const handleInputChange = (field, value) => {
    setActiveField(field);
    setValues(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const copyValue = (value) => {
    if (value) {
      navigator.clipboard.writeText(`THB ${value}`);
    }
  };

  const formatCurrency = (value) => {
    if (!value) return '';
    return `THB ${parseFloat(value).toLocaleString('en-US', {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2
    })}`;
  };

  const fields = [
    {
      key: 'retailPrice',
      label: 'Suggested retail price',
      tooltip: 'Enter the suggested retail price in THB',
      format: formatCurrency,
      suffix: 'THB'
    },
    {
      key: 'amountPaid',
      label: 'Amount you will get paid',
      tooltip: 'The amount you will receive after commission',
      format: formatCurrency,
      suffix: 'THB'
    },
    {
      key: 'commissionRate',
      label: 'Commission rate',
      tooltip: 'Enter the commission rate as a percentage',
      format: (value) => value ? `${value}%` : '',
      suffix: '%'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Commission Calculator
      </Typography>
      
      <Grid container spacing={3}>
        {fields.map((field) => (
          <Grid item xs={12} md={4} key={field.key}>
            <Card 
              sx={{ 
                height: '100%',
                transition: 'all 0.3s ease',
                '&:hover': {
                  transform: 'translateY(-2px)',
                  boxShadow: 3
                }
              }}
            >
              <CardContent>
                <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
                  <Typography variant="h6" sx={{ flex: 1 }}>
                    {field.label}
                  </Typography>
                  <Tooltip title={field.tooltip}>
                    <IconButton size="small">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                </Box>
                
                <TextField
                  label={field.label}
                  type="number"
                  value={values[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                  InputProps={{
                    startAdornment: field.key !== 'commissionRate' ? (
                      <Typography variant="body2" sx={{ mr: 1, color: 'text.secondary' }}>
                        THB
                      </Typography>
                    ) : null,
                    endAdornment: field.key === 'commissionRate' ? (
                      <Typography variant="body2" sx={{ ml: 1, color: 'text.secondary' }}>
                        %
                      </Typography>
                    ) : null
                  }}
                />
                
                {values[field.key] && (
                  <Alert 
                    severity="success" 
                    sx={{ mb: 1 }}
                    action={
                      <Tooltip title="Copy value">
                        <IconButton
                          size="small"
                          onClick={() => copyValue(values[field.key])}
                        >
                          <CopyIcon />
                        </IconButton>
                      </Tooltip>
                    }
                  >
                    <Typography variant="body2">
                      {field.format(values[field.key])}
                    </Typography>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
      
      <Box sx={{ mt: 4, p: 2, bgcolor: 'background.paper', borderRadius: 1 }}>
        <Typography variant="h6" gutterBottom>
          How it works
        </Typography>
        <Typography variant="body2" color="text.secondary">
          • Enter any two values to calculate the third
          • Commission rate is automatically calculated as a percentage
          • All amounts are displayed in Thai Baht (THB)
          • Click the copy icon to copy values to clipboard
        </Typography>
      </Box>
    </Box>
  );
};

export default PercentageCalculator; 