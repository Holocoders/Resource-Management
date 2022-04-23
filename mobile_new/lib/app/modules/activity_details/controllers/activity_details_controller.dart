import 'package:get/get.dart';

class ActivityDetailsController extends GetxController with StateMixin {

  Map<String, dynamic> activity = {};

  @override
  void onInit() {
    activity = Get.arguments as Map<String, dynamic>;
    change(activity, status: RxStatus.success());
  }

  void updateActivity(itemState) {
    activity['itemState'] = itemState;
    change(activity, status: RxStatus.success());
  }
}
