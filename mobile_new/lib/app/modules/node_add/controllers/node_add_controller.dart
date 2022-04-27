import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';

import '../../../widgets/snackbars.dart';
import '../providers/node_add_provider.dart';

class NodeAddController extends GetxController
    with GetSingleTickerProviderStateMixin {
  final form = GlobalKey<FormState>();

  final List<Tab> myTabs = <Tab>[
    const Tab(
      icon: Icon(Icons.auto_awesome_mosaic_outlined),
      text: 'Category',
    ),
    const Tab(
      icon: Icon(Icons.inbox_outlined),
      text: 'Item',
    ),
    const Tab(
      icon: Icon(Icons.folder_outlined),
      text: 'Pack',
    ),
  ];

  late TabController tabController;

  String name = '';
  String desc = '';
  double price = 0;
  int quantity = 0;
  bool buy = false;
  bool rent = false;

  var nodeType = 'Facility'.obs;
  var items = [].obs;

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
    try {
      if (nodeType.value == 'Facility') {
        res = await _nodeAddProvider.addFacility(name, desc, image);
        // Get.toNamed(Routes.NODE);
      } else {
        final id = Get.arguments['id'];

        if (nodeType.value == 'Category') {
          res = await _nodeAddProvider.addCategory(id, name, desc, image);
        } else if (nodeType.value == 'Item') {
          String allowedItemActvities = 'BOTH';
          if (buy && !rent) {
            allowedItemActvities = 'BUY';
          } else if (rent && !buy) {
            allowedItemActvities = 'RENT';
          }
          res = await _nodeAddProvider.addItem(
              id, name, desc, image, price, quantity, allowedItemActvities);
        } else if (nodeType.value == 'Pack') {
          String allowedItemActvities = 'BOTH';
          if (buy && !rent) {
            allowedItemActvities = 'BUY';
          } else if (rent && !buy) {
            allowedItemActvities = 'RENT';
          }
          final packItems = items
              .map((element) => {
                    'item': element['node']['_id'].toString(),
                    'quantity': element['quantity']
                  })
              .toList();
          res = await _nodeAddProvider.addPack(id, name, desc, image, price,
              quantity, packItems, allowedItemActvities);
        }
        // Get.toNamed(Routes.NODE, arguments: id, preventDuplicates: false);
      }
      Get.back(result: true);
    } catch (e) {
      print(e);
    }

    CustomSnackbars.success("Added Successfully");
  }

  getSuggestion(pattern) async {
    return await _nodeAddProvider.searchItems(pattern);
  }
}
