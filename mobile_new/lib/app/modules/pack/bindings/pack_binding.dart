import 'package:get/get.dart';

import '../controllers/pack_controller.dart';

class PackBinding extends Bindings {

  final tag;

  PackBinding({this.tag});

  @override
  void dependencies() {
    Get.lazyPut<PackController>(
      () => PackController(),
      tag: tag,
    );
  }
}
