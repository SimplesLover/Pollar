import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:provider/provider.dart';
import 'package:pollar_app/core/theme/theme_provider.dart';
import 'package:pollar_app/core/providers/favoritos_provider.dart';
import 'package:pollar_app/features/home/presentation/pages/splash_page.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();

  SystemChrome.setEnabledSystemUIMode(
    SystemUiMode.immersiveSticky,
    overlays: [SystemUiOverlay.top],
  );

  runApp(const PollarApp());
}

class PollarApp extends StatelessWidget {
  const PollarApp({super.key});

  @override
  Widget build(BuildContext context) {
    return MultiProvider(
      providers: [
        ChangeNotifierProvider<ThemeProvider>(create: (_) => ThemeProvider()),
        ChangeNotifierProvider<FavoritosProvider>(
            create: (_) => FavoritosProvider()),
      ],
      child: Consumer<ThemeProvider>(
        builder: (context, themeProvider, child) {
          return MaterialApp(
            title: 'Pollar',
            debugShowCheckedModeBanner: false,
            theme: themeProvider.currentTheme,
            home: const SplashPage(),
          );
        },
      ),
    );
  }
}
