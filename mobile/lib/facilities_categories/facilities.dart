import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'package:resource_management_system/widgets/base_drawer.dart';
import 'package:get/get.dart';
import '../widgets/no_item_found.dart';
import '../widgets/permissionQuery.dart';
import 'Node/nodes_grid_view.dart';
import 'facility_category_add.dart';

class Facilities extends StatelessWidget {
  const Facilities({Key? key}) : super(key: key);

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

  @override
  Widget build(BuildContext context) {
    return Query(
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
          return const NoItemFound();
        }
        return PermissionQuery(
          child: (bool _editable) => Scaffold(
            drawer: BaseDrawer(),
            appBar: BaseAppBar(
              appBar: AppBar(),
              title: const Text('Facilities'),
            ),
            body: NodesGridView(
              result.data?['facilities'],
              editable: _editable,
            ),
            floatingActionButton: _editable
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
          ),
        );
      },
    );
  }
}
