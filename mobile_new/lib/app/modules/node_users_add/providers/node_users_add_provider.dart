import 'package:get/get.dart';
import 'package:mobile_new/app/services/api_service.dart';

class NodeUsersAddProvider extends ApiService {
  Future<dynamic> addNodeUser(email, id) async {
    const String _mutation = """
    mutation addPermission(\$createPermissionInput: CreatePermissionInput!) {
            addPermission(createPermissionInput: \$createPermissionInput)
          }
  """;
    final variables = {
      'createPermissionInput': {
        'nodeId': id,
        'email': email,
      }
    };
    final res = await mutation(_mutation, variables: variables);
    return res.body;
  }
}
