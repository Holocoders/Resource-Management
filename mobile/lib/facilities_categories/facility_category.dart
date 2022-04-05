import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'facility_category_add.dart';
import 'Node/nodes_grid_view.dart';
import '../widgets/base_appbar.dart';
import '../widgets/base_drawer.dart';

class FacilityCategory extends StatelessWidget {
  FacilityCategory({Key? key}) : super(key: key);

  static const String route = '/category';

  final String _getAllCategories = """
    query childCategories(\$id: String!) {
        childCategories(id: \$id) {
          node {
            _id
            categoryCount
            itemCount
            type
          }
          description
          name
        }
      }
  """;

  final String _getAllItems = """
    query childItems(\$id: String!) {
        childItems(id: \$id) {
          node {
            _id
            categoryCount
            itemCount
            type
          }
          description
          name
          price
          quantity
        }
      }
  """;

  final String _getAllPacks = """
    query childPacks(\$id: String!) {
        childPacks(id: \$id) {
          node {
            _id
            categoryCount
            itemCount
            type
          }
          description
          name
          price
          packItems {
            item {
              node {
                _id
              }
              name
              quantity
            }
            quantity
          }
          quantity
        }
      }
  """;

  final String _getPermission = """
    query checkPermission (\$userId: String!, \$nodeId: String!,) {
    checkPermission(userId:\$userId, nodeId: \$nodeId)
  }
  """;

  var _editable = false.obs;

  @override
  Widget build(BuildContext context) {
    final data =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;

    return Scaffold(
      drawer: const BaseDrawer(),
      appBar: BaseAppBar(
        title: const Text('Category'),
        appBar: AppBar(),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(_getAllCategories),
          variables: {'id': data['_id']},
        ),
        builder: (QueryResult categories,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (categories.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          return Query(
              options: QueryOptions(
                  document: gql(_getAllItems), variables: {'id': data['_id']}),
              builder: (QueryResult items,
                  {VoidCallback? refetch, FetchMore? fetchMore}) {
                if (items.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                }
                return Query(
                    options: QueryOptions(
                        document: gql(_getAllPacks),
                        variables: {'id': data['_id']}),
                    builder: (QueryResult packs,
                        {VoidCallback? refetch, FetchMore? fetchMore}) {
                      if (packs.isLoading) {
                        return const Center(child: CircularProgressIndicator());
                      }
                      if (items.data == null && packs.data == null) {
                        return const Center(child: Text('No items found'));
                      }
                      var nodes = [
                        ...categories.data?['childCategories'],
                        ...items.data?['childItems'],
                        ...packs.data?['childPacks']
                      ];

                      return Query(
                        options: QueryOptions(
                          document: gql(_getPermission),
                          variables: {
                            'userId': "621c8727d851aa458827e0c9",
                            'nodeId': data['_id']
                          },
                        ),
                        builder: (QueryResult permission,
                            {VoidCallback? refetch, FetchMore? fetchMore}) {
                          if (permission.isLoading) {
                            return const Center(
                                child: CircularProgressIndicator());
                          }
                          _editable.value = permission.data?['checkPermission'];
                          return NodesGridView(
                            nodes,
                            editable: _editable.value,
                          );
                        },
                      );
                    });
              });
        },
      ),
      floatingActionButton: _editable.value
          ? FloatingActionButton(
              onPressed: () {
                Get.toNamed(FacilityCategoryAdd.route, arguments: data['_id']);
              },
              child: const Icon(Icons.add),
            )
          : null,
    );
  }
}
