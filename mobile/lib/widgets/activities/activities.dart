import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:intl/intl.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/activities/single_activity.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'package:resource_management_system/widgets/base_drawer.dart';
import 'package:resource_management_system/utils.dart';



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
      color: ItemStateColors.getColors(itemState),
      borderRadius: BorderRadius.circular(5),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const BaseDrawer(),
      appBar: BaseAppBar(
        title: const Text('My activities'),
        appBar: AppBar(),
      ),
      body: Query(
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
          if (result.data == null || result.data?['itemHistoryByUser'] == []) {
            return const Center(child: Text('No data found'));
          }
          return ListView.builder(
            itemCount: result.data!['itemHistoryByUser']?.length,
            itemBuilder: (BuildContext context, int index) {
              return GestureDetector(
                onTap: () {
                  Get.toNamed(SingleActivity.route, arguments: result.data!['itemHistoryByUser'][index])?.asStream().listen((_) => refetch!());
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
                    decoration: _getBoxDecorator(
                        result.data!['itemHistoryByUser'][index]['itemState']),
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
                        child: Icon(result.data!['itemHistoryByUser'][index]['activityType'] == 'RENT' ? Icons.vpn_key : Icons.check),
                      ),
                      title: Text(
                        result.data!['itemHistoryByUser'][index]['activityType']
                            .toString()
                            .toCapitalized(),
                        style: const TextStyle(fontWeight: FontWeight.bold),
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
                            "Item: ${result.data!['itemHistoryByUser'][index]['item']['name']}",
                            style: const TextStyle(),
                          ),
                          const SizedBox(height: 5.0),
                          Text(
                            "Quantity: ${result.data!['itemHistoryByUser'][index]['quantity']}",
                            style: const TextStyle(),
                          ),
                          const SizedBox(height: 5.0),
                          Text(
                            "Order placed on\n${DateFormat('EEEE, dd MMM y').format(
                              DateTime.parse(result.data!['itemHistoryByUser']
                                  [index]['activityDate']),
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
    );
  }
}
