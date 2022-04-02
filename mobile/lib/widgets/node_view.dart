import 'package:flutter/material.dart';

class NodeView extends StatelessWidget {
  final _node;
  const NodeView(this._node);

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
                  borderRadius: const BorderRadius.only(topLeft: Radius.circular(15), topRight: Radius.circular(15)),
                  color: () {
                    var nodeType = _node['node']['type'];
                    if (nodeType == 'ITEM') {
                      return Colors.lightBlueAccent;
                    }
                    return Colors.green;
                  }()
              ),
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
                          builder: (context){
                            return AlertDialog(
                              title: const Text('Description'),
                              content: Text(_node['description']),
                            );
                          }
                      ),
                      icon: const Icon(Icons.info_outline_rounded),
                    ),
                  )
                ],
              ),
            ),
            Image(
              image: NetworkImage(
                  'http://10.0.2.2:3000/${_node['node']['_id']}'),
              width: 80,
              height: 80,
            ),
                () {
              var nodeType = _node['node']['type'];
              if (nodeType == 'ITEM') {
                Chip(
                  label: Text('Quantity : ${_node['quantity']}'),
                  backgroundColor: Colors.blueAccent,
                );
              }
              return Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Chip(
                    label: Text(
                        '${_node['node']['categoryCount']} Categories'),
                    backgroundColor: Colors.green,
                  ),
                  Chip(
                    label: Text('${_node['node']['itemCount']} Items'),
                    backgroundColor: Colors.lightBlue,
                  ),
                ],
              );
            }(),
            const SizedBox(height: 10,)
          ],
        ),
    );
  }
}
