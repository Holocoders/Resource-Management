import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'package:resource_management_system/widgets/base_drawer.dart';
import 'package:resource_management_system/utils.dart';

import 'single_activity.dart';

class Activities extends StatefulWidget {
  const Activities({Key? key}) : super(key: key);
  static const String route = '/activities';

  @override
  _ActivitiesState createState() => _ActivitiesState();
}

class _ActivitiesState extends State<Activities> {
  final String getActivities = """
  query itemHistoryByUser () {
    itemHistoryByUser () {
      item {
        node {
          _id
          createdBy {
            _id
            email
            name
          }
          type
        }
        name
        quantity
        price
        description
      }
      quantity
      activityDate
      itemState
      activityType
      issueDate
      dueDate
    }
  }
  """;

  BoxDecoration _getBoxDecorator(String itemState) {
    return BoxDecoration(
      color: ItemStateUtil.getColors(itemState),
      borderRadius: BorderRadius.circular(5),
    );
  }

  final List<String> _filteredStates = List.from(ItemStateUtil.itemStates);
  final List<String> _filteredActivities = List.from(ActivityUtil.activities);

  @override
  Widget build(BuildContext context) {
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
                      builder: (BuildContext context, StateSetter setState) {
                        return Column(
                          children: [
                            ListTile(
                              trailing: TextButton(
                                onPressed: () {
                                  Get.back();
                                },
                                child: const Text('Close', style: TextStyle(color: Colors.blueAccent)),
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
                                  label: Text(ItemStateUtil.itemStates[index].toString().toCapitalized()),
                                  onSelected: (bool selected) {
                                    setState(() {
                                      if (selected) {
                                        _filteredStates.add(ItemStateUtil.itemStates[index]);
                                      } else {
                                        _filteredStates.removeWhere((element) => element == ItemStateUtil.itemStates[index]);
                                      }
                                    });
                                  },
                                  selected: _filteredStates.contains(ItemStateUtil.itemStates[index]),
                                  checkmarkColor: Colors.black,
                                  selectedColor: Colors.lightGreen
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
                                  label: Text(ActivityUtil.activities[index].toString().toCapitalized()),
                                  onSelected: (bool selected) {
                                    setState(() {
                                      if (selected) {
                                        _filteredActivities.add(ActivityUtil.activities[index]);
                                      } else {
                                        _filteredActivities.removeWhere((element) => element == ActivityUtil.activities[index]);
                                      }
                                    });
                                  },
                                  selected: _filteredActivities.contains(ActivityUtil.activities[index]),
                                  checkmarkColor: Colors.black,
                                  selectedColor: Colors.lightGreen
                                ),
                              ),
                            ),
                            const Divider(height: 2),
                          ],
                        );
                      },
                    ),
                    backgroundColor: Colors.white,
                    shape: RoundedRectangleBorder(
                      borderRadius: BorderRadius.circular(15),
                    ),
                    isDismissible: false,
                  ).then((value) => setState(() {

                  }));
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
          Expanded(
            child: Query(
              options: QueryOptions(
                document: gql(getActivities),
              ),
              builder: (QueryResult result,
                  {VoidCallback? refetch, FetchMore? fetchMore}) {
                if (result.hasException) {
                  return Text(result.exception.toString());
                }
                if (result.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                }
                if (result.data == null ||
                    result.data?['itemHistoryByUser'] == []) {
                  return const Center(child: Text('No data found'));
                }
                var itemHistory = result.data!['itemHistoryByUser'];
                itemHistory = itemHistory.where((element) => _filteredActivities.contains(element['activityType'])).toList();
                itemHistory = itemHistory.where((element) => _filteredStates.contains(element['itemState'])).toList();
                return ListView.builder(
                  itemCount: itemHistory?.length,
                  itemBuilder: (BuildContext context, int index) {
                    return GestureDetector(
                      onTap: () {
                        Get.toNamed(SingleActivity.route,
                                arguments: itemHistory
                                    [index])
                            ?.asStream()
                            .listen((_) => refetch!());
                      },
                      child: Card(
                        elevation: 2,
                        shape: RoundedRectangleBorder(
                          side: const BorderSide(
                            color: Colors.grey,
                            width: 0.2,
                          ),
                          borderRadius: BorderRadius.circular(15),
                        ),
                        margin: const EdgeInsets.symmetric(
                          horizontal: 10.0,
                          vertical: 6.0,
                        ),
                        child: Container(
                          decoration: _getBoxDecorator(itemHistory[index]['itemState']),
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
                              child: Icon(itemHistory
                                          [index]['activityType'] ==
                                      'RENT'
                                  ? Icons.vpn_key
                                  : Icons.check),
                            ),
                            title: Text(
                              "${itemHistory[index]['activityType'].toString().toCapitalized()} (${itemHistory[index]['itemState'].toString().toCapitalized()})",
                              style:
                                  const TextStyle(fontWeight: FontWeight.bold),
                            ),
                            trailing: const IconButton(
                              icon: Icon(Icons.keyboard_arrow_right),
                              splashColor: Colors.transparent,
                              onPressed: null,
                            ),
                            subtitle: Column(
                              crossAxisAlignment: CrossAxisAlignment.start,
                              children: <Widget>[
                                const SizedBox(height: 5.0),
                                Text(
                                  "Item: ${itemHistory[index]['item']['name']}",
                                  style: const TextStyle(),
                                ),
                                const SizedBox(height: 5.0),
                                Text(
                                  "Quantity: ${itemHistory[index]['quantity']}",
                                  style: const TextStyle(),
                                ),
                                const SizedBox(height: 5.0),
                                Text(
                                  "Order placed on\n${DateFormat('EEEE, dd MMM y').format(
                                    DateTime.parse(
                                        itemHistory[index]
                                            ['activityDate']),
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
                );
              },
            ),
          )
        ],
      ),
    );
  }
}
