import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'NodesGridView.dart';
import 'base_appbar.dart';

class FacilityCategory extends StatelessWidget {
  const FacilityCategory({Key? key}) : super(key: key);

  static const String route = '/category';

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

    final data = ModalRoute.of(context)!.settings.arguments as Map<String, dynamic>;

    return Scaffold(
      appBar: BaseAppBar(
        title: Text('Category'),
        appBar: AppBar(),
      ),
      body: Query(
        options: QueryOptions(
            document: gql(_getAllCategories),
            variables: {'id': data['_id']}),
        builder: (QueryResult categories,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (categories.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          return Query(
              options: QueryOptions(
                  document: gql(_getAllItems),
                  variables: {'id': data['_id']}),
              builder: (QueryResult items,
                  {VoidCallback? refetch, FetchMore? fetchMore}) {
                if (items.isLoading) {
                  return const Center(child: CircularProgressIndicator());
                }
                var nodes = [...categories.data?['childCategories'], ...items.data?['childItems']];
                return NodesGridView(nodes);
              });
        },
      ),
    );
  }
}
