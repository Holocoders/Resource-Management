import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'no_item_found.dart';

class GqlQuery extends StatelessWidget {
  final String query;
  final variables;
  final Function child;

  const GqlQuery({
    Key? key,
    required this.query,
    this.variables = const <String, dynamic>{},
    required this.child,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
          document: gql(query),
          variables: variables,
        ),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (result.hasException) {
            return Text(result.exception.toString());
          }
          if (result.isLoading) {
            return const Center(
              child: CircularProgressIndicator(),
            );
          }
          return child(result);
        });
  }
}
