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
          return SizedBox(
            height: 1000,
            child: ListView.builder(
              itemCount: result.data?['facilities']?.length ?? 0,
              itemBuilder: (BuildContext context, int index) {
                return NodeView(result, index);
              },
            ),
          );
        });
  }
}

