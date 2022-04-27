import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/activities/views/activities_view.dart';
import 'package:mobile_new/app/modules/activity_details/bindings/activity_details_binding.dart';
import 'package:mobile_new/app/services/activity_utils.dart';
import 'package:mobile_new/app/widgets/base_appbar.dart';
import 'package:mobile_new/app/widgets/base_drawer.dart';
import 'package:mobile_new/app/modules/user_activities/controllers/user_activities_controller.dart';

import '../../activity_details/views/activity_details_view.dart';

class UserActivitiesView extends GetView<UserActivitiesController> {
  UserActivitiesView({Key? key}) : super(key: key);

  final UserActivitiesController _controller =
      Get.put(UserActivitiesController());

  @override
  Widget build(BuildContext context) {
    return controller.obx(
      (activities) {
        return Scaffold(
          drawer: const BaseDrawer(),
          appBar: BaseAppBar(
            title: const Text('My activities'),
            appBar: AppBar(),
          ),
          body: Column(
            children: [
              Padding(
                padding: const EdgeInsets.all(10),
                child: Align(
                  alignment: Alignment.topRight,
                  child: TextButton(
                    onPressed: () {
                      Get.bottomSheet(
                        StatefulBuilder(
                          builder:
                              (BuildContext context, StateSetter setState) {
                            return Column(
                              children: [
                                ListTile(
                                  trailing: TextButton(
                                    onPressed: () {
                                      Get.back();
                                    },
                                    child: const Text('Close'),
                                  ),
                                ),
                                const Divider(),
                                const ListTile(
                                  title: Text('Item state'),
                                ),
                                Wrap(
                                  spacing: 10,
                                  children: List.generate(
                                    ItemStateUtil.itemStates.length,
                                    (index) => FilterChip(
                                      label: Text(
                                        ItemStateUtil.itemStates[index]
                                            .toString()
                                            .toCapitalized(),
                                      ),
                                      onSelected: (bool selected) {
                                        setState(
                                          () {
                                            if (selected) {
                                              _controller.addFilterForItemState(
                                                  ItemStateUtil
                                                      .itemStates[index]);
                                            } else {
                                              _controller
                                                  .removeFilterForItemState(
                                                      ItemStateUtil
                                                          .itemStates[index]);
                                            }
                                          },
                                        );
                                      },
                                      selected:
                                          _controller.itemStateFilters.contains(
                                        ItemStateUtil.itemStates[index],
                                      ),
                                    ),
                                  ),
                                ),
                                const Divider(height: 2),
                                const ListTile(
                                  title: Text('Activity type'),
                                ),
                                Wrap(
                                  spacing: 10,
                                  children: List.generate(
                                    ActivityUtil.activities.length,
                                    (index) => FilterChip(
                                        label: Text(ActivityUtil
                                            .activities[index]
                                            .toString()
                                            .toCapitalized()),
                                        onSelected: (bool selected) {
                                          setState(() {
                                            if (selected) {
                                              _controller.addFilterForActivity(
                                                  ActivityUtil
                                                      .activities[index]);
                                            } else {
                                              _controller
                                                  .removeFilterForActivity(
                                                      ActivityUtil
                                                          .activities[index]);
                                            }
                                          });
                                        },
                                        selected: _controller
                                            .activityTypeFilters
                                            .contains(
                                                ActivityUtil.activities[index])),
                                  ),
                                ),
                                const Divider(height: 2),
                                Align(
                                  alignment: Alignment.center,
                                  child: TextButton(
                                    child: const Text('Clear filters'),
                                    onPressed: () {
                                      setState(() {
                                        _controller.clearFilters();
                                      });
                                    },
                                  ),
                                )
                              ],
                            );
                          },
                        ),
                        shape: RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(15),
                        ),
                        isDismissible: false,
                      );
                    },
                    style: TextButton.styleFrom(
                      splashFactory: NoSplash.splashFactory,
                    ),
                    child: RichText(
                      text: const TextSpan(
                        children: [
                          TextSpan(
                            text: "Filters ",
                            style: TextStyle(
                              color: Colors.blueAccent,
                            ),
                          ),
                          WidgetSpan(
                            child: Icon(
                              Icons.keyboard_arrow_down,
                              color: Colors.blue,
                            ),
                            alignment: PlaceholderAlignment.middle,
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              ),
              ActivitiesView(
                activities: activities,
                onActivityClicked: (activity, isAdminView) {
                  Get.to(() => ActivityDetailsView(),
                      preventDuplicates: false,
                      arguments: {'activity': activity, 'isAdminView': isAdminView},
                      binding: ActivityDetailsBinding(tag: activity['_id'] + isAdminView.toString()))
                      ?.asStream().listen((_) => _controller.onInit());
                },
              ),
            ],
          ),
        );
      },
    );
  }
}
