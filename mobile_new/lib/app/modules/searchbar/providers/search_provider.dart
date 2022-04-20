import 'package:get/get.dart';
import 'package:mobile_new/app/services/api_service.dart';

class SearchProvider extends ApiService {
  Future<List<dynamic>> search(String pattern) async {
    const facilityQuery = """
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

    const categoryQuery = """
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

    const itemQuery = """
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

    final variables = {
      'name': pattern,
    };

    final facilities = await query(facilityQuery, variables: variables);
    final categories = await query(categoryQuery, variables: variables);
    final items = await query(itemQuery, variables: variables);
    return [
      ...facilities.body['facilitySearch'],
      ...categories.body['categorySearch'],
      ...items.body['itemSearch'],
    ];
  }
}
