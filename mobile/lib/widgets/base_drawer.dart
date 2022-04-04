import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:resource_management_system/facilities_categories/facilities.dart';

import '../activities/activities.dart';

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
                    backgroundImage:
                        NetworkImage('https://picsum.photos/200/300'),
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
            child: Column(children: [
              ListTile(
                leading: const Icon(Icons.home),
                title: const Text('Facilities'),
                onTap: () {
                  Get.toNamed(Facilities.route);
                },
              ),
              ListTile(
                leading: const Icon(Icons.calendar_today),
                title: const Text('My activities'),
                onTap: () {
                  Get.toNamed(Activities.route);
                },
              ),
            ]),
          )
        ],
      ),
    );
  }
}
