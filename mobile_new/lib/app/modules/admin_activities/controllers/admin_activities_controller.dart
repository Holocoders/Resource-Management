import 'package:flutter/cupertino.dart';
import 'package:get/get.dart';
import 'package:get/get_state_manager/src/rx_flutter/rx_notifier.dart';
import 'package:mobile_new/app/modules/admin_activities/providers/admin_activities_provider.dart';

class AdminActivitiesController extends GetxController with StateMixin {

  final _adminActivitiesProvider = Get.put(AdminActivitiesProvider());
  var activities;
  var activityTypeFilters = [].obs;
  var itemStateFilters = [].obs;
  var userSearchController = TextEditingController();

  @override
  void onInit() async {
    change({}, status: RxStatus.loading());
    try {
      activities = await _adminActivitiesProvider.getAllActivities();
      change(activities, status: RxStatus.success());
    } catch (e) {
      change({}, status: RxStatus.error());
    }
  }

  get getActivityTypeFilters => activityTypeFilters;
  get getItemStateFilters => itemStateFilters;


  filterActivities() {
    var filteredActivities = activities;
    if (userSearchController.text.isNotEmpty) {
      filteredActivities = activities
          .where((activity) {
        var filterStr = activity['user']['name'] + activity['user']['email'];
        return filterStr.toLowerCase().contains(userSearchController.text.toLowerCase()) as bool;
      }).toList();
    }
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

  filterByUserQuery() {
    filterActivities();
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
    userSearchController.clear();
    change(activities, status: RxStatus.success());
  }
}
