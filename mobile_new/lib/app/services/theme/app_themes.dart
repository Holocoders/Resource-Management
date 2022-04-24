import 'package:flex_color_scheme/flex_color_scheme.dart';
import 'package:flutter/material.dart';

class AppThemes {
  static ThemeData lightThemeData = FlexThemeData.light(
    colors: const FlexSchemeColor(
      primary: Color(0xff0b800d),
      primaryContainer: Color(0xff9bbc9c),
      secondary: Color(0xff588559),
      secondaryContainer: Color(0xffaebdaf),
      tertiary: Color(0xff2c7e2e),
      tertiaryContainer: Color(0xffb8e6b9),
      appBarColor: Color(0xffb8e6b9),
      error: Color(0xffb00020),
    ),
    surfaceMode: FlexSurfaceMode.highScaffoldLowSurface,
    blendLevel: 4,
    appBarOpacity: 0.90,
    appBarElevation: 10.0,
    subThemesData: const FlexSubThemesData(
      blendOnLevel: 10,
      blendOnColors: false,
      defaultRadius: 15.0,
      elevatedButtonSchemeColor: SchemeColor.primaryContainer,
      inputDecoratorIsFilled: false,
      inputDecoratorRadius: 15.0,
      inputDecoratorUnfocusedBorderIsColored: false,
      bottomNavigationBarOpacity: 0.90,
      bottomNavigationBarElevation: 5.0,
    ),
    useMaterial3ErrorColors: true,
    visualDensity: FlexColorScheme.comfortablePlatformDensity,
    useMaterial3: true,
  );
  static ThemeData darkThemeData = FlexThemeData.dark(
    colors: const FlexSchemeColor(
      primary: Color(0xff629f80),
      primaryContainer: Color(0xff273f33),
      secondary: Color(0xff81b39a),
      secondaryContainer: Color(0xff4d6b5c),
      tertiary: Color(0xff88c5a6),
      tertiaryContainer: Color(0xff356c50),
      appBarColor: Color(0xff356c50),
      error: Color(0xffcf6679),
    ),
    surfaceMode: FlexSurfaceMode.highScaffoldLowSurface,
    blendLevel: 15,
    appBarStyle: FlexAppBarStyle.background,
    appBarOpacity: 0.90,
    subThemesData: const FlexSubThemesData(
      blendOnLevel: 30,
      defaultRadius: 15.0,
      elevatedButtonSchemeColor: SchemeColor.primaryContainer,
      inputDecoratorIsFilled: false,
      inputDecoratorRadius: 15.0,
      inputDecoratorUnfocusedBorderIsColored: false,
      bottomNavigationBarOpacity: 0.90,
      bottomNavigationBarElevation: 5.0,
    ),
    useMaterial3ErrorColors: true,
    visualDensity: FlexColorScheme.comfortablePlatformDensity,
    useMaterial3: true,
  );
}
