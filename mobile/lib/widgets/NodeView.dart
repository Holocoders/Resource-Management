import 'package:flutter/material.dart';
import 'package:resource_management_system/widgets/tags.dart';

class NodeView extends StatelessWidget {
  final _node;
  const NodeView(this._node);

  @override
  Widget build(BuildContext context) {
    return Card(
        elevation: 2,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisAlignment: MainAxisAlignment.spaceEvenly,
            children: [
              Container(
                width: double.infinity,
                color: () {
                  if (_node['node']['isItem'] == null) {
                    return Colors.green;
                  } else {
                    return _node['node']['isItem']
                        ? Colors.lightBlueAccent
                        : Colors.green;
                  }
                }(),
                child: Center(
                  child: Text(
                    _node['name'],
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ),
              ),
              Image(
                image: NetworkImage(
                    'http://10.0.2.2:3000/${_node['node']['_id']}'),
                width: 80,
                height: 80,
              ),
              () {
                if (_node['node']['isItem'] == null) {
                  return Row(
                    mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                    children: [
                      Tag('${_node['node']['categoryCount']} Categories', Colors.green),
                      Tag('${_node['node']['itemCount']} Items', Colors.lightBlue),
                    ],
                  );
                } else {
                  return _node['node']['isItem']
                      ? Tag("quantity : " + _node['quantity'].toString(), Colors.lightBlue)
                      : Row(
                          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                          children: [
                            Tag('${_node['node']['categoryCount']} Categories', Colors.green),
                            Tag('${_node['node']['itemCount']} Items', Colors.lightBlue),
                          ],
                        );
                }
              }()
            ],
          ),
        ));
  }
}

