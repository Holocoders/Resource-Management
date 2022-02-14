import 'package:flutter/material.dart';
import 'package:resource_management_system/widgets/item/availability.dart';
import 'package:resource_management_system/widgets/item/detail.dart';
import 'package:resource_management_system/widgets/item/recent.dart';

class Item extends StatefulWidget {

  final String itemId;

  const Item({Key? key, required this.itemId}) : super(key: key);

  @override
  _ItemState createState() => _ItemState();
}

class _ItemState extends State<Item> {
  @override
  Widget build(BuildContext context) {
    return Scaffold(
      appBar: AppBar(
        title: Text('Item'),
      ),
      body: SingleChildScrollView(
        child: Align(
          alignment: Alignment.topCenter,
          child: Column(
            children: [
              DetailView(itemId: widget.itemId),
              AvailabilityView(),
              RecentView()
            ],
          ),
        ),
      ),
    );
  }
}
