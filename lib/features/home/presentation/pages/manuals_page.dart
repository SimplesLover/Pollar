import 'package:flutter/material.dart';
import 'package:pollar_app/core/theme/app_colors.dart';
import 'package:pollar_app/core/widgets/manual_list_tile.dart';
import 'package:pollar_app/core/widgets/pollar_app_bar.dart';
import 'package:pollar_app/features/home/data/repositories/data_repository.dart';
import 'package:pollar_app/features/home/presentation/pages/pdf_viewer_page.dart';

class ManualsPage extends StatelessWidget {
  final String modelId;
  final String modelName;

  const ManualsPage({
    super.key,
    required this.modelId,
    required this.modelName,
  });

  @override
  Widget build(BuildContext context) {
    final manuals = DataRepository.getManualsByModel(modelId);

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
              'Manuais - $modelName',
              style: const TextStyle(
                fontSize: 22,
                fontWeight: FontWeight.bold,
                color: AppColors.textPrimary,
              ),
            ),
            const SizedBox(height: 20),
            Expanded(
              child: manuals.isEmpty
                  ? const Center(
                      child: Column(
                        mainAxisAlignment: MainAxisAlignment.center,
                        children: [
                          Icon(
                            Icons.menu_book_outlined,
                            size: 64,
                            color: AppColors.border,
                          ),
                          SizedBox(height: 16),
                          Text(
                            'Nenhum manual encontrado',
                            style: TextStyle(
                              fontSize: 16,
                              color: AppColors.textSecondary,
                            ),
                          ),
                        ],
                      ),
                    )
                  : ListView.builder(
                      itemCount: manuals.length,
                      itemBuilder: (context, index) {
                        final manual = manuals[index];
                        return ManualListTile(
                          title: manual.title,
                          subtitle: manual.subtitle,
                          onTap: () {
                            Navigator.push(
                              context,
                              MaterialPageRoute(
                                builder: (context) => PdfViewerPage(
                                  pdfPath: manual.pdfPath,
                                  title: manual.title,
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
