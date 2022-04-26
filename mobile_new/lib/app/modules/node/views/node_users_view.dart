import 'package:flutter/material.dart';

import 'package:get/get.dart';

class NodeUsersView extends GetView {
  final users;

  const NodeUsersView(this.users, {Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Card(
      child: DataTable(
        columns: const [
          DataColumn(label: Text('Name')),
          DataColumn(label: Text('Email')),
        ],
        rows: List<DataRow>.generate(
          users.length,
          (index) {
            return DataRow(
              cells: [
                DataCell(
                  Text(users[index]['userId']['name']),
                ),
                DataCell(
                  Text(users[index]['userId']['email']),
                ),
              ],
            );
          },
        ),
      ),
    );
  }
}
