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

  static Color facilityColor = HexColor("FDE4A5");
  static Color categoryColor = HexColor("FDE4A5");
  static Color itemColor = HexColor("A0D2FA");
  static Color packColor = HexColor("F69EBC");
}
