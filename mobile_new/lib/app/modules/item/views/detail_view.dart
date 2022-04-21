import "package:flutter/material.dart";
import 'package:graphql_flutter/graphql_flutter.dart';

class DetailView extends StatefulWidget {
  final Map<String, dynamic> item;

  const DetailView({Key? key, required this.item}) : super(key: key);

  @override
  _DetailViewState createState() => _DetailViewState();
}

class _DetailViewState extends State<DetailView> {
  @override
  Widget build(BuildContext context) {
    return Card(
      color: Colors.white60,
      margin: const EdgeInsets.all(8),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(16)),
      ),
      child: Column(
        crossAxisAlignment: CrossAxisAlignment.stretch,
        mainAxisSize: MainAxisSize.min,
        children: <Widget>[
          const SizedBox(height: 10),
          CircleAvatar(
            backgroundImage: NetworkImage(
                'http://10.0.2.2:3000/${widget.item['node']['_id']}'),
            radius: MediaQuery.of(context).size.width / 5,
          ),
          const SizedBox(height: 10),
          Center(
              child: Text(
            widget.item['name'],
            style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
          )),
          const SizedBox(height: 10),
          Center(
            child: Text(
              'Created By: ${widget.item['node']['createdBy']['name']}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          const SizedBox(height: 10),
          Center(
            child: Text(
              'Rs ${widget.item['price']}',
              style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
            ),
          ),
          const SizedBox(height: 10),
          Center(
            child: Text(
              'Quantity: ${widget.item['quantity']}',
            ),
          ),
          const SizedBox(height: 10),
          Center(
            child: Text(widget.item['description']),
          ),
          const SizedBox(height: 20),
        ],
      ),
    );
  }
}
