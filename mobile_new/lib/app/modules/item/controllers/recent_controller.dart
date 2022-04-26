import 'package:get/get.dart';

import 'package:mobile_new/app/modules/item/providers/item_provider.dart';

class RecentController extends GetxController with StateMixin {

  final _itemProvider = Get.put(ItemProvider());

  @override
  void onInit() async {
    final id = Get.arguments;
    change({}, status: RxStatus.loading());
    try {
      var item = await _itemProvider.getRecentlyBoughtItems(id);
      change(item, status: RxStatus.success());
    } catch (e) {
      change({}, status: RxStatus.error());
    }
  }
}
