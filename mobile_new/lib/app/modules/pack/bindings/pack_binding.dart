import 'package:get/get.dart';

import '../controllers/pack_controller.dart';

class PackBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<PackController>(
      () => PackController(),
    );
  }
}
