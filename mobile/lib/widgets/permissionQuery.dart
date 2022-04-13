import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../auth/user_service.dart';
import '../facilities_categories/node_controller.dart';

class PermissionQuery extends StatelessWidget {
  static const String _getPermission = """
    query checkPermission (\$userId: String!, \$nodeId: String!,) {
      checkPermission(userId:\$userId, nodeId: \$nodeId)
    }
  """;

  final Widget child;
  final String nodeId;

  const PermissionQuery({
    Key? key,
    required this.child,
    this.nodeId = '-1',
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Query(
      options: QueryOptions(
        document: gql(_getPermission),
        variables: <String, dynamic>{
          'userId': Get.find<UserService>().user.value.id,
          'nodeId': nodeId,
        },
      ),
      builder: (QueryResult permissionResult,
          {VoidCallback? refetch, FetchMore? fetchMore}) {
        if (permissionResult.isLoading) {
          return const Center(
            child: CircularProgressIndicator(),
          );
        }
        bool _editable = permissionResult.data!['checkPermission'];
        Get.find<NodeController>().setEditable(_editable);
        return child;
      },
    );
  }
}
