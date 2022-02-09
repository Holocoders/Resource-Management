import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

import 'NodeView.dart';

class Facilities extends StatelessWidget {
  const Facilities({Key? key}) : super(key: key);

  static const String _getAllFacilities = """
    query facilities {
          facilities {
            node {
              _id
              categoryCount
              itemCount
            }
            name
            description
          }
        }
  """;

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(document: gql(_getAllFacilities)),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (result.isLoading) {
            return const Text('Loading');
          }
          // print(result.data?['facilities']);
          return GridView.builder(
            shrinkWrap: true,
            gridDelegate: const SliverGridDelegateWithMaxCrossAxisExtent(
              maxCrossAxisExtent: 400,
              childAspectRatio: 2 / 1,
              crossAxisSpacing: 20,
              mainAxisSpacing: 20,
            ),
            itemBuilder: (context, index) {
              return NodeView(result, index);
            },
            itemCount: result.data?['facilities']?.length ?? 0,
          );
        });
  }
}
