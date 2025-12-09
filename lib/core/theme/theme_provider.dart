import 'package:flutter/material.dart';
import 'package:pollar_app/core/theme/app_theme.dart';

class ThemeProvider extends ChangeNotifier {
  ThemeData _currentTheme = AppTheme.lightTheme;

  ThemeData get currentTheme => _currentTheme;

  void setDark(bool isDark) {
    _currentTheme = isDark ? AppTheme.darkTheme : AppTheme.lightTheme;
    notifyListeners();
  }

  void toggle() {
    final isCurrentlyDark = _currentTheme.brightness == Brightness.dark;
    setDark(!isCurrentlyDark);
  }
}

