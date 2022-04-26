import 'package:mobile_new/app/services/api_service.dart';

class UserActivitiesProvider extends ApiService {
  getActivities() async {
    const String doc = """
    query itemHistoryByUser {
      itemHistoryByUser {
        _id
        item {
          node {
            _id
            createdBy {
              _id
              email
              name
            }
            type
          }
          name
          quantity
          price
          description
        }
        quantity
        activityDate
        itemState
        activityType
        issueDate
        dueDate
      }
    }
    """;
    var res = await query(doc);
    return res.body['itemHistoryByUser'];
  }
}
