import 'package:get/get.dart';

import '../controllers/activity_details_controller.dart';

class ActivityDetailsBinding extends Bindings {

  final tag;

  ActivityDetailsBinding({ this.tag });

  @override
  void dependencies() {
    Get.lazyPut<ActivityDetailsController>(
      () => ActivityDetailsController(),
      tag: tag
    );
  }
}
