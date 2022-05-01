import 'dart:developer';

import 'package:get/get.dart';
import 'package:mobile_new/app/services/user_service.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

class ApiService extends GetConnect {
  @override
  void onInit() {
    httpClient.baseUrl = "http://10.0.2.2:3000/graphql";
    httpClient.defaultContentType = "application/json";

    httpClient.addRequestModifier<dynamic>((request) async {
      final token = Get.find<UserService>().user.value.token;
      var headers = {'Authorization': "Bearer $token"};
      if (token != '') {
        request.headers.addAll(headers);
      }
      return request;
    });

    httpClient.addResponseModifier((request, response) async {
      var gqlErrors = (response.body as Map)['errors'];
      if (gqlErrors != null) {
        log(gqlErrors.toString());
        var unauthorized = gqlErrors.any((error) => error['message'] == 'Unauthorized');
        if (unauthorized) {
          var _sharedPrefs = await StreamingSharedPreferences.instance;
          await _sharedPrefs.clear();
          Get.offAllNamed('/login');
        }
        throw gqlErrors;
      }
      return response;
    });

    super.onInit();
  }

  @override
  Future<GraphQLResponse<T>> query<T>(String query,
      {String? url,
      Map<String, dynamic>? variables,
      Map<String, String>? headers}) {
    // TODO: implement query
    return super.query(query, url: '', variables: variables, headers: headers);
  }

  @override
  Future<GraphQLResponse<T>> mutation<T>(String mutation,
      {String? url,
      Map<String, dynamic>? variables,
      Map<String, String>? headers}) {
    // TODO: implement mutation
    return super
        .mutation(mutation, url: '', variables: variables, headers: headers);
  }
}
