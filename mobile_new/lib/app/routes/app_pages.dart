import 'package:get/get.dart';

import '../modules/activity_details/bindings/activity_details_binding.dart';
import '../modules/activity_details/views/activity_details_view.dart';
import '../modules/admin_activities/bindings/admin_activities_binding.dart';
import '../modules/admin_activities/views/admin_activities_view.dart';
import '../modules/auth/bindings/auth_binding.dart';
import '../modules/auth/views/auth_view.dart';
import '../modules/home/bindings/home_binding.dart';
import '../modules/home/views/home_view.dart';
import '../modules/item/bindings/item_binding.dart';
import '../modules/item/views/item_view.dart';
import '../modules/node/bindings/node_binding.dart';
import '../modules/node/views/node_view.dart';
import '../modules/node_add/bindings/node_add_binding.dart';
import '../modules/node_add/views/node_add_view.dart';
import '../modules/node_users_add/bindings/node_users_add_binding.dart';
import '../modules/node_users_add/views/node_users_add_view.dart';
import '../modules/pack/bindings/pack_binding.dart';
import '../modules/pack/views/pack_view.dart';
import '../modules/searchbar/bindings/searchbar_binding.dart';
import '../modules/searchbar/views/searchbar_view.dart';
import '../modules/user_activities/bindings/user_activities_binding.dart';
import '../modules/user_activities/views/user_activities_view.dart';

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
    GetPage(
      name: _Paths.ADMIN_ACTIVITIES,
      page: () => AdminActivitiesView(),
      binding: AdminActivitiesBinding(),
    ),
    GetPage(
      name: _Paths.USER_ACTIVITIES,
      page: () => UserActivitiesView(),
      binding: UserActivitiesBinding(),
    ),
  ];
}
