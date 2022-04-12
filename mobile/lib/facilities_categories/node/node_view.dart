import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/theme/theme_manager.dart';

import '../../widgets/snackbars.dart';

class NodeView extends StatelessWidget {
  final _node;
  final bool editable;
  final String _deleteMutation = """
    mutation removeNode(\$id: String!) {
      removeNode(id: \$id) {
        _id
      }
    }
  """;

  const NodeView(this._node, {this.editable = false});

  @override
  Widget build(BuildContext context) {
    return Card(
      elevation: 2,
      margin: const EdgeInsets.only(top: 10, left: 5, right: 5),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.center,
        mainAxisAlignment: MainAxisAlignment.spaceBetween,
        children: [
          Container(
            width: double.infinity,
            decoration: BoxDecoration(
                borderRadius: const BorderRadius.only(
                    topLeft: Radius.circular(15),
                    topRight: Radius.circular(15)),
                color: () {
                  var nodeType = _node['node']['type'];
                  if (nodeType == 'ITEM') {
                    return ThemeManager.theme.itemColor;
                  } else if (nodeType == 'PACK') {
                    return ThemeManager.theme.packColor;
                  } else if (_node['__typename'] == 'Facility') {
                    return ThemeManager.theme.facilityColor;
                  } else {
                    return ThemeManager.theme.categoryColor;
                  }
                }()),
            child: Row(
              mainAxisAlignment: MainAxisAlignment.spaceBetween,
              children: [
                const Spacer(
                  flex: 1,
                ),
                Flexible(
                  flex: 3,
                  child: Text(
                    _node['name'],
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ),
                Flexible(
                  fit: FlexFit.loose,
                  flex: 1,
                  child: IconButton(
                    onPressed: () => showDialog(
                        context: context,
                        builder: (context) {
                          return AlertDialog(
                            title: const Text('Description'),
                            content: Text(_node['description']),
                          );
                        }),
                    icon: const Icon(Icons.info_outline_rounded),
                  ),
                )
              ],
            ),
          ),
          Image(
            image: NetworkImage('http://10.0.2.2:3000/${_node['node']['_id']}'),
            width: 80,
            height: 80,
          ),
          () {
            var nodeType = _node['node']['type'];
            if (nodeType == 'ITEM') {
              Chip(
                label: Text('Quantity : ${_node['quantity']}'),
                backgroundColor: ThemeManager.theme.itemColor,
              );
            }
            return Row(
              mainAxisAlignment: MainAxisAlignment.spaceEvenly,
              children: [
                Chip(
                  label: Text('${_node['node']['categoryCount']} Categories'),
                  backgroundColor: ThemeManager.theme.categoryColor,
                ),
                Chip(
                  label: Text('${_node['node']['itemCount']} Items'),
                  backgroundColor: ThemeManager.theme.itemColor,
                ),
              ],
            );
          }(),
          const SizedBox(
            height: 2,
          ),
          editable
              ? Mutation(
                  options: MutationOptions(
                    document: gql(_deleteMutation),
                    onCompleted: (dynamic result) async {
                      print(result);
                    },
                    onError: (OperationException? error) {
                      CustomSnackbars.error(
                          error?.graphqlErrors.first.message ??
                              'Unable to delete!');
                    },
                  ),
                  builder: (RunMutation runMutation, QueryResult? result) {
                    return IconButton(
                      icon: const Icon(
                        Icons.delete,
                        color: Colors.red,
                      ),
                      onPressed: () {
                        runMutation({
                          'id': _node['node']['_id'],
                        });
                      },
                    );
                  },
                )
              : Container(),
        ],
      ),
    );
  }
}
