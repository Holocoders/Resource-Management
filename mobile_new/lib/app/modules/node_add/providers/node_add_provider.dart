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
}
