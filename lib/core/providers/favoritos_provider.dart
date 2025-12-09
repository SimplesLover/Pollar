import 'package:flutter/foundation.dart';

class FavoritosProvider extends ChangeNotifier {
  final Set<String> _favorites = <String>{};

  List<String> get favorites => List.unmodifiable(_favorites);

  bool isFavorite(String id) => _favorites.contains(id);

  void toggleFavorite(String id) {
    if (_favorites.contains(id)) {
      _favorites.remove(id);
    } else {
      _favorites.add(id);
    }
    notifyListeners();
  }
}
