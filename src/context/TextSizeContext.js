import React, { createContext, useContext, useEffect, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

const TextSizeContext = createContext({
  textSize: 'normal',
  textScale: 1,
  setTextSize: () => {},
});

export function TextSizeProvider({ children }) {
  const [textSize, setTextSizeState] = useState('normal');

  useEffect(() => {
    (async () => {
      try {
        const saved = await AsyncStorage.getItem('app_text_size');
        if (saved) setTextSizeState(saved);
      } catch {}
    })();
  }, []);

  const setTextSize = async (size) => {
    setTextSizeState(size);
    try {
      await AsyncStorage.setItem('app_text_size', size);
    } catch {}
  };

  const getTextScale = () => {
    const sizes = {
      small: 0.85,
      normal: 1,
      large: 1.15,
      extra_large: 1.3,
    };
    return sizes[textSize] || 1;
  };

  return (
    <TextSizeContext.Provider value={{ textSize, textScale: getTextScale(), setTextSize }}>
      {children}
    </TextSizeContext.Provider>
  );
}

export function useTextSize() {
  return useContext(TextSizeContext);
}