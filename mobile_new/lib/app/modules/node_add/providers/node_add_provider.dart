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
      'operations': """
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
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": MultipartFile(image, filename: image.path.split('/').last),
    });
    var res = await post('', data);
    return res.body;
  }

  Future<dynamic> addItem(String id, String name, String desc, File image,
      double price, int quantity) {
    final data = FormData({
      'operations': """
          mutation createItem (\$createItemInput: CreateItemInput!, \$file: Upload!) {
            createItem (createItemInput: \$createItemInput, file: \$file) {
              description
              name
          }
      }, "variables": { "file": null, "createItemInput": {"parent", "$id", "name": "$name", "description": "$desc", "price": "$price", "quantity": "$quantity"} } }
          """,
      "map": '{ "nfile": ["variables.file"] }',
      "nfile": MultipartFile(image, filename: image.path.split('/').last),
    });
    return post('', data);
  }

  Future<dynamic> addPack(String id, String name, String desc, File image,
      double price, int quantity, items) {
    final data = FormData({
      'operations': """
          mutation createPack (\$createPackInput: CreatePackInput!, \$file: Upload!) {
            createPack (createPackInput: \$createPackInput, file: \$file) {
              description
              name
          }
      }, "variables": { "file": null, "createPackInput": {"parent", "$id", "name": "$name", "description": "$desc", "price": "$price", "quantity": "$quantity", "packItems": $items} } }
          """,
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
