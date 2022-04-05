import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'package:resource_management_system/widgets/base_drawer.dart';
import 'package:get/get.dart';
import 'Node/nodes_grid_view.dart';
import 'facility_category_add.dart';

class Facilities extends StatelessWidget {
  Facilities({Key? key}) : super(key: key);

  static const String route = '/facilities';
  static const String _getAllFacilities = """
  query facilities {
    facilities {
      node {
        _id
        categoryCount
        itemCount
      }
      name
      description
    }
  }
  """;

  static const String _getPermission = """
    query checkPermission (\$userId: String!, \$nodeId: String!,) {
    checkPermission(userId:\$userId, nodeId: \$nodeId)
  }
  """;

  final _editable = false.obs;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: const BaseDrawer(),
      appBar: BaseAppBar(
        appBar: AppBar(),
        title: const Text('Facilities'),
      ),
      body: Query(
        options: QueryOptions(
          document: gql(Facilities._getAllFacilities),
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (result.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          if (result.data == null) {
            return const Center(
              child: Text('No items found'),
            );
          }

          return Query(
            options: QueryOptions(
              document: gql(Facilities._getPermission),
              variables: <String, dynamic>{
                'userId': "621c8727d851aa458827e0c9",
                'nodeId': '-1',
              },
            ),
            builder: (QueryResult permissionResult,
                {VoidCallback? refetch, FetchMore? fetchMore}) {
              if (permissionResult.isLoading) {
                return const Center(
                  child: CircularProgressIndicator(),
                );
              }
              if (permissionResult.data == null) {
                return const Center(
                  child: Text('No items found'),
                );
              }
              _editable.value = permissionResult.data!['checkPermission'];
              return NodesGridView(
                result.data?['facilities'],
                editable: _editable.value,
              );
            },
          );
        },
      ),
      floatingActionButton: _editable.value
          ? FloatingActionButton(
        onPressed: () {
          Get.toNamed(
            FacilityCategoryAdd.route,
            arguments: '-1',
          );
        },
        child: const Icon(
          Icons.add,
        ),
      )
          : null,
    );
  }
}
