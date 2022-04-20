import 'package:get/get.dart';
import 'package:mobile_new/app/services/user_service.dart';

import '../../../services/api_service.dart';

class NodeProvider extends ApiService {
  Future<dynamic> getFacilities() async {
    const String _getAllFacilities = """
      query facilities {
        facilities {
          node {
            _id
            type
            categoryCount
            itemCount
          }
          name
          description
        }
      }
      """;
    var res = await query(_getAllFacilities);
    return res.body['facilities'];
  }

  Future<dynamic> permissionCheck(nodeId) async {
    String _getPermission = """
      query checkPermission (\$userId: String!, \$nodeId: String!,) {
        checkPermission(userId:\$userId, nodeId: \$nodeId)
      }
    """;

    var res = await query(_getPermission, variables: {
      'userId': Get
          .find<UserService>()
          .user
          .value
          .id,
      'nodeId': nodeId,
    });
    return res.body['checkPermission'];
  }

  Future<dynamic> getAllNodes(id) async {
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

    final variables = {
      'id': id,
    };

    var categories = await query(_getAllCategories, variables: variables);
    var items = await query(_getAllItems, variables: variables);
    var packs = await query(_getAllPacks, variables: variables);

    return [
      ...categories.body['childCategories'],
      ...items.body['childItems'],
      ...packs.body['childPacks'],
    ];
  }

  Future<void> delNode(id) async {
    const String _deleteMutation = """
    mutation removeNode(\$id: String!) {
      removeNode(id: \$id) {
        _id
      }
    }
  """;

    final variables = {
      'id': id,
    };

    await query(_deleteMutation, variables: variables);
    return;
  }

  Future<dynamic> getUsers(id) async {
    const _getUsers = """
      query getUsersWithPermission(\$nodeId: String!) {
              getUsersWithPermission(nodeId: \$nodeId) {
                userId {
                  _id
                  name
                  email
                }
              }
            }
      """;
    final variables = {'nodeId': id};
    var res = await query(
      _getUsers,
      variables: variables,
    );
    return res.body['getUsersWithPermission'];
  }

  Future<dynamic> getFacility(id) async {
    const _getFacility = """
    query facility(\$id: String!) {
      facility(id: \$id) {
        _id
        name
        description
      }
    }
    """;
    final variables = {'id': id};
    var res = await query(
      _getFacility,
      variables: variables,
    );
    return res.body['facility'];
  }

  Future<dynamic> getCategory(id) async {
    const _getCategory = """
    query category(\$id: String!) {
      category(id: \$id) {
        _id
        name
        description
        parent {
          _id
          name
        }
      }
    }
    """;
    final variables = {'id': id};
    var res = await query(
      _getCategory,
      variables: variables,
    );
    return res.body['category'];
  }

}
