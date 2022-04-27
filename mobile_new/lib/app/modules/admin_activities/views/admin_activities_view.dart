import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/activity_details/views/activity_details_view.dart';

import 'package:mobile_new/app/routes/app_pages.dart';
import 'package:mobile_new/app/services/activity_utils.dart';
import 'package:mobile_new/app/widgets/base_appbar.dart';
import 'package:mobile_new/app/widgets/base_drawer.dart';
import 'package:mobile_new/app/modules/activities/views/activities_view.dart';
import 'package:mobile_new/app/modules/admin_activities/controllers/admin_activities_controller.dart';
import 'package:reactive_forms/reactive_forms.dart';

import '../../activity_details/bindings/activity_details_binding.dart';

class AdminActivitiesView extends GetView<AdminActivitiesController> {

  final AdminActivitiesController _controller =
  Get.put(AdminActivitiesController());

  AdminActivitiesView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return controller.obx(
          (activities) {
        return Scaffold(
          drawer: BaseDrawer(),
          appBar: BaseAppBar(
            title: const Text('All activities'),
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
                            return Wrap(
                              alignment: WrapAlignment.center,
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
                                ListTile(
                                  title: const Text('Search by user'),
                                  subtitle: SingleChildScrollView(
                                    padding: EdgeInsets.only(
                                      top: 20,
                                      left: 20,
                                      right: 20,
                                      bottom: MediaQuery.of(context).viewInsets.bottom,
                                    ),
                                    child: TextField(
                                      decoration: InputDecoration(
                                        hintText: 'Search by user',
                                        suffixIcon: IconButton(
                                          icon: const Icon(Icons.check),
                                          onPressed: () {
                                            setState(() {
                                              _controller.filterByUserQuery();
                                            });
                                          },
                                        ),
                                      ),
                                      controller: _controller.userSearchController,
                                    ),
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
                        backgroundColor: Get.theme.cardColor,
                      );
                    },
                    style: TextButton.styleFrom(
                      splashFactory: NoSplash.splashFactory,
                    ),
                    child: RichText(
                      text: TextSpan(
                        children: [
                          TextSpan(
                            text: "Filters ",
                            style: TextStyle(
                              color: Get.theme.primaryColor
                            ),
                          ),
                          const WidgetSpan(
                            child: Icon(
                              Icons.keyboard_arrow_down,
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
                isAdminView: true,
                onActivityClicked: (activity, isAdminView) {
                  Get.to(
                      () => ActivityDetailsView(),
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
