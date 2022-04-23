import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../routes/app_pages.dart';
import '../../../widgets/snackbars.dart';
import '../providers/node_add_provider.dart';

class NodeAddController extends GetxController
    with GetSingleTickerProviderStateMixin {
  final form = GlobalKey<FormState>();

  final List<Tab> myTabs = <Tab>[
    const Tab(
      icon: Icon(Icons.auto_awesome_mosaic_outlined),
    ),
    const Tab(
      icon: Icon(Icons.inbox_outlined),
    ),
    const Tab(
      icon: Icon(Icons.folder_outlined),
    ),
  ];

  late TabController tabController;

  String name = '';
  String desc = '';
  double price = 0;
  int quantity = 0;

  var nodeType = 'Facility'.obs;

  final NodeAddProvider _nodeAddProvider = Get.put(NodeAddProvider());

  @override
  onInit() {
    final args = Get.arguments;
    if (args['id'] == null) {
      nodeType.value = 'Facility';
    } else {
      nodeType.value = 'Category';
    }

    tabController =
        TabController(vsync: this, length: myTabs.length, initialIndex: 0);
    tabController.addListener(() {
      if (tabController.indexIsChanging) {
        if (tabController.index == 0) {
          nodeType.value = 'Category';
        } else if (tabController.index == 1) {
          nodeType.value = 'Item';
        } else if (tabController.index == 2) {
          nodeType.value = 'Pack';
        }
      }
    });
    super.onInit();
  }

  submitForm(image) async {
    form.currentState?.save();
    var res;
    if (nodeType.value == 'Facility') {
      res = await _nodeAddProvider.addFacility(name, desc, image);
      Get.toNamed(Routes.NODE);
    } else {
      final id = Get.arguments['id'];

      if (nodeType.value == 'Category') {
        res = await _nodeAddProvider.addCategory(id, name, desc, image);
      } else if (nodeType.value == 'Item') {
        res = await _nodeAddProvider.addItem(
            id, name, desc, image, price, quantity);
      } else if (nodeType.value == 'Pack') {
        res = await _nodeAddProvider.addPack(
            id, name, desc, image, price, quantity);
      }

      Get.toNamed(Routes.NODE, arguments: id, preventDuplicates: false);
    }

    CustomSnackbars.success("Added Successfully");
  }
}
