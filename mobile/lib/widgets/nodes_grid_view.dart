import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/facility_category.dart';
import 'package:resource_management_system/widgets/facilities.dart';
import 'package:resource_management_system/widgets/item/item.dart';

import 'node_view.dart';

class NodesGridView extends StatelessWidget {
  final data;

  const NodesGridView(this.data);

  @override
  Widget build(BuildContext context) {
    return data?.length != 0
        ? GridView.builder(
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
                  if (data[index]['node']['isItem'] == null ||
                      data[index]['node']['isItem'] == false){
                    Get.toNamed(FacilityCategory.route, arguments: data[index]['node'], preventDuplicates: false);
                    return;
                  }
                  Get.toNamed(Item.route, arguments: data[index]['node']['_id']);
                },
                splashColor: Theme.of(context).primaryColor,
                child: NodeView(data?[index]),
              );
            },
            itemCount: data?.length ?? 0,
          )
        : const Center(
            child: Text('No data found'),
          );
  }
}
