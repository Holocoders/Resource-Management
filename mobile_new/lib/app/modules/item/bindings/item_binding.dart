import 'package:get/get.dart';

import 'package:mobile_new/app/modules/item/controllers/recent_controller.dart';

import '../controllers/item_controller.dart';

class ItemBinding extends Bindings {

  final tag;

  ItemBinding({ this.tag });

  @override
  void dependencies() {
    Get.lazyPut<RecentController>(
      () => RecentController(),
      tag: tag,
    );
    Get.lazyPut<ItemController>(
      () => ItemController(),
      tag: tag,
    );
  }
}
