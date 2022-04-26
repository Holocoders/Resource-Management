import 'package:mobile_new/app/services/api_service.dart';

class AdminActivitiesProvider extends ApiService {

  getAllActivities() async {
    String doc = """
    query itemHistory {
      itemHistory {
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
        user {
          _id
          email
          name
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
    return res.body['itemHistory'];
  }

}
