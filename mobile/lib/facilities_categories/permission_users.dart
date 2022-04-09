import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class PermissionUsers extends StatelessWidget {
  final String nodeId;

  const PermissionUsers({Key? key, this.nodeId = '-1'}) : super(key: key);

  static const _getUsers = """
  query getUsersWithPermission(\$nodeId: String!) {
          getUsersWithPermission(nodeId: \$nodeId) {
            userId {
              _id
              name
              email
            }
          }
        }
  """;

  @override
  Widget build(BuildContext context) {
    return Query(
        options: QueryOptions(
          document: gql(_getUsers),
          variables: {'nodeId': nodeId},
        ),
        builder: (QueryResult users,
            {VoidCallback? refetch, FetchMore? fetchMore}) {
          if (users.isLoading) {
            return const Center(child: CircularProgressIndicator());
          }
          return DataTable(
              columns: const [
                DataColumn(label: Text('Name')),
                DataColumn(label: Text('Email')),
              ],
              rows: List<DataRow>.generate(
                users.data!['getUsersWithPermission'].length,
                (index) {
                  return DataRow(
                    cells: [
                      DataCell(
                        Text(users.data!['getUsersWithPermission'][index]
                            ['userId']['name']),
                      ),
                      DataCell(
                        Text(users.data!['getUsersWithPermission'][index]
                            ['userId']['email']),
                      ),
                    ],
                  );
                },
              ));
        });
  }
}
