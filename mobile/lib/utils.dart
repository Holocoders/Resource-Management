import 'package:flutter/material.dart';

extension StringCasingExtension on String {
  String toCapitalized() =>
      length > 0 ? '${this[0].toUpperCase()}${substring(1).toLowerCase()}' : '';
  String toTitleCase() => replaceAll(RegExp(' +'), ' ')
      .split(' ')
      .map((str) => str.toCapitalized())
      .join(' ');
}

class ItemStateColors {
  static getColors(String itemState) {
    switch (itemState) {
      case 'ORDERED':
        return ordered;
      case 'ISSUED':
        return issued;
      case 'RETURNED':
        return returned;
      case 'CANCELLED':
        return cancelled;
    }
  }

  static const ordered = Color.fromRGBO(255, 255, 224, 0.5);
  static const issued = Color.fromRGBO(205, 205, 255, 0.5);
  static const cancelled = Color.fromRGBO(255, 204, 203, 0.5);
  static const returned = Color.fromRGBO(205, 255, 219, 0.5);
}
