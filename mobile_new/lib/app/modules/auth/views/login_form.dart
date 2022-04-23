import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:mobile_new/app/modules/auth/providers/auth_provider.dart';
import 'package:mobile_new/app/routes/app_pages.dart';
import 'package:reactive_forms/reactive_forms.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

import '../../../services/user_service.dart';
import '../../../widgets/snackbars.dart';

class LoginForm extends GetView {
  final _authProvider = Get.put(AuthProvider());

  LoginForm({Key? key}) : super(key: key);

  FormGroup buildForm() => fb.group(<String, Object>{
        'email': FormControl<String>(
          validators: [Validators.required, Validators.email],
        ),
        'password': ['', Validators.required],
      });

  @override
  Widget build(BuildContext context) {
    return SingleChildScrollView(
      padding: EdgeInsets.only(
        top: 20,
        left: 20,
        right: 20,
        bottom: MediaQuery.of(context).viewInsets.bottom,
      ),
      child: ReactiveFormBuilder(
        form: buildForm,
        builder: (BuildContext context, FormGroup formGroup, Widget? child) {
          return Column(
            mainAxisSize: MainAxisSize.min,
            children: [
              Text(
                'Sign In',
                style: Theme.of(context).textTheme.headline5,
              ),
              const SizedBox(height: 20),
              ReactiveTextField<String>(
                formControlName: 'email',
                validationMessages: (control) => {
                  ValidationMessage.required: 'The email must not be empty',
                  ValidationMessage.email:
                      'The email value must be a valid email',
                  'unique': 'This email is already in use',
                },
                decoration: InputDecoration(
                  labelText: 'Email',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  filled: true,
                  fillColor: Colors.white70,
                ),
              ),
              const SizedBox(height: 20),
              ReactiveTextField<String>(
                formControlName: 'password',
                validationMessages: (control) => {
                  ValidationMessage.required: 'The password must not be empty'
                },
                decoration: InputDecoration(
                  labelText: 'Password',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  filled: true,
                  fillColor: Colors.white70,
                ),
                obscureText: true,
                enableSuggestions: false,
                autocorrect: false,
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                child: const Text('Sign In'),
                style: ButtonStyle(
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.white),
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.green),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18.0),
                          side: const BorderSide(color: Colors.green))),
                  minimumSize:
                      MaterialStateProperty.all<Size>(const Size(200, 40)),
                ),
                onPressed: () async {
                  if (formGroup.valid) {
                    try {
                      var user = await _authProvider.login(
                          formGroup.value['email'].toString(),
                          formGroup.value['password'].toString());
                      Get.find<UserService>().setValues(user['_id'],
                          user['name'], user['email'], user['token']);
                      final userPrefs =
                          await StreamingSharedPreferences.instance;
                      userPrefs.setString('user', json.encode(user));
                      CustomSnackbars.success("Login Successful");
                      Get.offAllNamed(Routes.NODE);
                    } catch (e) {
                      CustomSnackbars.error("Login Failed!");
                    }
                  } else {
                    formGroup.markAllAsTouched();
                  }
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                child: const Text(
                  "New user? Sign Up",
                  style: TextStyle(fontSize: 14),
                ),
                style: ButtonStyle(
                  foregroundColor:
                      MaterialStateProperty.all<Color>(Colors.black),
                  backgroundColor:
                      MaterialStateProperty.all<Color>(Colors.white),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18.0),
                          side: const BorderSide(color: Colors.green))),
                  minimumSize:
                      MaterialStateProperty.all<Size>(const Size(200, 40)),
                ),
                onPressed: () => {Get.back(result: 'flip')},
              ),
              const SizedBox(height: 20),
            ],
          );
        },
      ),
    );
  }
}
