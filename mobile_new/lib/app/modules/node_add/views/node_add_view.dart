import 'dart:io';

import 'package:dio/dio.dart' as http;
import 'package:flutter/material.dart';

import 'package:get/get.dart';
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

  _addFacility(name, desc, file) async {
    var dio = http.Dio();
    dio.options.headers['Authorization'] =
        'Bearer ' + Get.find<UserService>().user.value.token;
    http.FormData formData = http.FormData.fromMap({
      "operations":
          '{ "query": "mutation (\$createFacilityInput: CreateFacilityInput!, \$file: Upload!) { createFacility(file: \$file, createFacilityInput: \$createFacilityInput) { node { _id itemCount categoryCount } name description } }", "variables": { "file": null, "createFacilityInput": {"name": "$name", "description": "$desc"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": http.MultipartFile.fromFileSync(
        file.path,
        filename: file.path.split('/').last,
      ),
    });
    return dio.post('http://10.0.2.2:3000/graphql', data: formData);
  }

  _addCategory(id, name, desc, file) async {
    var dio = http.Dio();
    dio.options.headers['Authorization'] =
        'Bearer ' + Get.find<UserService>().user.value.token;
    http.FormData formData = http.FormData.fromMap({
      "operations": """
          mutation createCategory (\$createCategoryInput: CreateCategoryInput!, \$file: Upload!) {
            createCategory (createCategoryInput: \$createCategoryInput, file: \$file) {
              node {
                _id
                createdBy {
                  _id
                  email
                  name
                }
                type
                itemCount
                categoryCount
              }
              description
              name
          }
      }, "variables": { "file": null, "createFacilityInput": {"parent", "$id", "name": "$name", "description": "$desc"} } }
          """,
      "map": '{ "file": ["variables.file"] }',
      "file": http.MultipartFile.fromFileSync(
        file.path,
        filename: file.path.split('/').last,
      ),
    });
    return dio.post('http://10.0.2.2:3000/graphql', data: formData);
  }

  _submitForm(args) async {
    _form.currentState?.save();
    var res;
    if (args == null) {
      res = await _addFacility(name, description, _storedImage);
      CustomSnackbars.success("Added Successfully");
      Get.toNamed(Routes.NODE);
    } else {
      final id = args['id'];
      res = await _addCategory(id, name, description, _storedImage);
      CustomSnackbars.success("Added Successfully");
      Get.toNamed(Routes.NODE, arguments: id, preventDuplicates: false);
    }
  }

  @override
  Widget build(BuildContext context) {
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
                _submitForm(args);
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
