import 'package:get/get.dart';

import '../controllers/admin_activities_controller.dart';

class AdminActivitiesBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<AdminActivitiesController>(
      () => AdminActivitiesController(),
    );
  }
}
