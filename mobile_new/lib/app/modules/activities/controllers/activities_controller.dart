import 'package:get/get.dart';

import '../providers/activities_provider.dart';

class ActivitiesController extends GetxController with StateMixin {

  final _activitiesProvider = Get.put(ActivitiesProvider());


  @override
  void onInit() async {
    change({}, status: RxStatus.loading());
    try {
      var item = await _activitiesProvider.getActivities();
      change(item, status: RxStatus.success());
    } catch (e) {
      change({}, status: RxStatus.error());
    }
  }

}
