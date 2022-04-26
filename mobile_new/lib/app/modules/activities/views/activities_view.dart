import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';

import 'package:mobile_new/app/services/activity_utils.dart';

class ActivitiesView extends GetView {
  final activities;
  final onActivityClicked;
  final isAdminView;
  ActivitiesView(
      {Key? key,
      required this.activities,
      required this.onActivityClicked,
      this.isAdminView = false})
      : super(key: key);

  BoxDecoration _getBoxDecorator(String itemState) {
    return BoxDecoration(
      color: ItemStateUtil.getColors(itemState),
      borderRadius: BorderRadius.circular(5),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Expanded(
      child: ListView.builder(
        itemCount: activities?.length,
        itemBuilder: (BuildContext context, int index) {
          return GestureDetector(
            onTap: () {
              onActivityClicked(activities[index], isAdminView);
            },
            child: Card(
              elevation: 2,
              shape: RoundedRectangleBorder(
                side: const BorderSide(width: 0.2),
                borderRadius: BorderRadius.circular(15),
              ),
              margin: const EdgeInsets.symmetric(
                horizontal: 10.0,
                vertical: 6.0,
              ),
              child: Container(
                decoration: _getBoxDecorator(activities[index]['itemState']),
                child: ListTile(
                  contentPadding: const EdgeInsets.symmetric(
                    horizontal: 20.0,
                    vertical: 10.0,
                  ),
                  leading: Container(
                    padding: const EdgeInsets.only(right: 12.0),
                    decoration: const BoxDecoration(
                      border: Border(
                        right: BorderSide(width: 1.0),
                      ),
                    ),
                    child: Icon(activities[index]['activityType'] == 'RENT'
                        ? Icons.vpn_key
                        : Icons.check),
                  ),
                  title: Text(
                    "${activities[index]['activityType'].toString().toCapitalized()} (${activities[index]['itemState'].toString().toCapitalized()})",
                    style: const TextStyle(fontWeight: FontWeight.bold),
                  ),
                  trailing: const IconButton(
                    icon: Icon(Icons.keyboard_arrow_right),
                    onPressed: null,
                  ),
                  subtitle: Column(
                    crossAxisAlignment: CrossAxisAlignment.start,
                    children: <Widget>[
                      const SizedBox(height: 5.0),
                      if (isAdminView)
                        ...[
                          Text(
                            "User: ${activities[index]['user']['name']}",
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 5.0),
                        ],
                      if (isAdminView)
                        ...[
                          Text(
                            "Email: ${activities[index]['user']['email']}",
                            style: const TextStyle(
                              fontWeight: FontWeight.bold,
                            ),
                          ),
                          const SizedBox(height: 5.0),
                        ],
                      Text(
                        "Item: ${activities[index]['item']['name']}",
                        style: const TextStyle(),
                      ),
                      const SizedBox(height: 5.0),
                      Text(
                        "Quantity: ${activities[index]['quantity']}",
                        style: const TextStyle(),
                      ),
                      const SizedBox(height: 5.0),
                      Text(
                        "Order placed on\n${DateFormat('EEEE, dd MMM y').format(
                          DateTime.parse(activities[index]['activityDate']),
                        )}",
                        style: const TextStyle(),
                      )
                    ],
                  ),
                ),
              ),
            ),
          );
        },
      ),
    );
  }
}
