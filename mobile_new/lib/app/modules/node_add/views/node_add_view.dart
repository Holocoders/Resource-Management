import 'dart:io';

import 'package:dio/dio.dart' as http;
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node_add/controllers/node_add_controller.dart';
import 'package:mobile_new/app/routes/app_pages.dart';

import '../../../services/user_service.dart';
import '../../../widgets/base_drawer.dart';
import '../../../widgets/snackbars.dart';

class NodeAddView extends StatefulWidget {
  NodeAddView({Key? key}) : super(key: key);

  @override
  State<NodeAddView> createState() => _NodeAddViewState();
}

class _NodeAddViewState extends State<NodeAddView> {
  final _form = GlobalKey<FormState>();

  File? _storedImage;

  late var name = '';

  late var description = '';

  Future<void> _takePicture() async {
    Get.defaultDialog(
      title: "Add Picture",
      content: pickAndEditImageDialog(
        context,
        onImagePicked: (image) async {
          if (image != null) {
            setState(() {
              _storedImage = image;
            });
          }
          setState(() {
            Navigator.of(Get.overlayContext!).pop();
          });
        },
      ),
    );
  }

  @override
  Widget build(BuildContext context) {
    final controller = Get.put(NodeAddController());
    final args = Get.arguments;
    return Scaffold(
      appBar: AppBar(
        title: args == null
            ? const Text('Add Facility')
            : const Text('Add Category'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _form,
          child: ListView(children: <Widget>[
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'Name',
              ),
              textInputAction: TextInputAction.next,
              onSaved: (value) {
                name = value!;
              },
            ),
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'Description',
              ),
              maxLines: 3,
              keyboardType: TextInputType.multiline,
              onSaved: (value) {
                description = value!;
              },
            ),
            TextButton.icon(
              onPressed: _takePicture,
              icon: const Icon(Icons.camera),
              label: const Text('Take Picture'),
            ),
            Container(
              padding: const EdgeInsets.all(16.0),
              width: 100,
              height: 300,
              color: Colors.grey,
              child: Center(
                child: _storedImage != null
                    ? Image.file(
                        _storedImage!,
                        fit: BoxFit.cover,
                        width: double.infinity,
                      )
                    : const Text('No image selected.'),
              ),
            ),
            TextButton.icon(
              onPressed: () {
                _form.currentState?.save();
                controller.submitForm(args, name, description, _storedImage);
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
