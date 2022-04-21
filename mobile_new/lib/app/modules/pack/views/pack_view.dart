import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../../../widgets/base_appbar.dart';
import '../../../widgets/base_drawer.dart';
import '../../item/views/availability_view.dart';
import '../../item/views/detail_view.dart';
import '../controllers/pack_controller.dart';
import 'pack_items.dart';

class PackView extends GetView<PackController> {
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
