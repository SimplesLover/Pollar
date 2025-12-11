import 'package:flutter/material.dart';

class AppColors {
  AppColors._();

  static const Color primaryDark = Color(0xFF4E80C9);
  static const Color primary = Color(0xFF6AA0DF);
  static const Color primaryLight = Color(0xFF92B9EE);
  static const Color secondary = Color(0xFFCBE2FF);
  static const Color tertiary = Color(0xFFE6F0FF);
  static const Color background = Color(0xFFF2F7FF);
  static const Color card = Color(0xFFE6F0FF);
  static const Color textPrimary = Color(0xFF1F2937);
  static const Color textSecondary = Color(0xFF475569);
  static const Color border = Color(0xFFC5D8F6);
  static const Color highlight = Color(0xFF84B6F4);
  static const Color surface = Colors.white;

  static const Color darkBackground = Color(0xFF0B1220);
  static const Color darkBackgroundSecondary = Color(0xFF0F172A);
  static const Color darkCard = Color(0xFF0F172A);
  static const Color darkPrimary = Color(0xFF6AA0DF);
  static const Color darkHighlight = Color(0xFF92B9EE);
  static const Color darkText = Color(0xFFE5EAF5);
  static const Color darkTextSecondary = Color(0xFF9FB3D0);
  static const Color darkBorder = Color(0xFF1E2A44);

  static const Color success = Color(0xFF22C55E);
  static const Color error = Color(0xFFE53935);
  static const Color warning = Color(0xFFF59E0B);
  static const Color info = Color(0xFF3B82F6);

  static Color getShade(Color color, double amount) {
    assert(amount >= 0 && amount <= 1);

    final hsl = HSLColor.fromColor(color);
    final hslDark = hsl.withLightness((hsl.lightness - amount).clamp(0.0, 1.0));

    return hslDark.toColor();
  }

  static Color getTint(Color color, double amount) {
    assert(amount >= 0 && amount <= 1);

    final hsl = HSLColor.fromColor(color);
    final hslLight =
        hsl.withLightness((hsl.lightness + amount).clamp(0.0, 1.0));

    return hslLight.toColor();
  }
}