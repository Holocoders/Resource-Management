import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/item/bindings/item_binding.dart';
import 'package:mobile_new/app/modules/item/views/item_view.dart';
import 'package:mobile_new/app/modules/node/bindings/node_binding.dart';
import 'package:mobile_new/app/modules/node/controllers/node_controller.dart';
import 'package:mobile_new/app/modules/node/views/node_view.dart';
import 'package:mobile_new/app/modules/node/views/single_node_view.dart';
import 'package:mobile_new/app/modules/pack/bindings/pack_binding.dart';
import 'package:mobile_new/app/modules/pack/views/pack_view.dart';

class NodeGridView extends GetView {
  final NodeController controller;

  NodeGridView({Key? key, required this.controller}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    var data = controller.context['data'];
    return RefreshIndicator(
      displacement: 50,
      backgroundColor: Colors.greenAccent,
      color: Colors.green,
      strokeWidth: 3,
      triggerMode: RefreshIndicatorTriggerMode.anywhere,
      onRefresh: () {
        print("refreshing");
        return controller.getData();
      },
      child: GridView.builder(
        itemCount: data.length,
        shrinkWrap: true,
        padding: const EdgeInsets.only(top: 10, bottom: 10),
        gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
          maxCrossAxisExtent: 500,
          childAspectRatio: 3 / 2,
          crossAxisSpacing: 20,
          mainAxisSpacing: 20,
        ),
        itemBuilder: (context, index) {
          return InkWell(
            onTap: () {
              var nodeType = data[index]['node']['type'];
              if (nodeType == 'ITEM') {
                Get.to(() => ItemView(),
                    arguments: data[index]['node']['_id'],
                    preventDuplicates: false,
                    binding: ItemBinding(tag: data[index]['node']['_id']));
              } else if (nodeType == 'PACK') {
                Get.to(() => PackView(),
                    arguments: data[index]['node']['_id'],
                    preventDuplicates: false,
                    binding: PackBinding(tag: data[index]['node']['_id']));
              } else {
                Get.to(
                      () => NodeView(),
                  arguments: {
                    'name': data[index]['name'],
                    '_id': data[index]['node']['_id']
                  },
                  preventDuplicates: false,
                  binding: NodeBinding(tag: data[index]['node']['_id']),
                );
              }
            },
            child: SingleNodeView(data, index, controller.onDelete),
          );
        },
      ),
    );
  }
}
