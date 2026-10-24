import { createContext, useContext, useState, useEffect, useCallback } from 'react';

const FormContext = createContext(null);

const STORAGE_KEY = 'roboelen-form';

function loadFromStorage() {
  try {
    const data = sessionStorage.getItem(STORAGE_KEY);
    return data ? JSON.parse(data) : null;
  } catch {
    return null;
  }
}

function saveToStorage(data) {
  try {
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(data));
  } catch {
    // silently fail
  }
}

export function FormProvider({ children }) {
  const stored = loadFromStorage();

  const [name, setNameState] = useState(stored?.name || '');
  const [usn, setUsnState] = useState(stored?.usn || '');
  const [branch, setBranchState] = useState(stored?.branch || '');
  const [submitted, setSubmittedState] = useState(stored?.submitted || false);

  // Wrap setters to persist to sessionStorage
  const setName = useCallback((val) => {
    setNameState(val);
  }, []);

  const setUsn = useCallback((val) => {
    setUsnState(val);
  }, []);

  const setBranch = useCallback((val) => {
    setBranchState(val);
  }, []);

  const setSubmitted = useCallback((val) => {
    setSubmittedState(val);
  }, []);

  // Persist whenever values change
  useEffect(() => {
    saveToStorage({ name, usn, branch, submitted });
  }, [name, usn, branch, submitted]);

  return (
    <FormContext.Provider
      value={{ name, setName, usn, setUsn, branch, setBranch, submitted, setSubmitted }}
    >
      {children}
    </FormContext.Provider>
  );
}

export function useForm() {
  const ctx = useContext(FormContext);
  if (!ctx) throw new Error('useForm must be used within FormProvider');
  return ctx;
}
