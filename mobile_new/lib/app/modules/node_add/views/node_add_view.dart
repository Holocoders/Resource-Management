import 'dart:io';
import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node_add/controllers/node_add_controller.dart';
import 'package:mobile_new/app/widgets/base_drawer.dart';

class NodeAddView extends StatefulWidget {
  NodeAddView({Key? key}) : super(key: key);

  @override
  State<NodeAddView> createState() => _NodeAddViewState();
}

class _NodeAddViewState extends State<NodeAddView> {
  File? _storedImage;

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

    return Obx(() => Scaffold(
          appBar: AppBar(
            title: Text("Add ${controller.nodeType}"),
            bottom: controller.nodeType.value != 'Facility'
                ? TabBar(
                    controller: controller.tabController,
                    tabs: controller.myTabs,
                  )
                : null,
          ),
          body: Padding(
            padding: const EdgeInsets.all(16.0),
            child: Form(
              key: controller.form,
              child: ListView(children: <Widget>[
                TextFormField(
                  decoration: const InputDecoration(
                    labelText: 'Name',
                  ),
                  textInputAction: TextInputAction.next,
                  onSaved: (value) {
                    controller.name = value!;
                  },
                ),
                TextFormField(
                  decoration: const InputDecoration(
                    labelText: 'Description',
                  ),
                  maxLines: 3,
                  keyboardType: TextInputType.multiline,
                  onSaved: (value) {
                    controller.desc = value!;
                  },
                ),
                ...() {
                  if (controller.nodeType.value == 'Item' ||
                      controller.nodeType.value == 'Pack') {
                    return [
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Price',
                        ),
                        keyboardType: TextInputType.number,
                        onSaved: (value) {
                          controller.price = value! as double;
                        },
                      ),
                      TextFormField(
                        decoration: const InputDecoration(
                          labelText: 'Quantity',
                        ),
                        keyboardType: TextInputType.number,
                        onSaved: (value) {
                          controller.quantity = value! as int;
                        },
                      ),
                    ];
                  }
                  return [Container()];
                }(),
                TextButton.icon(
                  onPressed: _takePicture,
                  icon: const Icon(Icons.camera),
                  label: const Text('Take Picture'),
                ),
                Center(
                  child: Container(
                    padding: const EdgeInsets.all(16.0),
                    width: 150,
                    height: 150,
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
                ),
                TextButton.icon(
                  onPressed: () {
                    controller.submitForm(_storedImage);
                  },
                  icon: const Icon(Icons.add),
                  label: const Text("Submit"),
                )
              ]),
            ),
          ),
        ));
  }
}
