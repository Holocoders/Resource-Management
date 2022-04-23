import 'package:flutter/material.dart';
import 'package:get/get.dart';
import '../controllers/node_users_add_controller.dart';

class NodeUsersAddView extends GetView<NodeUsersAddController> {
  final _form = GlobalKey<FormState>();

  NodeUsersAddView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String? email;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add User'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _form,
          child: ListView(children: <Widget>[
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'email',
              ),
              textInputAction: TextInputAction.next,
              onSaved: (value) {
                email = value!;
              },
            ),
            TextButton.icon(
              onPressed: () {
                _form.currentState?.save();
                controller.addUser(email!);
              },
              icon: const Icon(Icons.add),
              label: const Text("Submit"),
            )
          ]),
        ),
      ),
    );
  }
}
