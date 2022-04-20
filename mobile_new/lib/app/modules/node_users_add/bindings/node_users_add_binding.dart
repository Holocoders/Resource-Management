import 'package:get/get.dart';

import '../controllers/node_users_add_controller.dart';

class NodeUsersAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<NodeUsersAddController>(
      () => NodeUsersAddController(),
    );
  }
}
