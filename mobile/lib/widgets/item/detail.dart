import "package:flutter/material.dart";
import 'package:graphql_flutter/graphql_flutter.dart';

class DetailView extends StatefulWidget {

  final String itemId;

  const DetailView({Key? key, required this.itemId}) : super(key: key);

  @override
  _DetailViewState createState() => _DetailViewState();
}

class _DetailViewState extends State<DetailView> {
  String getItemDetails = """
    query item(\$id: String!) {
      item(id: \$id) {
        node {
          _id
          createdBy {
            _id
            name
          }
          parent {
            _id
          }
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

    String itemId = widget.itemId;

    return Query(
        options: QueryOptions(
            document: gql(getItemDetails), variables: {'id': itemId}),
        builder: (QueryResult result,
            {VoidCallback? refetch, FetchMore? fetchMore}) {

          if (result.isLoading) {
            return Text('Loading');
          }

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
                      'http://10.0.2.2:3000/${result.data?['item']['node']['_id']}'),
                  radius: MediaQuery.of(context).size.width / 5,
                ),
                const SizedBox(height: 10),
                Center(
                    child: Text(
                      result.data?['item']['name'],
                      style: TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                    )
                ),
                const SizedBox(height: 10),
                Center(
                  child: Text(
                    'Created By: ${result.data?['item']['node']['createdBy']['name']}',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                ),
                const SizedBox(height: 10),
                Center(
                  child: Text(
                    'Rs ${result.data?['item']['price']}',
                    style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
                  ),
                ),
                const SizedBox(height: 10),
                Center(
                  child: Text(
                    'Quantity: ${result.data?['item']['quantity']}',
                  ),
                ),
                const SizedBox(height: 10),
                Center(
                  child: Text(result.data?['item']['description']),
                ),
                const SizedBox(height: 20),
              ],
            ),
          );
        });
  }
}
