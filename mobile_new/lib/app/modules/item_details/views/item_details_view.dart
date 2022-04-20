import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:mobile_new/app/modules/item_details/views/recent_view.dart';

import '../../../widgets/base_appbar.dart';
import '../../../widgets/base_drawer.dart';
import '../controllers/item_details_controller.dart';
import 'availability_view.dart';
import 'detail_view.dart';

class ItemDetailsView extends GetView<ItemDetailsController> {
  const ItemDetailsView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    final itemId = Get.arguments;

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
      drawer: BaseDrawer(),
      appBar: BaseAppBar(
        title: const Text('Item'),
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
                  // AvailabilityView(item: result.data?['item']),
                  // RecentView(item: result.data?['item'])
                ],
              ),
            ),
          );
        },
      ),
    );
  }
}
