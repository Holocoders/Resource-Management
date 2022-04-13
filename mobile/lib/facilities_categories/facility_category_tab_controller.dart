import 'package:flutter/material.dart';
import 'package:get/get.dart';

class FacilityCategoryTabController extends GetxController
    with GetSingleTickerProviderStateMixin {
  final List<Tab> myTabs = <Tab>[
    const Tab(
      icon: Icon(Icons.list),
    ),
    const Tab(
      icon: Icon(Icons.people),
    ),
  ];

  late TabController controller;
  RxInt currentPage = 0.obs;

  @override
  void onInit() {
    super.onInit();
    controller =
        TabController(vsync: this, length: myTabs.length, initialIndex: 0);
    controller.addListener(() {
      currentPage.value = controller.index;
    });
  }

  @override
  void onClose() {
    controller.dispose();
    super.onClose();
  }

  Future<void> reset() async {
    WidgetsBinding.instance?.addPostFrameCallback((_) {
      controller.index = 0;
      currentPage.value = 0;
    });
  }
}
