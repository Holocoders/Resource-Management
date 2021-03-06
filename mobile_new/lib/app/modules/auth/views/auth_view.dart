import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'login_form.dart';
import 'signup_form.dart';


class AuthView extends GetView {
  const AuthView({Key? key}) : super(key: key);


    Future<dynamic> openLoginSheet(context) {
      return showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return LoginForm();
        },
        isScrollControlled: true,
      ).then((value) => {if (value == "flip") openSignUpSheet(context)});
    }

    Future<dynamic> openSignUpSheet(context) {
      return showModalBottomSheet(
        context: context,
        builder: (BuildContext context) {
          return SignupForm();
        },
        isScrollControlled: true,
      ).then((value) => {if (value == "flip") openLoginSheet(context)});
    }

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
              Image.asset('assets/rms-logo.png', width: 100, height: 100),
            const SizedBox(height: 20),
            Text('Resource Management System',
                style: Theme.of(context).textTheme.headline5),
            const SizedBox(height: 20),
            ElevatedButton(
              child: const Text(
                "Sign In",
                style: TextStyle(fontSize: 14),
              ),
              style: ButtonStyle(
                minimumSize: MaterialStateProperty.all<Size>(const Size(200, 40)),
              ),
              onPressed: () => {openLoginSheet(context)},
            ),
            const SizedBox(height: 10),
            ElevatedButton(
              child: const Text(
                "First Time? Sign Up",
                style: TextStyle(fontSize: 14),
              ),
              style: ButtonStyle(
                minimumSize: MaterialStateProperty.all<Size>(const Size(200, 40)),
              ),
              onPressed: () => {openSignUpSheet(context)},
            ),
          ],
        ),
      ),
    );
  }
}
