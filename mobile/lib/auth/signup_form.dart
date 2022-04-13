import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:reactive_forms/reactive_forms.dart';
import 'package:resource_management_system/widgets/snackbars.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

import '../../facilities_categories/facilities.dart';

class SignupForm extends StatelessWidget {
  const SignupForm({Key? key}) : super(key: key);

  ValidatorFunction _mustMatch(String controlName, String matchingControlName) {
    return (AbstractControl<dynamic> control) {
      final form = control as FormGroup;

      final formControl = form.control(controlName);
      final matchingFormControl = form.control(matchingControlName);
      if (formControl.value != matchingFormControl.value &&
          matchingFormControl.dirty) {
        matchingFormControl.setErrors({'mustMatch': true});

        matchingFormControl.markAsTouched();
      } else {
        matchingFormControl.removeError('mustMatch');
      }

      return null;
    };
  }

  FormGroup buildForm() => fb.group(<String, Object>{
        'name': FormControl<String>(
          validators: [Validators.required],
        ),
        'email': FormControl<String>(
          validators: [Validators.required, Validators.email],
        ),
        'password': ['', Validators.required],
        'confPassword': ['', Validators.required],
      }, [
        _mustMatch('password', 'confPassword'),
      ]);

  @override
  Widget build(BuildContext context) {
    String signUpMutation = """
    mutation createUser(\$createUserInput: CreateUserInput!) {
      createUser(createUserInput: \$createUserInput) {
        _id
        email
        name
        password
        token
      }
    }
    """;

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
                'Sign Up',
                style: Theme.of(context).textTheme.headline5,
              ),
              SizedBox(height: 20),
              ReactiveTextField<String>(
                formControlName: 'name',
                validationMessages: (control) => {
                  ValidationMessage.required: 'The name must not be empty',
                },
                decoration: InputDecoration(
                  labelText: 'Name',
                  border: OutlineInputBorder(
                    borderRadius: BorderRadius.circular(10.0),
                  ),
                  filled: true,
                  fillColor: Colors.white70,
                ),
              ),
              SizedBox(height: 20),
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
              SizedBox(height: 20),
              ReactiveTextField<String>(
                formControlName: 'password',
                validationMessages: (control) => {
                  ValidationMessage.required: 'The password must not be empty',
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
              SizedBox(height: 20),
              ReactiveTextField<String>(
                formControlName: 'confPassword',
                validationMessages: (control) => {
                  ValidationMessage.required: 'The password must not be empty',
                  ValidationMessage.mustMatch: 'The passwords must match',
                },
                decoration: InputDecoration(
                  labelText: 'Confirm Password',
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
              SizedBox(height: 20),
              Mutation(
                options: MutationOptions(
                  document: gql(signUpMutation),
                  onCompleted: (dynamic data) async {
                    if (data == null) return;
                    var user = {
                      'name': data['createUser']['name'],
                      'token': data['createUser']['token'],
                      'email': data['createUser']['email'],
                    };
                    final userPrefs = await StreamingSharedPreferences.instance;
                    userPrefs.setString('user', json.encode(user));
                    Get.offAllNamed(Facilities.route);
                  },
                  onError: (OperationException? error) {
                    if (error?.graphqlErrors.isNotEmpty == true) {
                      CustomSnackbars.error(error?.graphqlErrors.first.message);
                    }
                    CustomSnackbars.error('An error occurred');
                  },
                ),
                builder: (RunMutation runMutation, QueryResult? result) {
                  return ElevatedButton(
                    child: const Text('Sign Up'),
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
                    onPressed: () {
                      if (formGroup.valid) {
                        runMutation(<String, dynamic>{
                          'createUserInput': {
                            'name': formGroup.value['name'],
                            'email': formGroup.value['email'],
                            'password': formGroup.value['password'],
                          }
                        });
                      } else {
                        formGroup.markAllAsTouched();
                      }
                    },
                  );
                },
              ),
              const SizedBox(height: 20),
              ElevatedButton(
                child: const Text(
                  "Existing user? Sign In",
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
