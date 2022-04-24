import 'package:get/get.dart';

import 'package:mobile_new/app/modules/activities/bindings/activities_binding.dart';
import 'package:mobile_new/app/modules/activities/views/activities_view.dart';
import 'package:mobile_new/app/modules/activity_details/bindings/activity_details_binding.dart';
import 'package:mobile_new/app/modules/activity_details/views/activity_details_view.dart';
import 'package:mobile_new/app/modules/auth/bindings/auth_binding.dart';
import 'package:mobile_new/app/modules/auth/views/auth_view.dart';
import 'package:mobile_new/app/modules/home/bindings/home_binding.dart';
import 'package:mobile_new/app/modules/home/views/home_view.dart';
import 'package:mobile_new/app/modules/item/bindings/item_binding.dart';
import 'package:mobile_new/app/modules/item/views/item_view.dart';
import 'package:mobile_new/app/modules/node/bindings/node_binding.dart';
import 'package:mobile_new/app/modules/node/views/node_view.dart';
import 'package:mobile_new/app/modules/node_add/bindings/node_add_binding.dart';
import 'package:mobile_new/app/modules/node_add/views/node_add_view.dart';
import 'package:mobile_new/app/modules/node_users_add/bindings/node_users_add_binding.dart';
import 'package:mobile_new/app/modules/node_users_add/views/node_users_add_view.dart';
import 'package:mobile_new/app/modules/pack/bindings/pack_binding.dart';
import 'package:mobile_new/app/modules/pack/views/pack_view.dart';
import 'package:mobile_new/app/modules/searchbar/bindings/searchbar_binding.dart';
import 'package:mobile_new/app/modules/searchbar/views/searchbar_view.dart';

part 'app_routes.dart';

class AppPages {
  AppPages._();

  static const INITIAL = Routes.AUTH;

  static final routes = [
    GetPage(
      name: _Paths.HOME,
      page: () => HomeView(),
      binding: HomeBinding(),
    ),
    GetPage(
      name: _Paths.AUTH,
      page: () => AuthView(),
      binding: AuthBinding(),
    ),
    GetPage(
      name: _Paths.NODE,
      page: () => NodeView(),
      binding: NodeBinding(),
    ),
    GetPage(
      name: _Paths.ITEM,
      page: () => ItemView(),
      binding: ItemBinding(),
    ),
    GetPage(
      name: _Paths.ACTIVITIES,
      page: () => ActivitiesView(),
      binding: ActivitiesBinding(),
    ),
    GetPage(
      name: _Paths.NODE_ADD,
      page: () => NodeAddView(),
      binding: NodeAddBinding(),
    ),
    GetPage(
      name: _Paths.SEARCH_BAR,
      page: () => SearchBarView(),
      binding: SearchBarBinding(),
    ),
    GetPage(
      name: _Paths.NODE_USERS_ADD,
      page: () => NodeUsersAddView(),
      binding: NodeUsersAddBinding(),
    ),
    GetPage(
      name: _Paths.PACK,
      page: () => PackView(),
      binding: PackBinding(),
    ),
    GetPage(
      name: _Paths.ACTIVITY_DETAILS,
      page: () => ActivityDetailsView(),
      binding: ActivityDetailsBinding(),
    ),
    GetPage(
      name: _Paths.ITEM,
      page: () => ItemView(),
      binding: ItemBinding(),
    ),
  ];
}
