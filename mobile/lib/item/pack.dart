import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/item/packItems.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'package:resource_management_system/widgets/base_drawer.dart';

import 'availability.dart';
import 'detail.dart';

class Pack extends StatefulWidget {
  static String route = '/pack';

  const Pack({Key? key}) : super(key: key);

  @override
  State<Pack> createState() => _PackState();
}

class _PackState extends State<Pack> {
  @override
  Widget build(BuildContext context) {
    final packId = ModalRoute.of(context)!.settings.arguments as String;
    String getPackDetails = """
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
        packItems {
          item {
            node {
              _id
            }
            name
            description
            price
            quantity
          }
          quantity
        }
        allowedItemActivities
      }
    }
  """;
    return Scaffold(
      drawer: BaseDrawer(),
      appBar: BaseAppBar(
        title: const Text('Pack'),
        appBar: AppBar(),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(getPackDetails),
          variables: {
            'id': packId,
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
                  PackItems(item: result.data?['item']),
                  AvailabilityView(item: result.data?['item']),
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
