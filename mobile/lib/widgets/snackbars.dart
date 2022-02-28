import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:get/get_navigation/src/snackbar/snackbar.dart';

class CustomSnackbars {
  static SnackbarController error (message) => Get.snackbar(
    'Error',
    message,
    snackPosition: SnackPosition.BOTTOM,
    backgroundColor: Colors.red,
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
