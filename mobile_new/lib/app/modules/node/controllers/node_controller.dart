import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node/providers/node_provider.dart';

class NodeController extends GetxController with StateMixin {
  final NodeProvider _nodeProvider = Get.put(NodeProvider());

  @override
  void onInit() {
    final args = Get.arguments;
    change([], status: RxStatus.loading());
    var value = {};
    if (args == null) {
      value['id'] = null;
      value['name'] = 'Facilities';
      _nodeProvider.getFacilities().then((data) {
        if (value['data'] == []) {
          change([], status: RxStatus.empty());
        }
        value['data'] = data;
        _nodeProvider.getUsers('-1').then((users) {
          value['users'] = users;
          _nodeProvider.permissionCheck('-1').then((permission) {
            value['permission'] = permission;

            change(value, status: RxStatus.success());
          });
        });
      }, onError: (error) {
        print(error);
        change(error, status: RxStatus.error());
      });
    } else {
      final id = args['_id'];
      value['id'] = id;
      value['name'] = args['name'];
      _nodeProvider.getAllNodes(id).then((data) {
        if (value['data'] == []) {
          change([], status: RxStatus.empty());
        }
        value['data'] = data;
        _nodeProvider.getUsers(id).then((users) => {
              value['users'] = users,
              _nodeProvider.permissionCheck(id).then((permission) async {
                value['permission'] = permission;
                change(value, status: RxStatus.success());
              })
            });
      }, onError: (error) {
        print(error);
        change(error, status: RxStatus.error());
      });
    }

    super.onInit();
  }

  delNode(id) {
    _nodeProvider.delNode(id).then((value) {
      onInit();
      Get.back();
    }, onError: (error) {
      print(error);
    });
  }
}
