import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/facilities_categories/facility_category_tab_controller.dart';
import 'package:resource_management_system/facilities_categories/node_controller.dart';
import 'package:resource_management_system/facilities_categories/permission_users.dart';
import 'package:resource_management_system/facilities_categories/permission_users_add.dart';
import 'package:resource_management_system/widgets/GqlQuery.dart';
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
    final FacilityCategoryTabController _tabx =
    Get.put(FacilityCategoryTabController());
    _tabx.reset();

    final NodeController _nodeController = Get.put(NodeController());

    return GqlQuery(query: _getAllFacilities, child: (result) {
      // _nodeController.setData(result.data?['facilities']);
      return PermissionQuery(
        child: Scaffold(
          drawer: BaseDrawer(),
          appBar: BaseAppBar(
            appBar: AppBar(),
            title: const Text('Facilities'),
            bottom: TabBar(
              controller: _tabx.controller,
              tabs: _tabx.myTabs,
            ),
          ),
          body: TabBarView(
            controller: _tabx.controller,
            children: [
              NodesGridView(data: result.data?['facilities']),
              PermissionUsers(),
            ],
          ),
          floatingActionButton: Get
              .find<NodeController>()
              .editable
              .value
              ? FloatingActionButton(
            onPressed: () {
              if (_tabx.currentPage.value == 0) {
                Get.toNamed(
                  FacilityCategoryAdd.route,
                  arguments: '-1',
                );
              } else {
                Get.toNamed(
                  PermissionUsersAdd.route,
                  arguments: '-1',
                );
              }
            },
            child: const Icon(
              Icons.add,
            ),
          )
              : Container(),
        ),
      );
    });
  }
}
