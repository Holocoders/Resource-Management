import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get_navigation/src/root/get_material_app.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/facility_category.dart';
import 'package:resource_management_system/widgets/activities/activities.dart';
import 'package:resource_management_system/widgets/activities/single_activity.dart';
import 'package:resource_management_system/widgets/auth/auth.dart';
import 'package:resource_management_system/widgets/facilities.dart';
import 'package:resource_management_system/widgets/item/item.dart';
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

        ValueNotifier<GraphQLClient> client = ValueNotifier(GraphQLClient(
          link: link,
          cache: GraphQLCache(
            store: InMemoryStore(),
          ),
        ));
        return GraphQLProvider(
          client: client,
          child: GetMaterialApp(
            theme: ThemeData(
                primarySwatch: Colors.green,
                visualDensity: VisualDensity.adaptivePlatformDensity,
                scaffoldBackgroundColor: Colors.white),
            initialRoute: user == '' ? Auth.route : Facilities.route,
            routes: {
              Auth.route: (context) => const Auth(),
              Item.route: (context) => const Item(),
              Facilities.route: (context) => const Facilities(),
              FacilityCategory.route: (context) => const FacilityCategory(),
              Activities.route: (context) => const Activities(),
              SingleActivity.route: (context) => const SingleActivity(),
            },
          ),
        );
      },
    );
  }
}
