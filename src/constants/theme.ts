import { MD3LightTheme } from 'react-native-paper';
import { COLORS } from './colors';

export const theme = {
  ...MD3LightTheme,
  colors: {
    ...MD3LightTheme.colors,
    primary: COLORS.primary,
    secondary: COLORS.secondary,
    error: COLORS.error,
    background: COLORS.background,
    surface: COLORS.surface,
  },
};

export const globalStyles = {
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  card: {
    backgroundColor: COLORS.surface,
    borderRadius: 8,
    padding: 16,
    marginBottom: 12,
    elevation: 2,
  },
  button: {
    borderRadius: 8,
    paddingVertical: 8,
  },
  input: {
    borderRadius: 8,
    backgroundColor: COLORS.surface,
    borderColor: COLORS.border,
  },
  text: {
    primary: {
      fontSize: 16,
      color: COLORS.textPrimary,
    },
    secondary: {
      fontSize: 14,
      color: COLORS.textSecondary,
    },
    caption: {
      fontSize: 12,
      color: COLORS.textTertiary,
    },
  },
};
