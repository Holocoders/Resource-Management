import 'package:flutter/material.dart';

extension StringCasingExtension on String {
  String toCapitalized() =>
      length > 0 ? '${this[0].toUpperCase()}${substring(1).toLowerCase()}' : '';

  String toTitleCase() => replaceAll(RegExp(' +'), ' ')
      .split(' ')
      .map((str) => str.toCapitalized())
      .join(' ');
}

class ActivityUtil {
  static var activities = ['RENT', 'BUY'];
}

class ItemStateUtil {
  static var itemStates = ['ORDERED', 'ISSUED', 'RETURNED', 'CANCELLED'];

  static getColors(String itemState) {
    switch (itemState) {
      case 'ORDERED':
        return orderedColor;
      case 'ISSUED':
        return issuedColor;
      case 'RETURNED':
        return returnedColor;
      case 'CANCELLED':
        return cancelledColor;
    }
  }

  static const orderedColor = Color.fromRGBO(255, 255, 224, 0.5);
  static const issuedColor = Color.fromRGBO(205, 205, 255, 0.5);
  static const cancelledColor = Color.fromRGBO(255, 204, 203, 0.5);
  static const returnedColor = Color.fromRGBO(205, 255, 219, 0.5);
}
