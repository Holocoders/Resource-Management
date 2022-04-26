import 'package:flutter/material.dart';
import 'package:get/get.dart';

class CustomSnackbars {
  static SnackbarController error(message) => Get.snackbar(
        'Error',
        message,
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Get.theme.errorColor,
        margin: const EdgeInsets.all(10),
        icon: const Icon(Icons.error),
        isDismissible: true,
        mainButton: TextButton(
          onPressed: () => Get.back(),
          child: const Icon(Icons.close),
          style: TextButton.styleFrom(
            splashFactory: NoSplash.splashFactory,
          ),
        ),
      );

  static SnackbarController success(message) => Get.snackbar(
        'Success',
        message,
        snackPosition: SnackPosition.BOTTOM,
        backgroundColor: Get.theme.primaryColor,
        margin: const EdgeInsets.all(10),
        icon: const Icon(Icons.error),
        isDismissible: true,
        mainButton: TextButton(
          onPressed: () => Get.back(),
          child: const Icon(Icons.close, color: Colors.black),
          style: TextButton.styleFrom(
            splashFactory: NoSplash.splashFactory,
          ),
        ),
      );
}
