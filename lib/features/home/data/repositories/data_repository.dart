import 'package:flutter/material.dart';
import 'package:pollar_app/features/home/domain/models/brand_model.dart';
import 'package:pollar_app/features/home/domain/models/category_model.dart';
import 'package:pollar_app/features/home/domain/models/manual_model.dart';
import 'package:pollar_app/features/home/domain/models/refrigerator_model.dart';

class DataRepository {
  DataRepository._();

  static const List<CategoryModel> _categories = [
    CategoryModel(
      id: 'refrigeradores',
      name: 'Refrigeradores',
      icon: Icons.kitchen,
    ),
  ];

  static const List<BrandModel> _brands = [
    BrandModel(
      id: 'consul',
      name: 'Consul',
      imagePath: 'lib/assets/images/brands/consul.png',
    ),
    BrandModel(
      id: 'brastemp',
      name: 'Brastemp',
      imagePath: 'lib/assets/images/brands/brastemp.png',
    ),
    BrandModel(
      id: 'electrolux',
      name: 'Electrolux',
      imagePath: 'lib/assets/images/brands/electrolux.png',
    ),
    BrandModel(
      id: 'continental',
      name: 'Continental',
      imagePath: 'lib/assets/images/brands/continental.png',
    ),
  ];

  static const List<RefrigeratorModel> _models = [
    RefrigeratorModel(
      id: 'crm40m',
      name: 'CRM40M',
      brandId: 'consul',
      imagePath: 'lib/assets/images/models/CRM40M.png',
    ),
    RefrigeratorModel(
      id: 'dfn39',
      name: 'DFN39',
      brandId: 'electrolux',
      imagePath: 'lib/assets/images/models/DFN39.png',
    ),
    RefrigeratorModel(
      id: 'tf55',
      name: 'TF55',
      brandId: 'electrolux',
      imagePath: 'lib/assets/images/models/TF55.png',
    ),
    RefrigeratorModel(
      id: 'bre57',
      name: 'BRE57',
      brandId: 'brastemp',
      imagePath: 'lib/assets/images/models/BRE57.png',
    ),
  ];

  static const List<ManualModel> _manuals = [
    ManualModel(
      id: 'crm40m_manual',
      title: 'CRM40M',
      subtitle: 'Manual de Instruções',
      modelId: 'crm40m',
      pdfPath: 'lib/assets/pdfs/CRM40M, CRM44M.pdf',
    ),
    ManualModel(
      id: 'dfn39_manual',
      title: 'DFN39',
      subtitle: 'Manual de Instruções',
      modelId: 'dfn39',
      pdfPath: 'lib/assets/pdfs/DFN39, DFX39, TF39, TF39S.pdf',
    ),
    ManualModel(
      id: 'tf55_manual',
      title: 'TF55',
      subtitle: 'Manual de Instruções',
      modelId: 'tf55',
      pdfPath: 'lib/assets/pdfs/TF55, TF55S, TF56, TF56S.pdf',
    ),
    ManualModel(
      id: 'bre57_manual',
      title: 'BRE57',
      subtitle: 'Manual de Instruções',
      modelId: 'bre57',
      pdfPath: 'lib/assets/pdfs/BRE57, BRE58, BRE59.pdf',
    ),
  ];

  static List<CategoryModel> getCategories() => List.unmodifiable(_categories);

  static List<BrandModel> getBrands() => List.unmodifiable(_brands);

  static List<RefrigeratorModel> getModelsByBrand(String brandId) {
    return _models.where((model) => model.brandId == brandId).toList();
  }

  static List<ManualModel> getManualsByModel(String modelId) {
    return _manuals.where((manual) => manual.modelId == modelId).toList();
  }

  static BrandModel? getBrandById(String brandId) {
    try {
      return _brands.firstWhere((brand) => brand.id == brandId);
    } catch (_) {
      return null;
    }
  }

  static RefrigeratorModel? getModelById(String modelId) {
    try {
      return _models.firstWhere((model) => model.id == modelId);
    } catch (_) {
      return null;
    }
  }

  static ManualModel? getManualById(String manualId) {
    try {
      return _manuals.firstWhere((manual) => manual.id == manualId);
    } catch (_) {
      return null;
    }
  }
}