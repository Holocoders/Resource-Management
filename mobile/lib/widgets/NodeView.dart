import 'package:flutter/material.dart';

class NodeView extends StatelessWidget {

  final result;
  final int index;
  const NodeView(this.result, this.index);

  @override
  Widget build(BuildContext context) {
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
                    result.data!['facilities'][index]['name'],
                    style: Theme.of(context).textTheme.headline6,
                  ),
                ),
              ),
              Image(
                image: NetworkImage(
                    'http://10.0.2.2:3000/${result.data?['facilities'][index]['node']['_id']}'),
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
                        '${result.data!['facilities'][index]['node']['categoryCount']} Categories',
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
                        '${result.data!['facilities'][index]['node']['itemCount']} Items',
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
