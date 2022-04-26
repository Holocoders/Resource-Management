import 'package:get/get.dart';

import '../controllers/user_activities_controller.dart';

class UserActivitiesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<UserActivitiesController>(
      () => UserActivitiesController(),
    );
  }
}
