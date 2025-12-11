import 'package:flutter/material.dart';
import 'package:pollar_app/core/theme/app_colors.dart';

class PolarAppBar extends StatelessWidget implements PreferredSizeWidget {
  final String title;
  final bool showBackButton;
  final VoidCallback? onMenuPressed;
  final List<Widget>? actions;

  const PolarAppBar({
    super.key,
    this.title = 'Pollar',
    this.showBackButton = false,
    this.onMenuPressed,
    this.actions,
  });

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        color: AppColors.surface,
        borderRadius: const BorderRadius.only(
          bottomLeft: Radius.circular(24),
          bottomRight: Radius.circular(24),
        ),
        boxShadow: [
          BoxShadow(
            color: AppColors.primary.withValues(alpha: 0.1),
            blurRadius: 10,
            offset: const Offset(0, 4),
          ),
        ],
      ),
      child: SafeArea(
        bottom: false,
        child: Padding(
          padding: const EdgeInsets.symmetric(horizontal: 16, vertical: 12),
          child: Row(
            children: [
              _buildLeadingWidget(context),
              Expanded(
                child: _buildTitleWidget(),
              ),
              _buildTrailingWidget(),
            ],
          ),
        ),
      ),
    );
  }

  Widget _buildLeadingWidget(BuildContext context) {
    if (showBackButton) {
      return IconButton(
        onPressed: () => Navigator.of(context).pop(),
        icon: const Icon(
          Icons.arrow_back,
          color: AppColors.textPrimary,
          size: 24,
        ),
        padding: EdgeInsets.zero,
        constraints: const BoxConstraints(
          minWidth: 40,
          minHeight: 40,
        ),
        splashRadius: 20,
      );
    }
    return const SizedBox(width: 40);
  }

  Widget _buildTitleWidget() {
    return Center(
      child: Text(
        title,
        style: const TextStyle(
          fontSize: 18,
          fontWeight: FontWeight.w600,
          color: AppColors.textPrimary,
          letterSpacing: 0.5,
        ),
        maxLines: 1,
        overflow: TextOverflow.ellipsis,
      ),
    );
  }

  Widget _buildTrailingWidget() {
    if (actions != null && actions!.isNotEmpty) {
      return Row(
        mainAxisSize: MainAxisSize.min,
        children: actions!,
      );
    }
    return const SizedBox(width: 40);
  }

  @override
  Size get preferredSize => const Size.fromHeight(80);
}