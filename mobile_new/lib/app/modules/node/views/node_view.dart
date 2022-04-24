import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node/views/node_grid_view.dart';
import 'package:mobile_new/app/modules/node/views/node_users_view.dart';
import 'package:mobile_new/app/routes/app_pages.dart';
import 'package:mobile_new/app/widgets/base_drawer.dart';

import '../../../widgets/base_appbar.dart';
import '../controllers/node_controller.dart';
import '../controllers/tab_controller.dart';

class NodeView extends GetView<NodeController> {
  late final String? uniqueTag;

  @override
  String? get tag => uniqueTag;

  NodeView({Key? key}) : super(key: key) {
    final args = Get.arguments;
    if (args != null) {
      uniqueTag = args['_id'];
    } else {
      uniqueTag = null;
    }
  }

  @override
  Widget build(BuildContext context) {
    final NodeTabController _tabx = Get.put(NodeTabController());
    _tabx.reset();
    return controller.obx(
      (value) => Scaffold(
        drawer: const BaseDrawer(),
        appBar: BaseAppBar(
          title: Text(value['name'] ?? "Facilities"),
          appBar: AppBar(),
          bottom: TabBar(
            controller: _tabx.controller,
            tabs: _tabx.myTabs,
          ),
        ),
        body: TabBarView(
          controller: _tabx.controller,
          children: [
            value['data'].length > 0
                ? NodeGridView(
                    data: value['data'],
                    onDelete: (id) {
                      controller.delNode(id);
                    })
                : const Center(child: Text("No data")),
            value['users'].length > 0
                ? NodeUsersView(value['users'])
                : const Center(child: Text("No data")),
          ],
        ),
        floatingActionButton: FloatingActionButton(
          onPressed: () {
            if (_tabx.currentPage.value == 0) {
              Get.toNamed(
                Routes.NODE_ADD,
                arguments: {'id': value['id'], 'name': value['name']},
              );
            } else {
              Get.toNamed(
                Routes.NODE_USERS_ADD,
                arguments: value['id'],
              );
            }
          },
          child: const Icon(
            Icons.add,
          ),
        ),
      ),
    );
  }
}
