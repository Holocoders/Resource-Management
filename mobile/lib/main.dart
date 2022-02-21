import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/auth/auth_home.dart';
import 'package:resource_management_system/widgets/facilities.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final preferences = await StreamingSharedPreferences.instance;
  runApp(MyApp(preferences));
}

class MyApp extends StatelessWidget {

  final StreamingSharedPreferences preferences;

  const MyApp(this.preferences, {Key? key}) : super(key: key);


  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    HttpLink httpLink = HttpLink('http://10.0.2.2:3000/graphql');
    
    return PreferenceBuilder(
        preference: preferences.getString('user', defaultValue: ''),
        builder: (context, user) {
          Link link;
          if (user != '') {
            var userJson = json.decode(user.toString());
            AuthLink authLink = AuthLink(
              getToken: () async => 'Bearer ' + userJson['token'],
            );
            link = authLink.concat(httpLink);
          } else {
            link = httpLink;
          }

          ValueNotifier<GraphQLClient> client = ValueNotifier(
              GraphQLClient(
                link: link,
                cache: GraphQLCache(
                  store: InMemoryStore(),
                ),
              )
          );
          return GraphQLProvider(
            client: client,
            child: MaterialApp(
              theme: ThemeData(
                primarySwatch: Colors.green,
                visualDensity: VisualDensity.adaptivePlatformDensity,
                scaffoldBackgroundColor: Colors.white,
              ),
              initialRoute: user == '' ? '/auth' : '/facilities',
              routes: { // TODO : Currently using basic navigator method, will switch to named routes later.
                '/auth': (context) => AuthHome(),
                '/facilities': (context) => const Facilities(),
                // 'facility': (context) => const Item(),
                // '/item': (context) => Item(),
              },
            ),
          );

        },
    );

    // AuthLink authLink = AuthLink(
    //   getToken: () async => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJfaWQiOiI2MWZlM2U0ODgzOGZlMzE3MmMyODcyMzMiLCJpYXQiOjE2NDQ4MzI0MDIsImV4cCI6MTY0NDkxODgwMn0.CqIFMGHX20Ws6ZkwaJm_SP6FSDaBKzGNUP9FFZT2eRg',
    // );
    //
    // ValueNotifier<GraphQLClient> client = ValueNotifier(
    //     GraphQLClient(
    //       link: authLink.concat(httpLink),
    //       cache: GraphQLCache(
    //         store: InMemoryStore(),
    //       ),
    //     )
    // );
    //
    // return GraphQLProvider(
    //   client: client,
    //   child: MaterialApp(
    //     theme: ThemeData(
    //       primarySwatch: Colors.green,
    //       visualDensity: VisualDensity.adaptivePlatformDensity,
    //       scaffoldBackgroundColor: Colors.white,
    //     ),
    //     initialRoute: '/auth',
    //     routes: { // TODO : Currently using basic navigator method, will switch to named routes later.
    //       '/auth': (context) => AuthHome(),
    //       '/facilities': (context) => const Facilities(),
    //       // 'facility': (context) => const Item(),
    //       // '/item': (context) => Item(),
    //     },
    //   ),
    // );
  }
}
