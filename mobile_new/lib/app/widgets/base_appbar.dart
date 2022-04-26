import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:mobile_new/app/routes/app_pages.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class BaseAppBar extends StatelessWidget implements PreferredSizeWidget {
  final Text title;
  final AppBar appBar;
  List<Widget> widgets;
  final PreferredSizeWidget? bottom;

  BaseAppBar({Key? key,
    required this.title,
    required this.appBar,
    this.bottom,
    List<Widget>? widgets})
      : widgets = widgets ?? [],
        super(key: key);

  Future streamingSharedPrefs = StreamingSharedPreferences.instance;

  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: streamingSharedPrefs,
      builder: (BuildContext context, AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData &&
            snapshot.connectionState == ConnectionState.done) {
          StreamingSharedPreferences prefs = snapshot.data!;
          return PreferenceBuilder(
            preference: prefs.getString('user', defaultValue: ''),
            builder: (context, user) {
              widgets.add(
                IconButton(
                  icon: const Icon(Icons.wb_sunny),
                  onPressed: () {
                    Get.changeThemeMode(Get.isDarkMode ? ThemeMode.light
                        : ThemeMode.dark);
                  },
                ),
              );
              if (user != '') {
                widgets.add(
                  IconButton(
                    icon: const Icon(Icons.logout),
                    onPressed: () {
                      prefs.clear();
                      Get.offAllNamed(Routes.AUTH);
                    },
                  ),
                );
              }
              return AppBar(
                title: title,
                actions: widgets,
                bottom: bottom,
              );
            },
          );
        }
        return AppBar(
          title: title,
          actions: widgets,
        );
      },
    );
  }

  @override
  Size get preferredSize => const Size.fromHeight(90);
}
