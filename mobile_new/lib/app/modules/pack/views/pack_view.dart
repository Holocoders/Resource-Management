import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import '../../../widgets/base_appbar.dart';
import '../../../widgets/base_drawer.dart';
import '../../item/views/availability_view.dart';
import '../../item/views/detail_view.dart';
import '../controllers/pack_controller.dart';
import 'pack_items.dart';

class PackView extends GetView<PackController> {
  @override
  Widget build(BuildContext context) {
    return controller.obx(
        (pack) => Scaffold(
          drawer: const BaseDrawer(),
          appBar: BaseAppBar(
            title: const Text('Pack'),
            appBar: AppBar(),
          ),
          body: SingleChildScrollView(
            child: Align(
              alignment: Alignment.topCenter,
              child: Column(
                children: [
                  DetailView(item: pack),
                  PackItems(item: pack),
                  AvailabilityView(item: pack),
                ],
              ),
            ),
          ),
        )
    );
  }
}
