import 'package:get/get.dart';

import '../controllers/activity_details_controller.dart';

class ActivityDetailsBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<ActivityDetailsController>(
      () => ActivityDetailsController(),
    );
  }
}
