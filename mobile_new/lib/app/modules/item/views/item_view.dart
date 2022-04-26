import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/item/controllers/recent_controller.dart';
import 'package:mobile_new/app/modules/item/views/availability_view.dart';
import 'package:mobile_new/app/modules/item/views/detail_view.dart';
import 'package:mobile_new/app/modules/item/views/recent_view.dart';
import 'package:mobile_new/app/modules/item/controllers/item_controller.dart';
import 'package:mobile_new/app/widgets/base_appbar.dart';
import 'package:mobile_new/app/widgets/base_drawer.dart';

class ItemView extends GetView<ItemController> {

  late final String? uniqueTag;

  @override
  String? get tag => uniqueTag;

  ItemView({Key? key}) : super(key: key) {
    Get.lazyPut<RecentController>(() => RecentController());
    final id = Get.arguments;
    uniqueTag = id.toString();
  }

  @override
  Widget build(BuildContext context) {
    return controller.obx(
        (item) => Scaffold(
          drawer: const BaseDrawer(),
          appBar: BaseAppBar(
            title: Text(item['name']),
            appBar: AppBar(),
          ),
          body: Center(
            child: SingleChildScrollView(
              child: Align(
                alignment: Alignment.topCenter,
                child: Column(
                  children: [
                    DetailView(item: item),
                    AvailabilityView(item: item),
                    RecentView(),
                  ],
                ),
              ),
            ),
          ),
        )
    );
  }
}
