import 'package:get/get.dart';

import 'package:mobile_new/app/modules/node/controllers/tab_controller.dart';

import '../controllers/node_controller.dart';

class NodeBinding extends Bindings {
  final tag;

  NodeBinding({this.tag});

  @override
  void dependencies() {
    Get.lazyPut<NodeTabController>(
      () => NodeTabController(),
    );
    Get.lazyPut<NodeController>(() => NodeController(), tag: tag);
  }
}
