import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/GqlQuery.dart';
import 'package:resource_management_system/widgets/permissionQuery.dart';
import '../auth/user_service.dart';
import '../widgets/no_item_found.dart';
import 'facility_category_add.dart';
import 'Node/nodes_grid_view.dart';
import '../widgets/base_appbar.dart';
import '../widgets/base_drawer.dart';
import 'facility_category_tab_controller.dart';
import 'node_controller.dart';
import 'permission_users.dart';
import 'permission_users_add.dart';

class FacilityCategory extends StatelessWidget {
  FacilityCategory({Key? key}) : super(key: key);

  static const String route = '/category';

  facilityQuery({required Function child}) {
    const String _getAllFacilities = """
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
    return GqlQuery(
        query: _getAllFacilities,
        child: (result) {
          return child(result.data?['facilities']);
        });
  }

  categoryQuery({required id, required Function child}) {
    const String _getAllCategories = """
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

    const String _getAllItems = """
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

    const String _getAllPacks = """
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
    return GqlQuery(
        query: _getAllCategories,
        variables: {'id': id},
        child: (categories) {
          return GqlQuery(
              query: _getAllItems,
              variables: {'id': id},
              child: (items) {
                return GqlQuery(
                    query: _getAllPacks,
                    variables: {'id': id},
                    child: (packs) {
                      var nodes = [
                        ...categories.data?['childCategories'],
                        ...items.data?['childItems'],
                        ...packs.data?['childPacks']
                      ];
                      return child(nodes);
                    });
              });
        });
  }

  getData({id = '-1', required Function child}) {
    if (id == '-1') {
      return facilityQuery(child: child);
    } else {
      return categoryQuery(id: id, child: child);
    }
  }

  @override
  Widget build(BuildContext context) {
    final FacilityCategoryTabController _tabx =
        Get.put(FacilityCategoryTabController(), permanent: false);
    _tabx.reset();

    final NodeController _nodeController = Get.put(NodeController());

    var data = ModalRoute.of(context)!.settings.arguments;
    var title;
    String id;
    if (data != null) {
      data = data as Map<String, dynamic>;
      title = data['name'];
      final node = data['node'];
      id = node['_id'];
    } else {
      id = '-1';
      title = 'Facilities';
    }

    return getData(
      id: id,
      child: (nodes) => PermissionQuery(
        nodeId: id,
        child: Scaffold(
          drawer: BaseDrawer(),
          appBar: BaseAppBar(
            title: Text(title),
            appBar: AppBar(),
            bottom: TabBar(
              controller: _tabx.controller,
              tabs: _tabx.myTabs,
            ),
          ),
          body: TabBarView(
            controller: _tabx.controller,
            children: [
              NodesGridView(data: nodes),
              PermissionUsers(
                nodeId: id,
              ),
            ],
          ),
          floatingActionButton: _nodeController.editable.value
              ? FloatingActionButton(
                  onPressed: () {
                    if (_tabx.currentPage.value == 0) {
                      Get.toNamed(
                        FacilityCategoryAdd.route,
                        arguments: id,
                      );
                    } else {
                      Get.toNamed(
                        PermissionUsersAdd.route,
                        arguments: id,
                      );
                    }
                  },
                  child: const Icon(
                    Icons.add,
                  ),
                )
              : Container(),
        ),
      ),
    );
  }
}
