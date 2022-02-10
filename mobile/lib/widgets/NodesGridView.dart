import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/FacilityCategory.dart';
import 'package:resource_management_system/widgets/item/item.dart';

import 'NodeView.dart';

class NodesGridView extends StatelessWidget {
  final data;

  const NodesGridView(this.data);

  @override
  Widget build(BuildContext context) {
    return GridView.builder(
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 400,
        childAspectRatio: 2 / 1,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
      ),
      itemBuilder: (context, index) {
        return InkWell(
          onTap: () {
            Navigator.push(
              context,
              MaterialPageRoute(
                builder: (context) {
                  if (data[index]['node']['isItem'] == null || data[index]['node']['isItem'] == false ) {
                    return FacilityCategory(data[index]);
                  }
                   return Item(itemId: data[index]['node']['_id']);
                } ,
              ),
            );
          },
          splashColor: Theme.of(context).primaryColor,
          child: NodeView(data?[index]),
        );
      },
      itemCount: data?.length ?? 0,
    );
  }
}
