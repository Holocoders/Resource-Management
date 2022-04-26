import 'dart:convert';

import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/services/theme/app_themes.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

import 'app/routes/app_pages.dart';
import 'app/services/user_service.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  Get.put(UserService(), permanent: true);
  final preferences = await StreamingSharedPreferences.instance;
  // preferences.clear();
  runApp(MyApp(
    preferences: preferences,
  ));
}

class MyApp extends StatelessWidget {
  final StreamingSharedPreferences preferences;

  const MyApp({Key? key, required this.preferences}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return PreferenceBuilder(
        preference: preferences.getString('user', defaultValue: ''),
        builder: (context, user) {
          if (user != '') {
            var userJson = json.decode(user.toString());
            Get.find<UserService>().setValues(userJson['_id'], userJson['name'],
                userJson['email'], userJson['token']);
          }

          return GetMaterialApp(
            // themeMode: ThemeMode.dark,
            theme: AppThemes.lightThemeData,
            darkTheme: AppThemes.darkThemeData,
            title: "RMS",
            initialRoute: user != '' ? Routes.NODE : Routes.AUTH,
            getPages: AppPages.routes,
          );
        });
  }
}
