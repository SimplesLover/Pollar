import 'package:flutter/material.dart';
import 'package:pollar_app/core/theme/app_colors.dart';
import 'package:pollar_app/core/widgets/brand_card.dart';
import 'package:pollar_app/core/widgets/pollar_app_bar.dart';
import 'package:pollar_app/features/home/data/repositories/data_repository.dart';
import 'package:pollar_app/features/home/presentation/pages/models_page.dart';

class BrandsPage extends StatelessWidget {
  const BrandsPage({super.key});

  @override
  Widget build(BuildContext context) {
    final brands = DataRepository.getBrands();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: const PolarAppBar(
        showBackButton: true,
      ),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 8),
            const Text(
              'Marcas',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: GridView.builder(
                gridDelegate: const SliverGridDelegateWithFixedCrossAxisCount(
                  crossAxisCount: 2,
                  crossAxisSpacing: 14,
                  mainAxisSpacing: 14,
                  childAspectRatio: 1.4,
                ),
                itemCount: brands.length,
                itemBuilder: (context, index) {
                  final brand = brands[index];
                  return BrandCard(
                    name: brand.name,
                    imagePath: brand.imagePath,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => ModelsPage(
                            brandId: brand.id,
                            brandName: brand.name,
                          ),
                        ),
                      );
                    },
                  );
                },
              ),
            ),
          ],
        ),
      ),
    );
  }
}
