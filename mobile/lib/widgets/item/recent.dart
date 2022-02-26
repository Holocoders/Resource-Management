import 'package:flutter/material.dart';

class RecentView extends StatefulWidget {

  final Map<String, dynamic> item;
  const RecentView({Key? key, required this.item}) : super(key: key);

  @override
  _RecentViewState createState() => _RecentViewState();
}

class _RecentViewState extends State<RecentView> {
  @override
  Widget build(BuildContext context) {
    return Column(
      children: [
        const SizedBox(height: 20),
        const Text(
            'Also got with',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            )
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Card(
              child: Column(
                children: [
                  Image.network(
                    'https://picsum.photos/200/300',
                    width: MediaQuery.of(context).size.width * 0.4,
                  ),
                  const SizedBox(height: 10),
                  const Text('Item 1'),
                  const SizedBox(height: 10),
                ],
              ),
            ),
            Card(
              child: Column(
                children: [
                  Image.network(
                    'https://picsum.photos/200/300',
                    width: MediaQuery.of(context).size.width * 0.4,
                  ),
                  const SizedBox(height: 10),
                  const Text('Item 1'),
                  const SizedBox(height: 10),
                ],
              ),
            ),
          ],
        ),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Card(
              child: Column(
                children: [
                  Image.network(
                    'https://picsum.photos/200/300',
                    width: MediaQuery.of(context).size.width * 0.4,
                  ),
                  const SizedBox(height: 10),
                  const Text('Item 1'),
                  const SizedBox(height: 10),
                ],
              ),
            ),
            Card(
              child: Column(
                children: [
                  Image.network(
                    'https://picsum.photos/200/300',
                    width: MediaQuery.of(context).size.width * 0.4,
                  ),
                  const SizedBox(height: 10),
                  const Text('Item 1'),
                  const SizedBox(height: 10),
                ],
              ),
            ),
          ],
        ),
      ],
    );
  }
}
