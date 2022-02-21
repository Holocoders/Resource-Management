import 'package:flutter/material.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class BaseAppBar extends StatelessWidget implements PreferredSizeWidget {
  final Text title;
  final AppBar appBar;
  List<Widget> widgets;
  List<String> actions = [];

  BaseAppBar(
      {Key? key, required this.title, required this.appBar, List<Widget>? widgets})
      : widgets = widgets ?? [], super(key: key);

  Future streamingSharedPrefs = StreamingSharedPreferences.instance;


  @override
  Widget build(BuildContext context) {
    return FutureBuilder(
      future: streamingSharedPrefs,
      builder: (BuildContext context,
          AsyncSnapshot<dynamic> snapshot) {
        if (snapshot.hasData) {
          StreamingSharedPreferences prefs = snapshot.data!;
          return PreferenceBuilder(
            preference: prefs.getString('user', defaultValue: ''),
            builder: (context, user) {
              if (user != '' && !actions.contains('logout')) {
                widgets.add(
                  IconButton(
                    icon: Icon(Icons.login),
                    onPressed: () {
                      prefs.clear();
                      Navigator.pushReplacementNamed(context, '/auth');
                    },
                  ),
                );
                actions.add('logout');
              }
              return AppBar(
                title: title,
                actions: widgets,
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
    // final preferences = await StreamingSharedPreferences.instance;
    // return PreferenceBuilder(
    //     preference: preference, builder: builder
    // )
    // return AppBar(
    //   title: title,
    //   actions: widgets,
    // );
  }

  @override
  Size get preferredSize => new Size.fromHeight(appBar.preferredSize.height);
}
