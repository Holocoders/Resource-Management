import 'package:get/get.dart';
import 'package:mobile_new/app/services/api_service.dart';

class ActivityDetailsProvider extends ApiService {
  updateItemHistory(itemId, itemState) async {
    const String doc = """
    mutation updateItemHistory (\$updateItemHistoryInput: UpdateItemHistoryInput!) {
      updateItemHistory (updateItemHistoryInput: \$updateItemHistoryInput) {
        itemState
      }
     }
    """;
    var res = await mutation(doc, variables: {
      'updateItemHistoryInput': {
        'item': itemId,
        'itemState': itemState,
      }
    });

    return res;
  }

  cancelOrder(itemId) {
    return updateItemHistory(itemId, 'CANCELLED');
  }

  returnOrder(itemId) {
    return updateItemHistory(itemId, 'RETURNED');
  }

  issueOrder(itemId) {
    return updateItemHistory(itemId, 'ISSUED');
  }

}
