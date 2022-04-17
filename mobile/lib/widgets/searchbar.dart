import 'dart:convert';

import 'package:dio/dio.dart';
import 'package:flutter/material.dart';
import 'package:flutter_typeahead/flutter_typeahead.dart';
import 'package:get/get.dart';
import 'package:resource_management_system/facilities_categories/facility_category.dart';
import '../auth/user_service.dart';
import '../item/item.dart';

class Searchbar extends StatelessWidget {
  static const route = 'search';

  final List<dynamic> suggestions = [];
  final refechs = [];

  final facilityQuery = """
  query facilitySearch(\$name: String!) {
      facilitySearch(name: \$name) {
        name
        node {
          _id
          type
        }
      }
    }
  """;

  final categoryQuery = """
  query categorySearch(\$name: String!) {
      categorySearch(name: \$name) {
        name
        node {
          _id
          type
        }
      }
    }
  """;

  final itemQuery = """
  query itemSearch(\$name: String!) {
      itemSearch(name: \$name) {
        name
        node {
          _id
          type
        }
      }
    }
  """;

  String pattern = "";

  Searchbar({Key? key}) : super(key: key);

  getSuggestions(pattern) async {
    final variables = {
      'name': pattern,
    };

    var dio = Dio();
    dio.options.headers['Authorization'] =
        'Bearer ' + Get.find<UserService>().user.value.token;
    dio.options.headers['Content-Type'] = 'application/json';
    final facility = {
      "query": facilityQuery,
      "variables": variables,
    };
    final category = {
      "query": categoryQuery,
      "variables": variables,
    };
    final item = {
      "query": itemQuery,
      "variables": variables,
    };

    final facilities = await dio
        .post('http://10.0.2.2:3000/graphql', data: json.encode(facility))
        .then((response) {
      return response.data['data']['facilitySearch'];
    });

    final categories = await dio
        .post('http://10.0.2.2:3000/graphql', data: json.encode(category))
        .then((response) {
      return response.data['data']['categorySearch'];
    });

    final items = await dio
        .post('http://10.0.2.2:3000/graphql', data: json.encode(item))
        .then((response) {
      return response.data['data']['itemSearch'];
    });

    final data = [...facilities, ...categories, ...items];
    return data;
  }

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
                return await getSuggestions(pattern);
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
                print(suggestion);
                final node = (suggestion as Map)['node'];
                final type = node['type'];
                if (type == 'FACILITY' || type == 'CATEGORY') {
                  Get.offNamed(FacilityCategory.route, arguments: suggestion);
                } else {
                  Get.offNamed(Item.route, arguments: node['_id']);
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
