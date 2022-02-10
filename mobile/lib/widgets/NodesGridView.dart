import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'NodeView.dart';

class NodesGridView extends StatelessWidget {
  final data;

  const NodesGridView(this.data);

  @override
  Widget build(BuildContext context) {
    const _type = 'facilities';
    return GridView.builder(
      shrinkWrap: true,
      gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
        maxCrossAxisExtent: 400,
        childAspectRatio: 2 / 1,
        crossAxisSpacing: 20,
        mainAxisSpacing: 20,
      ),
      itemBuilder: (context, index) {
        return NodeView(data?[_type][index]);
      },
      itemCount: data?[_type]?.length ?? 0,
    );
  }
}
