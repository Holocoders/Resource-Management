import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/auth/auth_home.dart';
import 'package:resource_management_system/widgets/facilities.dart';
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
      getToken: () async => 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImFAYS5jb20iLCJfaWQiOiI2MWZlM2U0ODgzOGZlMzE3MmMyODcyMzMiLCJpYXQiOjE2NDQ4MzI0MDIsImV4cCI6MTY0NDkxODgwMn0.CqIFMGHX20Ws6ZkwaJm_SP6FSDaBKzGNUP9FFZT2eRg',
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
        theme: ThemeData(
          primarySwatch: Colors.green,
          visualDensity: VisualDensity.adaptivePlatformDensity,
          scaffoldBackgroundColor: Colors.white,
        ),
        routes: { // TODO : Currently using basic navigator method, will switch to named routes later.
          '/': (context) => const AuthHome(),
          // 'facility': (context) => const Item(),
          // '/item': (context) => Item(),
        },
      ),
    );
  }
}
