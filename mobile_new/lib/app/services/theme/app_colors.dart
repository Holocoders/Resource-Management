import 'package:flutter/material.dart';
import 'package:get/get.dart';

class HexColor extends Color {
  static int _getColorFromHex(String hexColor) {
    hexColor = hexColor.toUpperCase().replaceAll("#", "");
    if (hexColor.length == 6) {
      hexColor = "FF" + hexColor;
    }
    return int.parse(hexColor, radix: 16);
  }

  HexColor(final String hexColor) : super(_getColorFromHex(hexColor));
}

abstract class AppColors {
  AppColors._() {
    Get.theme.obs.listen((themeData) {
      print("listening");
      print(Get.isDarkMode);
      if (Get.isDarkMode) {
        facilityColor = HexColor("cc5a2a");
      } else {
        facilityColor = HexColor("FDE4A5");
      }
    });
  }

  static Color facilityColor =
      Get.isDarkMode ? HexColor("cc5a2a") : HexColor("FDE4A5");
  static Color categoryColor = HexColor("0018a8");
  static Color itemColor = HexColor("0169be");
  static Color packColor = HexColor("ff2e63");
}
