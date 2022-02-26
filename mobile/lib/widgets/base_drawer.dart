import 'package:flutter/material.dart';
import 'package:resource_management_system/widgets/facilities.dart';

class BaseDrawer extends StatelessWidget {
  const BaseDrawer({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Drawer(
      child: ListView(
        // Important: Remove any padding from the ListView.
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
            ),
            child: Center(
              child: Column(
                children: const [
                  CircleAvatar(
                    backgroundImage: NetworkImage('https://picsum.photos/200/300'),
                    radius: 40,
                  ),
                  SizedBox(height: 15),
                  Text(
                    'John Doe',
                    style: TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            alignment: Alignment.center,
            child: Column(
              children: [
                ListTile(
                  leading: Icon(Icons.home),
                  title: Text('Facilities'),
                  onTap: () {
                    Navigator.pushNamed(context, Facilities.route);
                  },
                ),
                ListTile(
                  leading: Icon(Icons.settings),
                  title: Text('My activities'),
                  onTap: () {
                    Navigator.pop(context);
                  },
                ),
              ]
            ),
          )
        ],
      ),
    );
  }
}
