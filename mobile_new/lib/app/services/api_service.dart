import 'package:get/get.dart';
import 'package:mobile_new/app/services/user_service.dart';

class ApiService extends GetConnect {
  @override
  void onInit() {
    httpClient.baseUrl = "http://10.0.2.2:3000/graphql";
    httpClient.defaultContentType = "application/json";

    httpClient.addAuthenticator<dynamic>((request) async {
      final token = Get
          .find<UserService>()
          .user
          .value
          .token;
      var headers = {'Authorization': "Bearer $token"};
      if (token != '') {
        request.headers.addAll(headers);
      }
      print("Auth");
      print(request);
      return request;
    });

    httpClient.addRequestModifier<dynamic>((request) async {
      final token = Get
          .find<UserService>()
          .user
          .value
          .token;
      var headers = {'Authorization': "Bearer $token"};
      if (token != '') {
        request.headers.addAll(headers);
      }
      return request;
    });

    super.onInit();
  }

  @override
  Future<GraphQLResponse<T>> query<T>(String query,
      {String? url, Map<String, dynamic>? variables, Map<String,
          String>? headers}) {
    // TODO: implement query
    return super.query(query, url: '', variables: variables, headers: headers);
  }

  @override
  Future<GraphQLResponse<T>> mutation<T>(String mutation,
      {String? url, Map<String, dynamic>? variables, Map<String,
          String>? headers}) {
    // TODO: implement mutation
    return super.mutation(
        mutation, url: '', variables: variables, headers: headers);
  }
}
