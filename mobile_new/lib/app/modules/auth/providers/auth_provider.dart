import 'package:mobile_new/app/services/api_service.dart';

class AuthProvider extends ApiService {
  Future<dynamic> login(String email, String password) async {
    String doc = """
    mutation login(\$email: String!, \$password: String!) {
      login(email: \$email, password: \$password) {
        _id
        name
        email
        token
      }
    }
    """;
    var res = await query(doc, variables: {
      "email": email,
      "password": password,
    });
    return res.body['login'];
  }

  Future<dynamic> signup(String name, String email, String password) async {
    String doc =  """
    mutation createUser(\$createUserInput: CreateUserInput!) {
      createUser(createUserInput: \$createUserInput) {
        _id
        email
        name
        token
      }
    }
    """;
    var res = await query(doc, variables: {
      'createUserInput': {
        'name': name,
        'email': email,
        'password': password
      }
    });
    return res.body['createUser'];
  }
}