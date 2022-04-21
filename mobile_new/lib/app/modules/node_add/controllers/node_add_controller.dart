import 'package:get/get.dart';

import '../../../routes/app_pages.dart';
import '../../../widgets/snackbars.dart';
import '../providers/node_add_provider.dart';

class NodeAddController extends GetxController {

  final NodeAddProvider _nodeAddProvider = Get.put(NodeAddProvider());

  submitForm(args, name, desc, image) async {
    var res;
    if (args == null) {
      res = await _nodeAddProvider.addFacility(name, desc, image);
      CustomSnackbars.success("Added Successfully");
      Get.toNamed(Routes.NODE);
    } else {
      final id = args['id'];
      res = await _nodeAddProvider.addCategory(id, name, desc, image);
      CustomSnackbars.success("Added Successfully");
      Get.toNamed(Routes.NODE, arguments: id, preventDuplicates: false);
    }
  }
}
