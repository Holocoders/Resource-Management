import 'dart:io';
import 'package:flutter/material.dart';
import 'package:flutter/services.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';

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
  bool buy = false;
  bool rent = false;

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
          body: Card(
            child: Padding(
              padding: const EdgeInsets.all(16.0),
              child: Form(
                key: controller.form,
                child: ListView(children: <Widget>[
                  const SizedBox(height: 16),
                  TextFormField(
                    decoration: const InputDecoration(
                      labelText: 'Name',
                    ),
                    textInputAction: TextInputAction.next,
                    onSaved: (value) {
                      controller.name = value!;
                    },
                  ),
                  const SizedBox(height: 16),
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
                  const SizedBox(height: 16),
                  ...() {
                    var widgets = [];
                    if (controller.nodeType.value == 'Item' ||
                        controller.nodeType.value == 'Pack') {
                      widgets = [
                        TextFormField(
                          decoration: const InputDecoration(
                            labelText: 'Price',
                          ),
                          keyboardType: TextInputType.number,
                          onSaved: (value) {
                            controller.price = double.parse(value!);
                          },
                        ),
                        const SizedBox(height: 16),
                        TextFormField(
                          decoration: const InputDecoration(
                            labelText: 'Quantity',
                          ),
                          keyboardType: TextInputType.number,
                          onSaved: (value) {
                            controller.quantity = int.parse(value!);
                          },
                        ),
                        const SizedBox(height: 16),
                        CheckboxListTile(
                          value: buy,
                          onChanged: (value) {
                            setState(() {
                              buy = value!;
                            });
                          },
                          title: const Text('Buy'),
                        ),
                        CheckboxListTile(
                          value: rent,
                          onChanged: (value) {
                            setState(() {
                              rent = value!;
                            });
                          },
                          title: const Text('Rent'),
                        )
                      ];
                    }

                    if (controller.nodeType.value == 'Pack') {
                      widgets.add(const SizedBox(height: 16));
                      widgets.add(
                        TypeAheadField(
                          textFieldConfiguration: const TextFieldConfiguration(
                            decoration: InputDecoration(
                              hintText: 'Items',
                              border: OutlineInputBorder(),
                            ),
                          ),
                          suggestionsCallback: (pattern) async {
                            return await controller.getSuggestion(pattern);
                          },
                          itemBuilder: (context, suggestion) {
                            return ListTile(
                              leading: CircleAvatar(
                                backgroundImage: NetworkImage(
                                    "http://10.0.2.2:3000/" +
                                        (suggestion as Map)['node']['_id']),
                              ),
                              title: Text((suggestion)['name']),
                            );
                          },
                          onSuggestionSelected: (suggestion) {
                            var maxQuantity = (suggestion as Map)['quantity'];
                            var currentQuantity = 1;
                            Get.defaultDialog(
                              title: "Add item",
                              content: TextFormField(
                                initialValue: "1",
                                decoration: InputDecoration(
                                  labelText: 'Quantity (max $maxQuantity)',
                                ),
                                keyboardType: TextInputType.number,
                                inputFormatters: [
                                  FilteringTextInputFormatter.digitsOnly,
                                ],
                                onChanged: (value) {
                                  if (value.isNotEmpty) {
                                    currentQuantity = int.parse(value);
                                  }
                                },
                              ),
                              onCancel: () {},
                              onConfirm: () {
                                controller.items.add({
                                  ...suggestion,
                                  'quantity': currentQuantity,
                                });
                                Get.back();
                              },
                            );
                          },
                        ),
                      );
                      widgets.add(const SizedBox(height: 16));
                      widgets.add(DataTable(
                        columns: const [
                          DataColumn(label: Text('Name')),
                          DataColumn(label: Text('Quantity')),
                          DataColumn(label: Text('')),
                        ],
                        rows: List<DataRow>.generate(
                          controller.items.length,
                          (index) {
                            return DataRow(
                              cells: [
                                DataCell(
                                  Text(controller.items[index]['name']),
                                ),
                                DataCell(
                                  Text(controller.items[index]['quantity']
                                      .toString()),
                                ),
                                DataCell(
                                  IconButton(
                                    icon: Icon(
                                      Icons.delete,
                                      color: Theme.of(context).errorColor,
                                    ),
                                    onPressed: () {
                                      controller.items.removeAt(index);
                                    },
                                  ),
                                ),
                              ],
                            );
                          },
                        ),
                      ));
                    }
                    return widgets;
                  }(),
                  const SizedBox(height: 32),
                  TextButton.icon(
                    onPressed: _takePicture,
                    icon: const Icon(Icons.camera),
                    label: const Text('Add Picture'),
                  ),
                  Center(
                    child: Container(
                      padding: const EdgeInsets.all(16.0),
                      width: 150,
                      height: 150,
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
                      controller.buy = buy;
                      controller.rent = rent;
                      controller.submitForm(_storedImage);
                    },
                    icon: const Icon(Icons.add),
                    label: const Text("Submit"),
                  )
                ]),
              ),
            ),
          ),
        ));
  }
}
