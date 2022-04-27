import 'dart:convert';
import 'dart:io';

import 'package:get/get.dart';
import 'package:mobile_new/app/services/api_service.dart';

class NodeAddProvider extends ApiService {
  Future<dynamic> addFacility(String name, String desc, File image) async {
    final data = FormData({
      'operations':
          '{ "query": "mutation (\$createFacilityInput: CreateFacilityInput!, \$file: Upload!) { createFacility(file: \$file, createFacilityInput: \$createFacilityInput) { node { _id itemCount categoryCount } name description } }", "variables": { "file": null, "createFacilityInput": {"name": "$name", "description": "$desc"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": MultipartFile(image, filename: image.path.split('/').last),
    });
    var res = await post('', data);
    return res.body;
  }

  Future<dynamic> addCategory(
      String id, String name, String desc, File image) async {
    final data = FormData({
      'operations':
          '{ "query": "mutation (\$createCategoryInput: CreateCategoryInput!, \$file: Upload!) { createCategory(file: \$file, createCategoryInput: \$createCategoryInput) { node { _id itemCount categoryCount } name description } }", "variables": { "file": null, "createCategoryInput": {"parent": "$id", "name": "$name", "description": "$desc"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": MultipartFile(image, filename: image.path.split('/').last),
    });
    var res = await post('', data);
    return res.body;
  }

  Future<dynamic> addItem(String id, String name, String desc, File image,
      double price, int quantity, String allowedItemActivities) async {
    // createItemInput
    final data = FormData({
      'operations':
          '{ "query": "mutation (\$createItemInput: CreateItemInput!, \$file: Upload!) { createItem(file: \$file, createItemInput: \$createItemInput) { node { _id } name description } }", "variables": { "file": null, "createItemInput": {"parent": "$id", "name": "$name", "description": "$desc", "quantity": $quantity, "price": $price, "allowedItemActivities": "$allowedItemActivities"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": MultipartFile(image, filename: image.path.split('/').last),
    });
    return post('', data);
  }

  Future<dynamic> addPack(
      String id,
      String name,
      String desc,
      File image,
      double price,
      int quantity,
      List<dynamic> packItems,
      String allowedPackActivities) async {
    final data = FormData({
      'operations':
          '{ "query": "mutation (\$createItemInput: CreateItemInput!, \$file: Upload!) { createPack(file: \$file, createItemInput: \$createItemInput) { node { _id } name description } }", "variables": { "file": null, "createItemInput": {"parent": "$id", "name": "$name", "description": "$desc", "quantity": $quantity, "price": $price, "allowedItemActivities": "$allowedPackActivities", "packItems": "$packItems"} } }',
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": MultipartFile(image, filename: image.path.split('/').last),
    });
    return post('', data);
  }

  Future<List<dynamic>> searchItems(String pattern) async {
    const itemQuery = """
    query itemSearch(\$name: String!) {
        itemSearch(name: \$name) {
          name
          quantity
          node {
            _id
            type
          }
        }
      }
    """;

    final variables = {
      'name': pattern,
    };

    final items = await query(itemQuery, variables: variables);
    return items.body['itemSearch'];
  }
}
