import 'package:get/get.dart';

class ActivityDetailsController extends GetxController with StateMixin {

  Map<String, dynamic> activity = {};
  bool isAdminView = false;

  @override
  void onInit() {
    var args = Get.arguments as Map<String, dynamic>;
    activity = args['activity'];
    isAdminView = args['isAdminView'];
    change({'activity': activity, 'isAdminView': isAdminView}, status: RxStatus.success());
  }

  void updateActivity(itemState) {
    activity['itemState'] = itemState;
    change({'activity': activity, 'isAdminView': isAdminView}, status: RxStatus.success());
  }
}
