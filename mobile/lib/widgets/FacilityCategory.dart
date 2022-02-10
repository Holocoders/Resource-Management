import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'NodesGridView.dart';

class FacilityCategory extends StatelessWidget {
  final data;

  const FacilityCategory(this.data, {Key? key}) : super(key: key);

  final String _getAllCategories = """
    query childCategories(\$id: String!) {
        childCategories(id: \$id) {
          node {
            _id
            categoryCount
            itemCount
            isItem
          }
          description
          name
        }
      }
  """;

  final String _getAllItems = """
    query childItems(\$id: String!) {
        childItems(id: \$id) {
          node {
            _id
            categoryCount
            itemCount
            isItem
          }
          description
          name
          price
          quantity
        }
      }
  """;

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: const Text('Category'),
      ),
      body: Query(
        options: QueryOptions(
            document: gql(_getAllCategories),
            variables: {'id': data?['node']?['_id']}),
        builder: (QueryResult categories,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (categories.isLoading) {
            return const Text('Loading');
          }
          return Query(
              options: QueryOptions(
                  document: gql(_getAllItems),
                  variables: {'id': data?['node']?['_id']}),
              builder: (QueryResult items,
                  {VoidCallback? refetch, FetchMore? fetchMore}) {
                if (items.isLoading) {
                  return const Text('Loading');
                }
                var nodes = [...categories.data?['childCategories'], ...items.data?['childItems']];
                return NodesGridView(nodes);
              });
        },
      ),
    );
  }
}
