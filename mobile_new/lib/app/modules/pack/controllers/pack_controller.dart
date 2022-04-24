import 'package:get/get.dart';
import 'package:mobile_new/app/modules/pack/providers/pack_provider.dart';

class PackController extends GetxController with StateMixin {

  final _packProvider = Get.put(PackProvider());

  @override
  void onInit() async {
    var id = Get.arguments;
    try {
      var pack = await _packProvider.getPackDetails(id);
      change(pack, status: RxStatus.success());
    } catch (e) {
      change({}, status: RxStatus.error());
    }
  }
}
