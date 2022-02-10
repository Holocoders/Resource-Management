import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:resource_management_system/widgets/facilties.dart';
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
      getToken: () async =>
          'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InlAeS5jb20iLCJfaWQiOiI2MWIyMmZmNDlhMWVkNjRhZTA1MGFkM2YiLCJpYXQiOjE2NDQ0MjYyOTMsImV4cCI6MTY0NDUxMjY5M30.e7szVV7UyMoFb5whsn-Yhs5HvrIO-FVjvu3Kc8jFVZg',
    );

    ValueNotifier<GraphQLClient> client = ValueNotifier(GraphQLClient(
      link: authLink.concat(httpLink),
      cache: GraphQLCache(
        store: InMemoryStore(),
      ),
    ));

    return GraphQLProvider(
      client: client,
      child: MaterialApp(
        theme: ThemeData(
          primarySwatch: Colors.green,
          visualDensity: VisualDensity.adaptivePlatformDensity,
          scaffoldBackgroundColor: Colors.white,
        ),
        routes: {
          '/': (context) => const Facilities(),
          // 'facility': (context) => const Item(),
          // '/item': (context) => Item(),
        },
      ),
    );
  }
}
