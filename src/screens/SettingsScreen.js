import React, { useState, useEffect } from 'react';
import { View, ScrollView, TouchableOpacity, Switch, StyleSheet } from 'react-native';
import Text from '../components/Text';
import { Ionicons } from '@expo/vector-icons';
import { useTheme } from '../context/ThemeContext';
import { useData } from '../context/DataContext';
import { useTextSize } from '../context/TextSizeContext';
import colors from '../design/colors';
import spacing from '../design/spacing';
import typography from '../design/typography';
import shadows from '../design/shadows';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SETTINGS_KEYS = {
  THEME: 'app_theme_preference',
  TEXT_SIZE: 'app_text_size',
  AUTO_SAVE: 'app_auto_save',
  NOTIFICATIONS: 'app_notifications',
};

const TEXT_SIZES = [
  { label: 'Pequeno', value: 'small', scale: 0.85 },
  { label: 'Normal', value: 'normal', scale: 1 },
  { label: 'Grande', value: 'large', scale: 1.15 },
  { label: 'Extra Grande', value: 'extra_large', scale: 1.3 },
];

export default function SettingsScreen({ navigation }) {
  const { palette, isDark, setThemeMode } = useTheme();
  const { showToast } = useData();
  const { textSize, setTextSize } = useTextSize();
  
  const [settings, setSettings] = useState({
    theme: 'automatic',
    textSize: textSize,
    autoSave: true,
    notifications: true,
  });

  const [appVersion] = useState('1.0.0');
  const [lastUpdate] = useState('2025-11-12');

  useEffect(() => {
    loadSettings();
  }, []);

  useEffect(() => {
    setSettings(prev => ({ ...prev, textSize: textSize }));
  }, [textSize]);

  const loadSettings = async () => {
    try {
      const savedSettings = await AsyncStorage.multiGet([
        SETTINGS_KEYS.THEME,
        SETTINGS_KEYS.TEXT_SIZE,
        SETTINGS_KEYS.AUTO_SAVE,
        SETTINGS_KEYS.NOTIFICATIONS,
      ]);

      const loadedSettings = {};
      savedSettings.forEach(([key, value]) => {
        if (value) {
          switch (key) {
            case SETTINGS_KEYS.THEME:
              loadedSettings.theme = value;
              break;
            case SETTINGS_KEYS.TEXT_SIZE:
              loadedSettings.textSize = value;
              break;
            case SETTINGS_KEYS.AUTO_SAVE:
              loadedSettings.autoSave = value === 'true';
              break;
            case SETTINGS_KEYS.NOTIFICATIONS:
              loadedSettings.notifications = value === 'true';
              break;
          }
        }
      });

      if (Object.keys(loadedSettings).length > 0) {
        setSettings(prev => ({ ...prev, ...loadedSettings }));
      }
    } catch (error) {
      console.error('Erro ao carregar configurações:', error);
    }
  };

  const saveSetting = async (key, value) => {
    try {
      // Verifica se a chave é válida antes de salvar
      if (!key || typeof key !== 'string') {
        console.warn('Chave inválida para AsyncStorage:', key);
        return;
      }
      
      await AsyncStorage.setItem(key, String(value));
      
      if (key === SETTINGS_KEYS.THEME) {
        setThemeMode(value);
      } else if (key === SETTINGS_KEYS.TEXT_SIZE) {
        setTextSize(value);
      }
    } catch (error) {
      console.error('Erro ao salvar configuração:', error);
    }
  };

  const updateSetting = (key, value) => {
    setSettings(prev => ({ ...prev, [key]: value }));
    const settingsKey = SETTINGS_KEYS[key.toUpperCase()];
    if (settingsKey) {
      saveSetting(settingsKey, value);
    }
  };

  const getTextScale = () => {
    const size = TEXT_SIZES.find(s => s.value === textSize);
    return size ? size.scale : 1;
  };

  const Section = ({ title, children }) => (
    <View style={styles.section}>
      <Text style={[styles.sectionTitle, { color: palette.primaryDark }]}>{title}</Text>
      <View style={styles.sectionContent}>
        {children}
      </View>
    </View>
  );

  const SettingItem = ({ icon, title, subtitle, onPress, rightElement }) => (
    <TouchableOpacity style={[styles.settingItem, { backgroundColor: palette.surface }]} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons name={icon} size={20} color={palette.primary} style={styles.settingIcon} />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { color: palette.textPrimary }]}>{title}</Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: palette.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      {rightElement}
    </TouchableOpacity>
  );

  const SwitchSetting = ({ icon, title, subtitle, value, onValueChange }) => (
    <SettingItem
      icon={icon}
      title={title}
      subtitle={subtitle}
      rightElement={<Switch value={value} onValueChange={onValueChange} trackColor={{ false: '#767577', true: palette.primary }} />}
      onPress={() => onValueChange(!value)}
    />
  );

  const OptionSetting = ({ icon, title, subtitle, value, options, onSelect }) => (
    <SettingItem
      icon={icon}
      title={title}
      subtitle={subtitle || options.find(o => o.value === value)?.label}
      rightElement={<Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />}
      onPress={() => {
        // Armazena a função temporariamente antes de navegar
        global.settingsCallback = (newValue) => {
          onSelect(newValue);
          navigation.goBack();
        };
        navigation.navigate('SettingsOption', {
          title,
          options,
          selectedValue: value,
        });
      }}
    />
  );

  const ActionItem = ({ icon, title, subtitle, onPress, destructive }) => (
    <TouchableOpacity style={[styles.settingItem, { backgroundColor: palette.surface }]} onPress={onPress}>
      <View style={styles.settingLeft}>
        <Ionicons 
          name={icon} 
          size={20} 
          color={destructive ? '#ff3b30' : palette.primary} 
          style={styles.settingIcon} 
        />
        <View style={styles.settingText}>
          <Text style={[styles.settingTitle, { 
            color: destructive ? '#ff3b30' : palette.textPrimary
          }]}>
            {title}
          </Text>
          {subtitle && <Text style={[styles.settingSubtitle, { color: palette.textSecondary }]}>{subtitle}</Text>}
        </View>
      </View>
      <Ionicons name="chevron-forward" size={20} color={palette.textSecondary} />
    </TouchableOpacity>
  );

  return (
    <ScrollView style={[styles.container, { backgroundColor: palette.background }]}>
      <View style={{ paddingTop: spacing.lg }}>
        <Section title="Preferências de Exibição">
          <OptionSetting
            icon="sunny-outline"
            title="Tema"
            subtitle={settings.theme === 'automatic' ? 'Automático' : settings.theme === 'dark' ? 'Escuro' : 'Claro'}
            value={settings.theme}
            options={[
              { label: 'Automático', value: 'automatic' },
              { label: 'Claro', value: 'light' },
              { label: 'Escuro', value: 'dark' },
            ]}
            onSelect={(value) => updateSetting('theme', value)}
          />
          
          <OptionSetting
            icon="text-outline"
            title="Tamanho do Texto"
            value={textSize}
            options={TEXT_SIZES}
            onSelect={(value) => updateSetting('textSize', value)}
          />
        </Section>

        <Section title="Funcionalidades">
        <SwitchSetting
          icon="save-outline"
          title="Salvamento Automático"
          subtitle="Salve seus favoritos automaticamente"
          value={settings.autoSave}
          onValueChange={(value) => updateSetting('autoSave', value)}
        />
        
        <SwitchSetting
          icon="notifications-outline"
          title="Notificações"
          subtitle="Receba alertas de atualizações"
          value={settings.notifications}
          onValueChange={(value) => updateSetting('notifications', value)}
        />
      </Section>

      <Section title="Sobre e Ajuda">
        <SettingItem
          icon="information-circle-outline"
          title="Versão do Aplicativo"
          subtitle={`${appVersion} • Atualizado em ${lastUpdate}`}
          rightElement={null}
        />
        
        <ActionItem
          icon="document-text-outline"
          title="Documentação Técnica"
          subtitle="Acesse manuais e guias"
          onPress={() => navigation.navigate('Manuais', { screen: 'Manuals' })}
        />
        
        <ActionItem
          icon="help-circle-outline"
          title="Suporte Especializado"
          subtitle="Entre em contato com nossa equipe"
          onPress={() => {
            // Abrir email ou formulário de contato
            console.log('Abrir suporte');
          }}
        />
        
        <ActionItem
          icon="shield-checkmark-outline"
          title="Termos de Uso"
          onPress={() => {
            navigation.navigate('WebView', { 
              title: 'Termos de Uso', 
              url: 'https://example.com/terms' 
            });
          }}
        />
        
        <ActionItem
          icon="lock-closed-outline"
          title="Política de Privacidade"
          onPress={() => {
            navigation.navigate('WebView', { 
              title: 'Política de Privacidade', 
              url: 'https://example.com/privacy' 
            });
          }}
        />
      </Section>

      <Section title="Dados">
        <ActionItem
          icon="trash-outline"
          title="Limpar Cache"
          subtitle="Libere espaço no dispositivo"
          onPress={async () => {
            try {
              // Limpar dados do AsyncStorage (preservando configurações importantes)
              const keys = await AsyncStorage.getAllKeys();
              const filteredKeys = keys.filter(key => 
                !['theme_mode', 'app_theme_preference', 'app_text_size', 'app_auto_save', 'app_notifications'].includes(key)
              );
              await AsyncStorage.multiRemove(filteredKeys);
              
              showToast('Cache limpo com sucesso!', 'success');
            } catch (error) {
              console.error('Erro ao limpar cache:', error);
              showToast('Erro ao limpar cache', 'error');
            }
          }}
        />
      </Section>

      </View>

      <View style={styles.footer}>
        <Text style={[styles.footerText, { color: palette.textSecondary }]}>
          Glacio - Sistema de Consulta Técnica
        </Text>
        <Text style={[styles.footerText, { color: palette.textSecondary }]}>
          Desenvolvido para profissionais de refrigeração
        </Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: { padding: spacing.lg, paddingBottom: spacing.md },
  headerTitle: { fontWeight: typography.weight.bold, marginBottom: 4 },
  headerSubtitle: { fontWeight: typography.weight.regular },
  
  section: { marginBottom: spacing.lg },
  sectionTitle: { fontWeight: typography.weight.bold, marginLeft: spacing.md, marginBottom: spacing.sm },
  sectionContent: { paddingHorizontal: spacing.md },
  
  settingItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: spacing.md,
    borderRadius: 12,
    marginBottom: spacing.xs,
    ...shadows.low,
  },
  settingLeft: { flexDirection: 'row', alignItems: 'center', flex: 1 },
  settingIcon: { marginRight: spacing.sm },
  settingText: { flex: 1 },
  settingTitle: { fontWeight: typography.weight.semibold, marginBottom: 2 },
  settingSubtitle: { fontWeight: typography.weight.regular },
  
  footer: { 
    padding: spacing.lg, 
    alignItems: 'center', 
    borderTopWidth: StyleSheet.hairlineWidth,
    borderTopColor: '#eee',
    marginTop: spacing.md,
  },
  footerText: { textAlign: 'center', marginBottom: 2 },
});