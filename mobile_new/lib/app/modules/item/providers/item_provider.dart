import 'package:get/get.dart';
import 'package:mobile_new/app/services/api_service.dart';

class ItemProvider extends ApiService {
  Future<dynamic> getItemData(String id) async {
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
          allowedItemActivities
        }
      }
    """;
    var res = await query(doc, variables: {'id': id});
    return res.body['item'];
  }

  Future<dynamic> findItemAvailability(String? issueDate, String? dueDate, String? activityType, String? item) async {
    String doc = """
      query itemAvailability (\$dueDate: String!, \$activityType: ItemActivity!, \$issueDate: String!, \$item: String!) {
        itemAvailability (dueDate: \$dueDate, activityType: \$activityType, issueDate: \$issueDate, item: \$item)
      }
    """;
    var res = await query(doc, variables: {
      'issueDate': issueDate,
      'dueDate': dueDate,
      'activityType': activityType,
      'item': item
    });
    return res.body['itemAvailability'];
  }

  Future<dynamic> buyItem(String? item, int quantity, String? issueDate) async {
    String doc = """
    mutation buyItem (\$buyItemInput: BuyItemInput!) {
      buyItem (buyItemInput: \$buyItemInput) {
        item {
          node {
            _id 
          }
        }
      }
    }
    """;

    var res = await query(doc, variables: {
      'buyItemInput': {
        'item': item,
        'quantity': quantity,
        'issueDate': issueDate
      }
    });

    return res.body['buyItem'];
  }

  Future<dynamic> rentItem(String? item, int quantity, String? issueDate, String? dueDate) async {
    String doc = """
      mutation rentItem (\$rentItemInput: RentItemInput!) {
        rentItem (rentItemInput: \$rentItemInput) {
          item {
            node {
              _id 
            }
          }
        }
      }
    """;
    var res = await query(doc, variables: {
      'rentItemInput': {
        'item': item,
        'quantity': quantity,
        'issueDate': issueDate,
        'dueDate': dueDate
      }
    });
    return res.body['rentItem'];
  }

}
