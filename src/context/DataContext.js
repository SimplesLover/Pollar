import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import modelsData from '../data/models';
import partsData from '../data/parts';
import categoriesData from '../data/categories';

const DataContext = createContext({
  models: [],
  parts: [],
  categories: [],
  favoritesModels: [],
  favoritesParts: [],
  addFavoriteModel: () => {},
  removeFavoriteModel: () => {},
  addFavoritePart: () => {},
  removeFavoritePart: () => {},
  showToast: () => {},
  toast: { visible: false, message: '', type: 'info' },
  searchHistory: { models: [], parts: [] },
  pushSearchHistory: () => {},
});

export function DataProvider({ children }) {
  // URLs solicitadas pelo usuário para substituir fontes de imagens
  const FRIDGE_INOX =
    'https://images.unsplash.com/photo-1571175443880-49e1d25b2bc5?auto=format&fit=crop&w=800&q=60';
  const FRIDGE_MODERN =
    'https://images.unsplash.com/photo-1584568694244-14fbdf83bd30?auto=format&fit=crop&w=800&q=60';
  const FRIDGE_COMMERCIAL =
    'https://images.unsplash.com/photo-1622696399293-211310a6daa1?auto=format&fit=crop&w=800&q=60';
  const COLD_ROOM =
    'https://images.unsplash.com/photo-1590736969955-71cc94901144?auto=format&fit=crop&w=800&q=60';
  const PICSUM_FRIDGE = 'https://picsum.photos/seed/fridge1/400/300';
  // Rotas solicitadas para imagens de peças
  const UNSPLASH_ELETRICAS = 'https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=300';
  const UNSPLASH_COMPONENTES = 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?w=300';
  const UNSPLASH_FERRAMENTAS = 'https://images.unsplash.com/photo-1581092162384-8987c1d64718?w=300';

  const normalizeModels = (list) =>
    list.map((m) => ({
      ...m,
      images:
        m.type === 'camara'
          ? [COLD_ROOM, FRIDGE_COMMERCIAL]
          : [FRIDGE_INOX, FRIDGE_MODERN],
    }));

  const normalizeParts = (list) =>
    list.map((p) => ({
      ...p,
      image:
        // Peças elétricas
        ['termostato', 'sensor', 'controlador', 'motor', 'ventilador', 'resistencia'].includes(p.category)
          ? UNSPLASH_ELETRICAS
          // Componentes maiores
          : ['compressor', 'evaporador', 'gas'].includes(p.category)
          ? UNSPLASH_COMPONENTES
          // Ferramentas / outros
          : UNSPLASH_FERRAMENTAS,
    }));

  const [models, setModels] = useState(() => normalizeModels(modelsData));
  const [parts, setParts] = useState(() => normalizeParts(partsData));
  const [categories] = useState(categoriesData);
  const [favoritesModels, setFavoritesModels] = useState([]);
  const [favoritesParts, setFavoritesParts] = useState([]);
  const [toast, setToast] = useState({ visible: false, message: '', type: 'info' });
  const [searchHistory, setSearchHistory] = useState({ models: [], parts: [] });
  const toastTimer = useRef(null);

  useEffect(() => {
    (async () => {
      try {
        const [fm, fp, hm, hp] = await Promise.all([
          AsyncStorage.getItem('favorites_models'),
          AsyncStorage.getItem('favorites_parts'),
          AsyncStorage.getItem('history_models'),
          AsyncStorage.getItem('history_parts'),
        ]);
        if (fm) setFavoritesModels(JSON.parse(fm));
        if (fp) setFavoritesParts(JSON.parse(fp));
        setSearchHistory({
          models: hm ? JSON.parse(hm) : [],
          parts: hp ? JSON.parse(hp) : [],
        });
      } catch {}
    })();
  }, []);

  useEffect(() => {
    if (favoritesModels && Array.isArray(favoritesModels)) {
      AsyncStorage.setItem('favorites_models', JSON.stringify(favoritesModels)).catch(() => {});
    }
  }, [favoritesModels]);
  useEffect(() => {
    if (favoritesParts && Array.isArray(favoritesParts)) {
      AsyncStorage.setItem('favorites_parts', JSON.stringify(favoritesParts)).catch(() => {});
    }
  }, [favoritesParts]);

  const addFavoriteModel = (code) => {
    setFavoritesModels((prev) => (prev.includes(code) ? prev : [...prev, code]));
    showToast('Modelo favoritado', 'success');
  };
  const removeFavoriteModel = (code) => {
    setFavoritesModels((prev) => prev.filter((c) => c !== code));
    showToast('Modelo removido dos favoritos', 'info');
  };
  const addFavoritePart = (code) => {
    setFavoritesParts((prev) => (prev.includes(code) ? prev : [...prev, code]));
    showToast('Peça favoritada', 'success');
  };
  const removeFavoritePart = (code) => {
    setFavoritesParts((prev) => prev.filter((c) => c !== code));
    showToast('Peça removida dos favoritos', 'info');
  };

  const showToast = (message, type = 'info') => {
    if (toastTimer.current) clearTimeout(toastTimer.current);
    setToast({ visible: true, message, type });
    toastTimer.current = setTimeout(() => setToast({ visible: false, message: '', type: 'info' }), 2000);
  };

  const pushSearchHistory = (area, query) => {
    setSearchHistory((prev) => {
      const next = { ...prev };
      const list = next[area] || [];
      const updated = [query, ...list.filter((q) => q !== query)].slice(0, 10);
      next[area] = updated;
      const storageKey = area === 'models' ? 'history_models' : 'history_parts';
      if (storageKey && updated && Array.isArray(updated)) {
        AsyncStorage.setItem(storageKey, JSON.stringify(updated)).catch(() => {});
      }
      return next;
    });
  };

  const value = useMemo(
    () => ({
      models,
      parts,
      categories,
      favoritesModels,
      favoritesParts,
      addFavoriteModel,
      removeFavoriteModel,
      addFavoritePart,
      removeFavoritePart,
      toast,
      showToast,
      searchHistory,
      pushSearchHistory,
    }),
    [models, parts, categories, favoritesModels, favoritesParts, toast, searchHistory]
  );

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
}

export function useData() {
  return useContext(DataContext);
}