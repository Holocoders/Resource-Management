import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:intl/intl.dart';
import 'package:mobile_new/app/modules/activity_details/controllers/activity_details_controller.dart';
import 'package:mobile_new/app/modules/activity_details/providers/activity_details_provider.dart';

import '../../../routes/app_pages.dart';
import '../../../services/activity_utils.dart';
import '../../../widgets/base_appbar.dart';
import '../../../widgets/base_drawer.dart';
import '../../../widgets/snackbars.dart';


class ActivityDetailsView extends GetView<ActivityDetailsController> {
  ActivityDetailsView({Key? key}) : super(key: key);

  final _activityDetailsProvider = Get.put(ActivityDetailsProvider());

  @override
  Widget build(BuildContext context) {
    return controller.obx(
        (activity) => Scaffold(
          drawer: BaseDrawer(),
          appBar: BaseAppBar(
            title: const Text("Activity"),
            appBar: AppBar(),
          ),
          body: SingleChildScrollView(
            child: Column(
              children: [
                Card(
                  child: Container(
                    decoration: BoxDecoration(
                        color: Get.theme.primaryColorLight,
                        borderRadius: BorderRadius.circular(5)),
                    child: ListTile(
                      title:
                      Text(activity['activityType'].toString().toCapitalized()),
                      trailing: Text(
                        DateFormat('EEE, dd MMM y')
                            .format(DateTime.parse(activity['activityDate'])),
                        style: const TextStyle(),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                Card(
                  shape: RoundedRectangleBorder(
                    borderRadius: BorderRadius.circular(5),
                  ),
                  color: ItemStateUtil.getColors(activity['itemState']),
                  child: Container(
                    alignment: Alignment.topLeft,
                    height: 30,
                    child: Center(
                      child: Text(
                        "Current status: ${activity['itemState']}",
                        style: const TextStyle(
                          fontSize: 15,
                          fontStyle: FontStyle.italic,
                        ),
                      ),
                    ),
                  ),
                ),
                const SizedBox(height: 10),
                GestureDetector(
                    onTap: () => Get.toNamed(
                        activity['item']['node']['type'] == 'ITEM'
                            ? Routes.ITEM
                            : Routes.PACK,
                        arguments: activity['item']['node']['_id']),
                    child: Card(
                      shape: RoundedRectangleBorder(
                        side: const BorderSide(color: Colors.grey, width: 1),
                        borderRadius: BorderRadius.circular(15),
                      ),
                      child: Column(
                        children: [
                          const SizedBox(height: 10),
                          Container(
                            alignment: Alignment.topRight,
                            padding: const EdgeInsets.only(right: 10),
                            child: const Icon(
                              Icons.keyboard_arrow_right,
                              size: 30,
                            ),
                          ),
                          const SizedBox(height: 10),
                          CircleAvatar(
                            backgroundImage: NetworkImage(
                                'http://10.0.2.2:3000/${activity['item']['node']['_id']}'),
                            radius: MediaQuery.of(context).size.width / 7,
                          ),
                          const SizedBox(height: 10),
                          Center(
                              child: Text(
                                activity['item']['name'],
                                style: const TextStyle(
                                    fontSize: 20, fontWeight: FontWeight.bold),
                              )),
                          const SizedBox(height: 10),
                          Center(
                            child: Text(activity['item']['description']),
                          ),
                          const SizedBox(height: 10),
                          Center(
                            child: Text(
                                'Created By: ${activity['item']['node']['createdBy']['name']}'),
                          ),
                          const SizedBox(height: 10),
                          Center(
                            child: Text(
                              'Rs ${activity['item']['price']}',
                              style: const TextStyle(
                                  fontSize: 16, fontWeight: FontWeight.w600),
                            ),
                          ),
                          const SizedBox(height: 20),
                        ],
                      ),
                    )),
                Row(
                  mainAxisSize: MainAxisSize.max,
                  children: [
                    Expanded(
                      child: Card(
                        shape: RoundedRectangleBorder(
                          side: const BorderSide(color: Colors.grey, width: 1),
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: ListTile(
                          title: const Center(child: Text('Order Quantity')),
                          subtitle:
                          Center(child: Text(activity['quantity'].toString())),
                        ),
                      ),
                    ),
                    Expanded(
                      child: Card(
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          side: const BorderSide(color: Colors.grey, width: 1),
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: ListTile(
                          title: const Center(child: Text('Order date')),
                          subtitle: Center(
                              child: Text(DateFormat('EEE, dd MMM y').format(
                                  DateTime.parse(
                                      activity['activityDate'].toString())))),
                        ),
                      ),
                    ),
                  ],
                ),
                Row(
                  children: [
                    Expanded(
                      child: Card(
                        elevation: 0,
                        shape: RoundedRectangleBorder(
                          side: const BorderSide(color: Colors.grey, width: 1),
                          borderRadius: BorderRadius.circular(5),
                        ),
                        child: ListTile(
                          title: const Center(child: Text('Issue date')),
                          subtitle: Center(
                              child: Text(DateFormat('EEE, dd MMM y').format(
                                  DateTime.parse(
                                      activity['issueDate'].toString())))),
                        ),
                      ),
                    ),
                    Visibility(
                      child: Expanded(
                        child: Card(
                          elevation: 0,
                          shape: RoundedRectangleBorder(
                            side: const BorderSide(color: Colors.grey, width: 1),
                            borderRadius: BorderRadius.circular(5),
                          ),
                          color: ItemStateUtil.cancelledColor,
                          child: ListTile(
                            title: const Center(child: Text('Due date')),
                            subtitle: Center(
                                child: Text(DateFormat('EEE, dd MMM y').format(
                                    DateTime.parse(activity['dueDate'] ??
                                        DateTime.now().toString())))),
                          ),
                        ),
                      ),
                      visible: activity['activityType'] == 'RENT',
                    )
                  ],
                ),
                Visibility(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        child: const Text('Cancel order'),
                        style: ButtonStyle(
                          backgroundColor: MaterialStateProperty.all<Color>(
                              Get.theme.errorColor),
                        ),
                        onPressed: () async {
                          await _activityDetailsProvider.cancelOrder(activity['item']['node']['_id']);
                          controller.updateActivity('CANCELLED');
                        },
                      ),
                      const SizedBox(width: 10),
                      ElevatedButton(
                        child: const Text('Get item'),
                        onPressed: () async {
                          _activityDetailsProvider.issueOrder(activity['item']['node']['_id']);
                          controller.updateActivity('ISSUED');
                        },
                      )
                    ],
                  ),
                  visible: activity['itemState'] == 'ORDERED',
                ),
                Visibility(
                  child: Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: [
                      ElevatedButton(
                        child: const Text('Return item'),
                        onPressed: () async {
                          _activityDetailsProvider.returnOrder(activity['item']['node']['_id']);
                          controller.updateActivity('RETURNED');
                        },
                      )
                    ],
                  ),
                  visible: activity['itemState'] == 'ISSUED',
                )
              ],
            ),
          ),
        )
    );
  }
}
