import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/modules/node/bindings/node_binding.dart';
import 'package:mobile_new/app/routes/app_pages.dart';

import 'package:mobile_new/app/modules/node/views/node_view.dart';
import 'package:mobile_new/app/modules/searchbar/controllers/searchbar_controller.dart';

class SearchBarView extends GetView<SearchBarController> {
  const SearchBarView({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Padding(
        padding: const EdgeInsets.all(8.0),
        child: Column(
          children: [
            const SizedBox(
              height: 20,
            ),
            TypeAheadField(
              textFieldConfiguration: const TextFieldConfiguration(
                  autofocus: true,
                  decoration: InputDecoration(border: OutlineInputBorder())),
              suggestionsCallback: (pattern) async {
                return await controller.getSuggestion(pattern);
              },
              itemBuilder: (context, suggestion) {
                return ListTile(
                  leading: CircleAvatar(
                    backgroundImage: NetworkImage("http://10.0.2.2:3000/" +
                        (suggestion as Map)['node']['_id']),
                  ),
                  title: Text((suggestion)['name']),
                );
              },
              onSuggestionSelected: (suggestion) {
                final node = (suggestion as Map)['node'];
                final type = node['type'];
                if (type == 'FACILITY' || type == 'CATEGORY') {
                  Get.to(() => NodeView(),
                      arguments: {
                        'name': (suggestion)['name'],
                        '_id': node['_id']
                      },
                      binding: NodeBinding(tag: node['_id']));
                } else {
                  Get.offNamed(Routes.ITEM, arguments: node['_id']);
                }
                // Get.offNamed(FacilityCategory.route, arguments: suggestion);
              },
            ),
          ],
        ),
      ),
    );
  }
}
