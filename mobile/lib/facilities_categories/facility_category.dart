import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/permissionQuery.dart';
import '../auth/user_service.dart';
import '../widgets/no_item_found.dart';
import 'facility_category_add.dart';
import 'Node/nodes_grid_view.dart';
import '../widgets/base_appbar.dart';
import '../widgets/base_drawer.dart';
import 'facility_category_tab_controller.dart';
import 'permission_users.dart';
import 'permission_users_add.dart';

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

  @override
  Widget build(BuildContext context) {
    final FacilityCategoryTabController _tabx =
        Get.put(FacilityCategoryTabController(), permanent: false);
    _tabx.reset();
    final data =
        ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;

    return Query(
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
                      return const NoItemFound();
                    }
                    var nodes = [
                      ...categories.data?['childCategories'],
                      ...items.data?['childItems'],
                      ...packs.data?['childPacks']
                    ];

                    return PermissionQuery(
                      nodeId: data['_id'],
                      child: (bool _editable) => Scaffold(
                        drawer: BaseDrawer(),
                        appBar: BaseAppBar(
                          title: const Text('Category'),
                          appBar: AppBar(),
                          bottom: TabBar(
                            controller: _tabx.controller,
                            tabs: _tabx.myTabs,
                          ),
                        ),
                        body: TabBarView(
                          controller: _tabx.controller,
                          children: [
                            NodesGridView(
                              nodes,
                              editable: _editable,
                            ),
                            PermissionUsers(
                              nodeId: data['_id'],
                            ),
                          ],
                        ),
                        floatingActionButton: _editable
                            ? FloatingActionButton(
                                onPressed: () {
                                  if (_tabx.currentPage.value == 0) {
                                    Get.toNamed(
                                      FacilityCategoryAdd.route,
                                      arguments: data['_id'],
                                    );
                                  } else {
                                    Get.toNamed(
                                      PermissionUsersAdd.route,
                                      arguments: data['_id'],
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
            });
      },
    );
  }
}
