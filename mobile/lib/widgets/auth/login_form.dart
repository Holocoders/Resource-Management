import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:reactive_forms/reactive_forms.dart';

class LoginForm extends StatefulWidget {
  const LoginForm({Key? key}) : super(key: key);

  @override
  _LoginFormState createState() => _LoginFormState();
}

class _LoginFormState extends State<LoginForm> {
  FormGroup buildForm() => fb.group(<String, Object>{
        'email': FormControl<String>(
          validators: [Validators.required, Validators.email],
        ),
        'password': ['', Validators.required],
        'rememberMe': false,
      });

  @override
  Widget build(BuildContext context) {
    String loginMutation = """
    mutation login(\$email: String!, \$password: String!) {
      login(email: \$email, password: \$password) {
        name
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
                'Sign In',
                style: Theme.of(context).textTheme.headline5,
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
              SizedBox(height: 20),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  ReactiveCheckbox(formControlName: 'rememberMe'),
                  const Text('Remember me')
                ],
              ),
              SizedBox(height: 20),
              Mutation(
                options: MutationOptions(
                  document: gql(loginMutation),
                  onCompleted: (dynamic data) {
                    // TODO save user token and credentials and move to home page
                  },
                  onError: (OperationException? error) {

                  },
                ),
                builder: (RunMutation runMutation, QueryResult? result) {
                  return ElevatedButton(
                    child: Text('Sign In'),
                    onPressed: () {
                      if (formGroup.valid) {
                        runMutation(<String, dynamic>{
                          'email': formGroup.value['email'],
                          'password': formGroup.value['password'],
                        });
                      } else {
                        formGroup.markAllAsTouched();
                      }
                    },
                  );
                },
              ),
            ],
          );
        },
      ),
    );
  }
}
