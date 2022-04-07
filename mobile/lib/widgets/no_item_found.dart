import 'package:flutter/material.dart';

import 'base_appbar.dart';
import 'base_drawer.dart';

class NoItemFound extends StatelessWidget {
  const NoItemFound({
    Key? key,
  }) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      drawer: BaseDrawer(),
      appBar: BaseAppBar(
        appBar: AppBar(),
        title: const Text('Facilities'),
      ),
      body: const Center(
        child: Text('No items found'),
      ),
    );
  }
}
