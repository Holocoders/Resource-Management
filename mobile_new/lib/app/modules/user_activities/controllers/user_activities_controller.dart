import 'package:get/get.dart';
import 'package:mobile_new/app/modules/user_activities/providers/user_activities_provider.dart';

class UserActivitiesController extends GetxController with StateMixin {
  final _userActivitiesProvider = Get.put(UserActivitiesProvider());
  var activities;
  var activityTypeFilters = [].obs;
  var itemStateFilters = [].obs;

  @override
  void onInit() async {
    change({}, status: RxStatus.loading());
    try {
      activities = await _userActivitiesProvider.getActivities();
      change(activities, status: RxStatus.success());
    } catch (e) {
      change({}, status: RxStatus.error());
    }
  }

  get getActivityTypeFilters => activityTypeFilters;
  get getItemStateFilters => itemStateFilters;


  filterActivities() {
    var filteredActivities = activities;
    if (activityTypeFilters.isNotEmpty) {
      filteredActivities = activities
          .where((activity) => activityTypeFilters.contains(activity['activityType']))
          .toList();
    }
    if (itemStateFilters.isNotEmpty) {
      filteredActivities = activities
          .where((activity) => itemStateFilters.contains(activity['itemState']))
          .toList();
    }
    change(filteredActivities, status: RxStatus.success());
  }

  addFilterForActivity(String filter) {
    activityTypeFilters.add(filter);
    filterActivities();
  }

  removeFilterForActivity(String filter) {
    activityTypeFilters.remove(filter);
    filterActivities();
  }

  addFilterForItemState(String filter) {
    itemStateFilters.add(filter);
    filterActivities();
  }

  removeFilterForItemState(String filter) {
    itemStateFilters.remove(filter);
    filterActivities();
  }

  clearFilters() {
    activityTypeFilters.clear();
    itemStateFilters.clear();
    change(activities, status: RxStatus.success());
  }

}
