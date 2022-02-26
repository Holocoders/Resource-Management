import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/FacilityCategory.dart';
import 'package:resource_management_system/widgets/facilities.dart';
import 'package:resource_management_system/widgets/item/item.dart';

import 'NodeView.dart';

class NodesGridView extends StatelessWidget {
  final data;

  const NodesGridView(this.data);

  @override
  Widget build(BuildContext context) {
    return data?.length != 0
        ? GridView.builder(
            shrinkWrap: true,
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
                    Navigator.pushNamed(context, FacilityCategory.route, arguments: data[index]['node']);
                    return;
                  }
                  Navigator.pushNamed(context, Item.route, arguments: data[index]['node']['_id']);
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
