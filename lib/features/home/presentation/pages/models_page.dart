import 'package:flutter/material.dart';
import 'package:pollar_app/core/theme/app_colors.dart';
import 'package:pollar_app/core/widgets/model_card.dart';
import 'package:pollar_app/core/widgets/pollar_app_bar.dart';
import 'package:pollar_app/features/home/data/repositories/data_repository.dart';
import 'package:pollar_app/features/home/presentation/pages/manuals_page.dart';

class ModelsPage extends StatelessWidget {
  final String brandId;
  final String brandName;

  const ModelsPage({
    super.key,
    required this.brandId,
    required this.brandName,
  });

  @override
  Widget build(BuildContext context) {
    final models = DataRepository.getModelsByBrand(brandId);

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
            Text(
              'Modelos - $brandName',
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: models.isEmpty
                  ? const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.inventory_2_outlined,
                            size: 64,
                            color: AppColors.border,
                          ),
                          SizedBox(height: 16),
                          Text(
                            'Nenhum modelo encontrado',
                            style: TextStyle(
                              fontSize: 16,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    )
                  : GridView.builder(
                      gridDelegate:
                          const SliverGridDelegateWithFixedCrossAxisCount(
                        crossAxisCount: 2,
                        crossAxisSpacing: 14,
                        mainAxisSpacing: 14,
                        childAspectRatio: 0.85,
                      ),
                      itemCount: models.length,
                      itemBuilder: (context, index) {
                        final model = models[index];
                        return ModelCard(
                          name: model.name,
                          imagePath: model.imagePath,
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => ManualsPage(
                                  modelId: model.id,
                                  modelName: model.name,
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
