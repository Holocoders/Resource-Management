import 'package:flutter/material.dart';
import 'package:resource_management_system/widgets/auth/signup_form.dart';

import 'login_form.dart';

class AuthHome extends StatelessWidget {
  const AuthHome({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    return Scaffold(
      body: Center(
        child: Column(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            Image.network('https://bityl.co/B0G8', width: 100, height: 100),
            const SizedBox(height: 20),
            Text('Resource Management System', style: Theme.of(context).textTheme.headline5),
            const SizedBox(height: 20),
            ElevatedButton(
                child: Text(
                "Sign In", style: const TextStyle(fontSize: 14),),
                style: ButtonStyle(
                    foregroundColor: MaterialStateProperty.all<Color>(Colors.white),
                    backgroundColor: MaterialStateProperty.all<Color>(Colors.green),
                    shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                        RoundedRectangleBorder(
                            borderRadius: BorderRadius.circular(18.0),
                            side: const BorderSide(color: Colors.green)
                        )
                    ),
                    minimumSize: MaterialStateProperty.all<Size>(Size(200, 40)),
                ),
                onPressed: () => {
                  showModalBottomSheet(context: context, builder: (context) => LoginForm(), isScrollControlled: true)
                }
            ),
            ElevatedButton(
                child: Text(
                  "First Time? Sign Up", style: const TextStyle(fontSize: 14),),
                style: ButtonStyle(
                  foregroundColor: MaterialStateProperty.all<Color>(Colors.black),
                  backgroundColor: MaterialStateProperty.all<Color>(Colors.white),
                  shape: MaterialStateProperty.all<RoundedRectangleBorder>(
                      RoundedRectangleBorder(
                          borderRadius: BorderRadius.circular(18.0),
                          side: const BorderSide(color: Colors.green)
                      )
                  ),
                  minimumSize: MaterialStateProperty.all<Size>(Size(200, 40)),
                ),
                onPressed: () => {
                  showModalBottomSheet(context: context, builder: (context) => SignupForm(), isScrollControlled: true)
                }
            ),
          ],
        ),
      ),
    );
  }
}
