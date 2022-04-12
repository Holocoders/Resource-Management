import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';

class PermissionUsersAdd extends StatelessWidget {
  static const String route = '/permissionUserAdd';
  final String _query = """
    mutation addPermission(\$createPermissionInput: CreatePermissionInput!) {
            addPermission(createPermissionInput: \$createPermissionInput)
          }
  """;
  final _form = GlobalKey<FormState>();

  PermissionUsersAdd({Key? key}) : super(key: key);

  @override
  Widget build(BuildContext context) {
    String? email;
    final id = ModalRoute.of(context)!.settings.arguments as String;
    return Scaffold(
      appBar: AppBar(
        title: const Text('Add User'),
      ),
      body: Padding(
        padding: const EdgeInsets.all(16.0),
        child: Form(
          key: _form,
          child: ListView(children: <Widget>[
            TextFormField(
              decoration: const InputDecoration(
                labelText: 'email',
              ),
              textInputAction: TextInputAction.next,
              onSaved: (value) {
                email = value!;
              },
            ),
            Mutation(
              options: MutationOptions(
                document: gql(_query),
                onCompleted: (dynamic result) {
                  print(result);
                },
                onError: (error) {
                  print(error);
                },
              ),
              builder: (
                RunMutation runMutation,
                QueryResult? result,
              ) {
                return TextButton.icon(
                  onPressed: () {
                    _form.currentState?.save();
                    runMutation({
                      'variables': {
                        'createPermissionInput': {
                          'email': email,
                          'nodeId': id,
                        },
                      },
                    });
                  },
                  icon: const Icon(Icons.add),
                  label: const Text("Submit"),
                );
              },
            )
          ]),
        ),
      ),
    );
  }
}
