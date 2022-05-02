import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node/providers/node_provider.dart';

class NodeController extends GetxController with StateMixin {
  final NodeProvider _nodeProvider = Get.put(NodeProvider());
  var context = {};

  @override
  void onInit() {
    change([], status: RxStatus.loading());
    getData();
    super.onInit();
  }

  Future<void> getData() async {
    final args = Get.arguments;

    if (args == null) {
      context['id'] = null;
      context['name'] = 'Facilities';
      _nodeProvider.getFacilities().then((data) {
        if (context['data'] == []) {
          change([], status: RxStatus.empty());
        }
        context['data'] = data;
        _nodeProvider.getUsers('-1').then((users) {
          context['users'] = users;
          _nodeProvider.permissionCheck('-1').then((permission) {
            context['permission'] = permission;

            change(context, status: RxStatus.success());
          });
        });
      }, onError: (error) {
        change(error, status: RxStatus.error());
      });
    } else {
      final id = args['_id'];
      context['id'] = id;
      context['name'] = args['name'];
      _nodeProvider.getAllNodes(id).then((data) {
        if (context['data'] == []) {
          change([], status: RxStatus.empty());
        }
        context['data'] = data;
        _nodeProvider.getUsers(id).then((users) =>
        {
          context['users'] = users,
          _nodeProvider.permissionCheck(id).then((permission) async {
            context['permission'] = permission;
            change(context, status: RxStatus.success());
          })
        });
      }, onError: (error) {
        change(error, status: RxStatus.error());
      });
    }
  }

  delNode(id) {
    _nodeProvider.delNode(id).then((value) {
      onInit();
    }, onError: (error) {
      print(error);
    });
  }
}
