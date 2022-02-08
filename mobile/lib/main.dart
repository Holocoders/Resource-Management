import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/item/item.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';
import 'package:resource_management_system/widgets/item/detail.dart';

void main() {
  runApp(const MyApp());
}

class MyApp extends StatelessWidget {
  const MyApp({Key? key}) : super(key: key);

  // This widget is the root of your application.
  @override
  Widget build(BuildContext context) {

    HttpLink httpLink = HttpLink('http://10.0.2.2:3000/graphql');

    AuthLink authLink = AuthLink(
      getToken: () async => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJfaWQiOiI2MWZlM2U0ODgzOGZlMzE3MmMyODcyMzMiLCJpYXQiOjE2NDQzMTM5NjksImV4cCI6MTY0NDQwMDM2OX0.NwB39ZV6j_y3AI27hkZXgx7fS5-2OINe-SJV3b4z7PY',
    );

    ValueNotifier<GraphQLClient> client = ValueNotifier(
        GraphQLClient(
          link: authLink.concat(httpLink),
          cache: GraphQLCache(
            store: InMemoryStore(),
          ),
        )
    );

    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        home: Theme(
          data: Theme.of(context).copyWith(
            scaffoldBackgroundColor: Colors.white,
          ),
          child: Scaffold(
            appBar: AppBar(
              title: const Text('RMS'),
              backgroundColor: Colors.white,
              elevation: 1,
            ),
            body: const SingleChildScrollView(
              child: Center(
                child: Item(itemId: '61fe3ed1838fe3172c287279'),
              ),
            ),
          ),
        ),
      ),
    );
  }
}
