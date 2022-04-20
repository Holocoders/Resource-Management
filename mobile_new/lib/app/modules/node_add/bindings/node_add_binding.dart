import 'package:get/get.dart';

import '../controllers/node_add_controller.dart';

class NodeAddBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<NodeAddController>(
      () => NodeAddController(),
    );
  }
}
