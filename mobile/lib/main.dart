import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/auth/user_service.dart';
import 'package:resource_management_system/facilities_categories/facilities.dart';
import 'package:resource_management_system/facilities_categories/permission_users_add.dart';
import 'package:resource_management_system/item/pack.dart';
import 'package:resource_management_system/theme/theme_manager.dart';
import 'package:resource_management_system/widgets/searchbar.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

import 'activities/activities.dart';
import 'activities/single_activity.dart';
import 'auth/auth.dart';
import 'facilities_categories/facility_category.dart';
import 'facilities_categories/facility_category_add.dart';
import 'item/item.dart';

void main() async {
  WidgetsFlutterBinding.ensureInitialized();
  final preferences = await StreamingSharedPreferences.instance;
  var userService = Get.put(UserService(), permanent: true);
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
          Get.find<UserService>().setValues(userJson['_id'], userJson['name'],
              userJson['email'], userJson['token']);
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
          ),
        );
        return GraphQLProvider(
          client: client,
          child: (GetMaterialApp
            theme: ThemeManager.theme.theme,
            initialRoute: user == '' ? Auth.route : Facilities.route,
            routes: {
              Auth.route: (context) => const Auth(),
              Item.route: (context) => const Item(),
              Pack.route: (context) => const Pack(),
              Facilities.route: (context) => FacilityCategory(),
              FacilityCategory.route: (context) => FacilityCategory(),
              FacilityCategoryAdd.route: (context) =>
                  const FacilityCategoryAdd(),
              PermissionUsersAdd.route: (context) => PermissionUsersAdd(),
              Activities.route: (context) => const Activities(),
              SingleActivity.route: (context) => const SingleActivity(),
              Searchbar.route: (context) => Searchbar(),
            },
          ),
        );
      },
    );
  }
}
