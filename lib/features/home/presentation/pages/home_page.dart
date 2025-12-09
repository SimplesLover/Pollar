import 'package:flutter/material.dart';
import 'package:pollar_app/core/theme/app_colors.dart';
import 'package:pollar_app/core/widgets/category_card.dart';
import 'package:pollar_app/core/widgets/pollar_app_bar.dart';
import 'package:pollar_app/features/home/data/repositories/data_repository.dart';
import 'package:pollar_app/features/home/presentation/pages/brands_page.dart';

class HomePage extends StatelessWidget {
  const HomePage({super.key});

  @override
  Widget build(BuildContext context) {
    final categories = DataRepository.getCategories();

    return Scaffold(
      backgroundColor: AppColors.background,
      appBar: const PolarAppBar(),
      body: Padding(
        padding: const EdgeInsets.all(20),
        child: Column(
          crossAxisAlignment: CrossAxisAlignment.start,
          children: [
            const SizedBox(height: 8),
            const Text(
              'Categorias',
              style: TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: ListView.separated(
                itemCount: categories.length,
                separatorBuilder: (context, index) => const SizedBox(height: 14),
                itemBuilder: (context, index) {
                  final category = categories[index];
                  return CategoryCard(
                    title: category.name,
                    icon: category.icon,
                    onTap: () {
                      Navigator.push(
                        context,
                        MaterialPageRoute(
                          builder: (context) => const BrandsPage(),
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
