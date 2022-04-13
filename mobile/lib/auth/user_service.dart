import 'package:get/get.dart';
import 'package:resource_management_system/auth/user.dart';

class UserService extends GetxService {
  var user = User().obs;

  setValues(String id, String name, String email, String token) {
    user.value.id = id;
    user.value.name = name;
    user.value.email = email;
    user.value.token = token;
  }
}
