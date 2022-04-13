import 'dart:io';
import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:get/get.dart' as getx;
import 'package:image_picker/image_picker.dart';
import 'package:resource_management_system/facilities_categories/facilities.dart';

import '../auth/user_service.dart';
import 'facility_category.dart';

class FacilityCategoryAdd extends StatefulWidget {
  const FacilityCategoryAdd({Key? key}) : super(key: key);
  static const String route = '/facilityCategoryAdd';

  @override
  State<FacilityCategoryAdd> createState() => _FacilityCategoryAddState();
}

class _FacilityCategoryAddState extends State<FacilityCategoryAdd> {
  final _form = GlobalKey<FormState>();
  File? _storedImage;
  late var name = '';
  late var description = '';

  Future<void> _takePicture() async {
    final picker = ImagePicker();
    final imageFile = await picker.pickImage(source: ImageSource.camera);
    setState(() {
      _storedImage = File(imageFile!.path);
    });
  }

  _addFacility(name, desc, file) async {
    var dio = Dio();
    dio.options.headers['Authorization'] =
        'Bearer ' + getx.Get.find<UserService>().user.value.token;
    FormData formData = FormData.fromMap({
      "operations":
          '{ "query": "mutation (\$createFacilityInput: CreateFacilityInput!, \$file: Upload!) { createFacility(file: \$file, createFacilityInput: \$createFacilityInput) { node { _id itemCount categoryCount } name description } }", "variables": { "file": null, "createFacilityInput": {"name": "$name", "description": "$desc"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": await MultipartFile.fromFile(
        file.path,
        filename: "image.jpg",
      ),
    });
    return dio.post('http://10.0.2.2:3000/graphql', data: formData);
  }

  _addCategory(id, name, desc, file) async {
    var dio = Dio();
    dio.options.headers['Authorization'] =
        'Bearer ' + getx.Get.find<UserService>().user.value.token;
    FormData formData = FormData.fromMap({
      "operations":
          '{ "query": "mutation (\$createCategoryInput: CreateCategoryInput!, \$file: Upload!) { createCategory(file: \$file, createCategoryInput: \$createCategoryInput) { node { _id itemCount } name description } }", "variables": { "file": null, "createCategoryInput": {"id": "$id", "name": "$name", "description": "$desc"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": await MultipartFile.fromFile(
        file.path,
        filename: "image.png",
      ),
    });
    return dio.post('http://10.0.2.2:3000/graphql', data: formData);
  }

  _submitForm(id) async {
    _form.currentState?.save();
    final res;
    if (id == '-1') {
      res = await _addFacility(name, description, _storedImage);
      getx.Get.toNamed(Facilities.route);
    } else {
      res = await _addCategory(id, name, description, _storedImage);
      getx.Get.toNamed(FacilityCategory.route,
          arguments: {
            'node': {
              '_id': id,
            },
            'name': name,
          },
          preventDuplicates: false);
    }
  }

  @override
  Widget build(BuildContext context) {
    final facilityId = ModalRoute.of(context)!.settings.arguments as String;
    return Scaffold(
      appBar: AppBar(
        title: facilityId == '-1'
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
                _submitForm(facilityId);
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
