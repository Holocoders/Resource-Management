import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:resource_management_system/facilities_categories/node_controller.dart';
import 'package:resource_management_system/item/pack.dart';

import '../facility_category.dart';
import '../../item/item.dart';
import 'node_view.dart';

class NodesGridView extends StatelessWidget {
  final _nodeController = Get.find<NodeController>();
  final data;

  NodesGridView({Key? key, required this.data}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return data.length > 0
        ? GridView.builder(
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
                    Get.toNamed(Item.route,
                        arguments: data[index]['node']['_id']);
                    return;
                  } else if (nodeType == 'PACK') {
                    Get.toNamed(Pack.route,
                        arguments: data[index]['node']['_id']);
                    return;
                  }
                  Get.toNamed(FacilityCategory.route,
                      arguments: data[index], preventDuplicates: false);
                },
                child: NodeView(
                  data,
                  index,
                ),
              );
            },
          )
        : const Center(
            child: Text('No data found'),
          );
  }
}
