import 'package:flutter/material.dart';

class NodeView extends StatelessWidget {

  final _node;
  const NodeView(this._node);

  @override
  Widget build(BuildContext context) {
    // final facility = result.data?['facilities'][index];
    return Card(
        margin: const EdgeInsets.all(10),
        elevation: 2,
        child: Padding(
          padding: const EdgeInsets.all(10),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            children: [
              Container(
                width: double.infinity,
                color: Colors.lightGreen,
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
                width: 100,
                height: 100,
              ),
              Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.lightGreen,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(4),
                      child: Text(
                        '${_node['node']['categoryCount']} Categories',
                        style: Theme.of(context).textTheme.bodyText1,
                      ),
                    ),
                  ),
                  Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(10),
                      color: Colors.lightBlueAccent,
                    ),
                    child: Padding(
                      padding: const EdgeInsets.all(4),
                      child: Text(
                        '${_node['node']['itemCount']} Items',
                        style: Theme.of(context).textTheme.bodyText1,
                      ),
                    ),
                  ),
                ],
              ),
            ],
          ),
        ));
  }
}
