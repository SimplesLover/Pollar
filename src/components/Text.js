import React from 'react';
import { Text as RNText } from 'react-native';
import { useTextSize } from '../context/TextSizeContext';

export default function Text({ style, children, ...props }) {
  const { textScale } = useTextSize();
  
  const scaledStyle = React.useMemo(() => {
    if (!style) return { fontSize: 14 * textScale };
    
    const styleArray = Array.isArray(style) ? style : [style];
    return styleArray.map(s => {
      if (s && s.fontSize) {
        return { ...s, fontSize: s.fontSize * textScale };
      }
      return s;
    });
  }, [style, textScale]);

  return (
    <RNText style={scaledStyle} {...props}>
      {children}
    </RNText>
  );
}