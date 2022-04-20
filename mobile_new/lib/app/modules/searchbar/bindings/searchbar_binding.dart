import 'package:get/get.dart';

import '../controllers/searchbar_controller.dart';

class SearchBarBinding extends Bindings {
  @override
  void dependencies() {
    Get.lazyPut<SearchBarController>(
      () => SearchBarController(),
    );
  }
}
