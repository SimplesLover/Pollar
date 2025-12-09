import 'package:flutter/material.dart';
import 'package:pollar_app/features/home/domain/models/brand_model.dart';
import 'package:pollar_app/features/home/domain/models/category_model.dart';
import 'package:pollar_app/features/home/domain/models/manual_model.dart';
import 'package:pollar_app/features/home/domain/models/refrigerator_model.dart';

class DataRepository {
  static List<CategoryModel> getCategories() {
    return const [
      CategoryModel(
        id: 'refrigeradores',
        name: 'Refrigeradores',
        icon: Icons.kitchen,
      ),
      // Adicione mais categorias aqui no futuro
    ];
  }

  static List<BrandModel> getBrands() {
    return const [
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
  }

  static List<RefrigeratorModel> getModelsByBrand(String brandId) {
    final allModels = <RefrigeratorModel>[
      // Consul
      const RefrigeratorModel(
        id: 'crm40m',
        name: 'CRM40M',
        brandId: 'consul',
        imagePath: 'lib/assets/images/models/CRM40M.png',
      ),
      // Electrolux
      const RefrigeratorModel(
        id: 'dfn39',
        name: 'DFN39',
        brandId: 'electrolux',
        imagePath: 'lib/assets/images/models/DFN39.png',
      ),
      // Brastemp
      const RefrigeratorModel(
        id: 'tf55',
        name: 'TF55',
        brandId: 'electrolux',
        imagePath: 'lib/assets/images/models/TF55.png',
      ),
      const RefrigeratorModel(
        id: 'bre57',
        name: 'BRE57',
        brandId: 'brastemp',
        imagePath: 'lib/assets/images/models/BRE57.png',
      ),
    ];

    return allModels.where((model) => model.brandId == brandId).toList();
  }

  static List<ManualModel> getManualsByModel(String modelId) {
    final allManuals = <ManualModel>[
      const ManualModel(
        id: 'crm40m_manual',
        title: 'CRM40M',
        subtitle: 'Manual de Instruções',
        modelId: 'crm40m',
        pdfPath: 'lib/assets/pdfs/CRM40M, CRM44M.pdf',
      ),
      const ManualModel(
        id: 'dfn39_manual',
        title: 'DFN39',
        subtitle: 'Manual de Instruções',
        modelId: 'dfn39',
        pdfPath: 'lib/assets/pdfs/DFN39, DFX39, TF39, TF39S.pdf',
      ),
      const ManualModel(
        id: 'tf55_manual',
        title: 'TF55',
        subtitle: 'Manual de Instruções',
        modelId: 'tf55',
        pdfPath: 'lib/assets/pdfs/TF55, TF55S, TF56, TF56S.pdf',
      ),
      const ManualModel(
        id: 'bre57_manual',
        title: 'BRE57',
        subtitle: 'Manual de Instruções',
        modelId: 'bre57',
        pdfPath: 'lib/assets/pdfs/BRE57, BRE58, BRE59.pdf',
      ),
    ];

    return allManuals.where((manual) => manual.modelId == modelId).toList();
  }
}
