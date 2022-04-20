import 'package:flutter/material.dart';

class LightTheme {
  ThemeData theme = ThemeData(
    brightness: Brightness.light,
    primarySwatch: Colors.green,
    visualDensity: VisualDensity.adaptivePlatformDensity,
    scaffoldBackgroundColor: Colors.white,
  );

  Color facilityColor = Colors.amber;
  Color categoryColor = Colors.blue;
  Color itemColor = Colors.lightBlueAccent;
  Color packColor = Colors.purpleAccent;
}
