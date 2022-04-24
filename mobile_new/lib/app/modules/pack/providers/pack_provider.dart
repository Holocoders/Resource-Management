import 'package:get/get.dart';
import 'package:mobile_new/app/services/api_service.dart';

class PackProvider extends ApiService {

  getPackDetails(id) async {
    String doc = """
    query item(\$id: String!) {
      item(id: \$id) {
        node {
          _id
          createdBy {
            _id
            name
          }
          parent {
            _id
          }
        }
        description
        name
        price
        quantity
        packItems {
          item {
            node {
              _id
            }
            name
            description
            price
            quantity
          }
          quantity
        }
        allowedItemActivities
      }
    }
    """;
    var res = await query(doc, variables: {'id': id});
    return res.body['item'];
  }

}
