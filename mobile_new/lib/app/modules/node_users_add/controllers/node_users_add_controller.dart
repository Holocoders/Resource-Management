import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node_users_add/providers/node_users_add_provider.dart';

class NodeUsersAddController extends GetxController {
  var id;
  final NodeUsersAddProvider _provider = Get.put(NodeUsersAddProvider());

  @override
  void onInit() {
    id = Get.arguments;
    super.onInit();
  }

  void addUser(String email) {
    _provider.addNodeUser(email, id);
  }
}
