import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'package:resource_management_system/widgets/item/availability.dart';
import 'package:resource_management_system/widgets/item/detail.dart';
import 'package:resource_management_system/widgets/item/recent.dart';

class Item extends StatefulWidget {

  // final String itemId;
  static String route = '/item';
  const Item({Key? key}) : super(key: key);

  @override
  _ItemState createState() => _ItemState();
}

class _ItemState extends State<Item> {

  @override
  Widget build(BuildContext context) {

    final itemId = ModalRoute.of(context)!.settings.arguments as String;

    String getItemDetails = """
    query item(\$id: String!) {
      item(id: \$id) {
        node {
          _id
          createdBy {
            _id
            name
          }
          parent {
            _id
          }
        }
        description
        name
        price
        quantity
        allowedItemActivities
      }
    }
  """;

    return Scaffold(
      appBar: BaseAppBar(
        title: Text('Item'),
        appBar: AppBar(),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(getItemDetails),
          variables: {
            'id': itemId,
          },
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (result.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          return SingleChildScrollView(
            child: Align(
              alignment: Alignment.topCenter,
              child: Column(
                children: [
                  DetailView(item: result.data?['item']),
                  AvailabilityView(item: result.data?['item']),
                  RecentView(item: result.data?['item'])
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
