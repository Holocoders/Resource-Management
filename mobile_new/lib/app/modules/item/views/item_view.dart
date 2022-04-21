import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/item/views/availability_view.dart';
import 'package:mobile_new/app/modules/item/views/detail_view.dart';
import 'package:mobile_new/app/modules/item/views/recent_view.dart';

import '../controllers/item_controller.dart';

class ItemView extends GetView<ItemController> {
  const ItemView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return controller.obx(
        (item) => Scaffold(
          appBar: AppBar(
            title: Text(item['name']),
          ),
          body: Center(
            child: SingleChildScrollView(
              child: Align(
                alignment: Alignment.topCenter,
                child: Column(
                  children: [
                    DetailView(item: item),
                    AvailabilityView(item: item),
                    RecentView(item: item),
                  ],
                ),
              ),
            ),
          ),
        )
    );
  }
}
