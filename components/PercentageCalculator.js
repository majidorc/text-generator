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
  ContentCopy as CopyIcon
} from '@mui/icons-material';

const PercentageCalculator = () => {
  const [values, setValues] = useState({
    retailPrice: '',
    amountPaid: '',
    commissionRate: ''
  });

  const [lastChanged, setLastChanged] = useState('');

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
    setLastChanged(field);
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
      key: 'commissionRate',
      label: 'Commission rate',
      tooltip: 'Enter the commission rate as a percentage',
      format: (value) => value ? `${value}%` : '',
      suffix: '%'
    },
    {
      key: 'amountPaid',
      label: 'Amount you will get paid',
      tooltip: 'The amount you will receive after commission',
      format: formatCurrency,
      suffix: 'THB'
    },
    {
      key: 'retailPrice',
      label: 'Suggested retail price',
      tooltip: 'Calculated retail price (read-only)',
      format: formatCurrency,
      suffix: 'THB'
    }
  ];

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h4" gutterBottom sx={{ mb: 3, textAlign: 'center' }}>
        Commission Calculator
      </Typography>
      
      <Card sx={{ maxWidth: 600, mx: 'auto' }}>
        <CardContent>
          <Grid container spacing={3}>
            {fields.map((field) => (
              <Grid item xs={12} key={field.key}>
                <Typography variant="h6" sx={{ mb: 1 }}>
                  {field.label}
                </Typography>
                
                <TextField
                  label={field.label}
                  type="number"
                  value={values[field.key]}
                  onChange={(e) => handleInputChange(field.key, e.target.value)}
                  fullWidth
                  size="small"
                  sx={{ mb: 2 }}
                  disabled={field.key === 'retailPrice'}
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
                
                {values[field.key] && field.key === 'retailPrice' && (
                  <Alert 
                    severity="success" 
                    sx={{ mb: 1 }}
                    action={
                      <Tooltip title="Copy retail price">
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
              </Grid>
            ))}
          </Grid>
        </CardContent>
      </Card>
    </Box>
  );
};

export default PercentageCalculator; 