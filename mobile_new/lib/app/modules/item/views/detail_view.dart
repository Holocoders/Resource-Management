import "package:flutter/material.dart";

class DetailView extends StatelessWidget {
  final Map<String, dynamic> item;

  const DetailView({Key? key, required this.item}) : super(key: key);
  
  @override
  Widget build(BuildContext context) {
    return Card(
      margin: const EdgeInsets.all(8),
      shape: const RoundedRectangleBorder(
        borderRadius: BorderRadius.all(Radius.circular(16)),
      ),
      child: Padding(
        padding: const EdgeInsets.all(16),
        child: Column(
          children: <Widget>[
            const SizedBox(height: 10),
            CircleAvatar(
              backgroundImage: NetworkImage(
                  'http://10.0.2.2:3000/${item['node']['_id']}'),
              radius: MediaQuery.of(context).size.width / 7,
            ),
            const SizedBox(height: 10),
            Center(
                child: Text(
                  item['name'],
                  style: const TextStyle(fontSize: 20, fontWeight: FontWeight.bold),
                )),
            const SizedBox(height: 10),
            Center(
              child: Text(
                'Created By: ${item['node']['createdBy']['name']}',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
            ),
            const SizedBox(height: 10),
            Center(
              child: Text(
                'Rs ${item['price']}',
                style: const TextStyle(fontSize: 16, fontWeight: FontWeight.w600),
              ),
            ),
            const SizedBox(height: 10),
            Center(
              child: Text(
                'Quantity: ${item['quantity']}',
              ),
            ),
            const SizedBox(height: 10),
            Center(
              child: Text(item['description']),
            ),
            const SizedBox(height: 20),
          ],
        ),
      ),
    );
  }
}
