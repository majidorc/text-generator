import { createContext, useContext, useState, useEffect } from 'react';
import { addDays } from 'date-fns';
import { zonedTimeToUtc } from 'date-fns-tz';

const DateContext = createContext();

export function DateProvider({ children }) {
  // Initialize with null to avoid hydration mismatch
  const [selectedDate, setSelectedDate] = useState(null);

  // Set the initial date on the client side only
  useEffect(() => {
    const tomorrow = addDays(new Date(), 1);
    setSelectedDate(tomorrow);
  }, []);

  return (
    <DateContext.Provider value={{ selectedDate, setSelectedDate }}>
      {children}
    </DateContext.Provider>
  );
}

export function useDate() {
  const context = useContext(DateContext);
  if (!context) {
    throw new Error('useDate must be used within a DateProvider');
  }
  return context;
} 