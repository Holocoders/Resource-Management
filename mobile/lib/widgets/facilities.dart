import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/base_appbar.dart';
import 'NodesGridView.dart';

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
    return Scaffold(
      appBar: BaseAppBar(
        appBar: AppBar(),
        title: const Text('Facilities'),
      ),
      body: Query(
        options: QueryOptions(document: gql(_getAllFacilities)),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {

          if (result.isLoading) {
            return const Text('Loading');
          }
          // print(result.data?['facilities']);
          return NodesGridView(result.data?['facilities']);
        },
      ),
    );
  }
}
