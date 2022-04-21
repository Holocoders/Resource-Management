import 'dart:convert';

import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile_new/app/modules/auth/providers/auth_provider.dart';
import 'package:mobile_new/app/routes/app_pages.dart';
import 'package:reactive_forms/reactive_forms.dart';
import 'package:streaming_shared_preferences/streaming_shared_preferences.dart';

import 'package:mobile_new/app/widgets/snackbars.dart';

class SignupForm extends GetView {

  final _authProvider = Get.put(AuthProvider());

  SignupForm({Key? key}) : super(key: key);

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
              const SizedBox(height: 20),
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
              const SizedBox(height: 20),
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
              const SizedBox(height: 20),
              ElevatedButton(
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
                onPressed: () async {
                  if (formGroup.valid) {
                    try {
                      var user = await _authProvider.signup(
                        formGroup.value['name'].toString(),
                        formGroup.value['email'].toString(),
                        formGroup.value['password'].toString(),
                      );
                      final userPrefs = await StreamingSharedPreferences.instance;
                      userPrefs.setString('user', json.encode(user));
                      CustomSnackbars.success("Signup Successful");
                      Get.offAllNamed(Routes.NODE);
                    } catch (e) {
                      CustomSnackbars.error("Signup Failed");
                    }
                  } else {
                    formGroup.markAllAsTouched();
                  }
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
