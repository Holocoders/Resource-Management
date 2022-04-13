import 'package:get/get.dart';

class NodeController extends GetxController {
  var data = [].obs;
  RxBool editable = false.obs;

  setData(List data) {
    this.data.value = data;
    update();
  }

  setEditable(bool value) {
    editable.value = value;
    update();
  }

  delNode(int id) {
    data.value = data.where((element) => element['_id'] != id).toList();
    update();
  }
}
