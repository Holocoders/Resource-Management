import 'package:flutter/material.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

typedef CounterCallback = void Function();

class AvailabilityView extends StatefulWidget {
  final String itemId;
  const AvailabilityView({Key? key, required this.itemId}) : super(key: key);

  @override
  _AvailabilityViewState createState() => _AvailabilityViewState();
}

class _AvailabilityViewState extends State<AvailabilityView> {
  String _range = '';
  int _currentCount = 0;
  int _maxCount = -1;
  DateTime? _startDate;
  DateTime? _endDate;
  final timeZoneOffset = DateTime.now().timeZoneOffset;

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      if (args.value is PickerDateRange) {
        _startDate = args.value.startDate.add(timeZoneOffset);
        _endDate = args.value.endDate?.add(timeZoneOffset) ?? args.value.startDate.add(timeZoneOffset);
        _range = '${DateFormat('dd/MM/yyyy').format(args.value.startDate)} -'
            ' ${DateFormat('dd/MM/yyyy').format(args.value.endDate ?? args.value.startDate)}';
      }
    });
  }

  void _increment() {
    setState(() {
      if (_currentCount >= _maxCount) {
        return;
      }
      _currentCount++;
    });
  }

  void _decrement() {
    setState(() {
      if (_currentCount > 0) {
        _currentCount--;
      }
    });
  }

  String itemAvailability = """
  query itemAvailability (\$dueDate: String!, \$issueDate: String!, \$item: String!) {
    itemAvailability (dueDate: \$dueDate, issueDate: \$issueDate, item: \$item)
  }
  """;

  String getItem = """
  mutation createItemHistory (\$createItemHistoryInput: CreateItemHistoryInput!) {
    createItemHistory (createItemHistoryInput: \$createItemHistoryInput) {
      item {
        _id {
          _id
        }
      }
    }
  }
  """;

  Widget _createIncrementDecrementButton(
      IconData icon, Color fillColor, CounterCallback onPressed, bool disabled) {
    return ElevatedButton(
        onPressed: disabled ? null : onPressed,
        child: Icon(icon, color: Colors.black),
        style: ButtonStyle(
            backgroundColor: disabled ? null : MaterialStateProperty.all<Color>(fillColor),
            shape: MaterialStateProperty.all<CircleBorder>(
                const CircleBorder()
            )
        )
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        const SizedBox(height: 20),
        const Text(
          'Select date range to check for availability.',
        ),
        const SizedBox(height: 10),
        SfDateRangePicker(
          onSelectionChanged: _onSelectionChanged,
          selectionMode: DateRangePickerSelectionMode.range,
          enablePastDates: false,
          minDate: DateTime.now(),
          maxDate: DateTime.now().add(const Duration(days: 30)),
        ),
        const SizedBox(height: 10),
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Visibility(
                child: Text('Selected range: $_range'),
                visible: _range.isNotEmpty),
          ],
        ),
        const SizedBox(height: 10),
        GraphQLConsumer(
          builder: (GraphQLClient client) {
            return ElevatedButton(
              child: const Text('Check Availability'),
              onPressed: () async {
                if (_startDate == null) {
                  ScaffoldMessenger.of(context).showSnackBar(
                    SnackBar(
                      content: const Text('Please select a valid date range.'),
                      action: SnackBarAction(
                        label: 'OK',
                        onPressed: () {
                          ScaffoldMessenger.of(context).hideCurrentSnackBar();
                        },
                      ),
                    ),
                  );
                  return;
                }
                QueryResult result = await client.query(QueryOptions(
                  document: gql(itemAvailability),
                  variables: <String, dynamic>{
                    'issueDate': _startDate?.toIso8601String(),
                    'dueDate': _endDate?.toIso8601String() ?? _startDate?.toIso8601String(),
                    'item': widget.itemId,
                  },
                ));
                if (result.hasException) {
                  SnackBar(
                    content: const Text('Some error occurred!'),
                    action: SnackBarAction(
                      label: 'OK',
                      onPressed: () {
                        ScaffoldMessenger.of(context).hideCurrentSnackBar();
                      },
                    ),
                  );
                  return;
                } else {
                  setState(() {
                    _maxCount = result.data!['itemAvailability'];
                  });
                }
              },
            );
          },
        ),
        const SizedBox(height: 10),
        Visibility(
          child: Text('Max. available items: $_maxCount'),
          visible: _maxCount >= 0,
        ),
        const SizedBox(height: 10),
        Card(
          color: Colors.white60,
          shape: const RoundedRectangleBorder(
            borderRadius: BorderRadius.all(Radius.circular(16)),
          ),
          margin: const EdgeInsets.all(8),
          child: Column(
            crossAxisAlignment: CrossAxisAlignment.center,
            mainAxisSize: MainAxisSize.min,
            children: <Widget>[
              const SizedBox(height: 10),
              const Text("Select number of items to buy/borrow"),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  // counter
                  _createIncrementDecrementButton(
                    Icons.remove,
                    Colors.red,
                    _decrement,
                    _currentCount <= 0
                  ),
                  const SizedBox(width: 5),
                  FocusScope(
                    child: Focus(
                      child: SizedBox(
                        width: MediaQuery.of(context).size.width * 0.25,
                        child: TextField(
                          textAlign: TextAlign.center,
                          controller: TextEditingController(
                              text: _currentCount.toString()),
                          enableInteractiveSelection: false,
                          cursorHeight: 0,
                          cursorWidth: 0,
                          keyboardType: TextInputType.number,
                          decoration: const InputDecoration(
                            border: InputBorder.none,
                          ),
                        ),
                      ),
                    ),
                  ),
                  const SizedBox(width: 5),
                  _createIncrementDecrementButton(
                    Icons.add,
                    Colors.green,
                    _increment,
                    _currentCount >= _maxCount
                  ),
                ],
              ),
              const SizedBox(height: 10),
              Visibility(
                child: const Text('You need to buy or borrow atleast 1 item.'),
                visible: _currentCount == 0,
              ),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: [
                  Mutation(
                      options: MutationOptions(
                        document: gql(getItem),
                        onCompleted: (dynamic data) {
                          setState(() {
                            _currentCount = 0;
                            _maxCount = -1;
                          });
                        }
                      ),
                      builder: (RunMutation runMutation, QueryResult? result) {
                        return ElevatedButton.icon(
                          icon: const Icon(Icons.check),
                          label: const Text('Buy'),
                          onPressed: _currentCount == 0 ? null : () {
                            runMutation({
                              'createItemHistoryInput' : {
                                'item': widget.itemId,
                                'quantity': _currentCount,
                                'activityType': 'BUY',
                                'issueDate': _startDate.toString()
                              }
                            });
                          },
                        );
                      },
                  ),
                  const SizedBox(width: 10),
                  Mutation(
                    options: MutationOptions(
                        document: gql(getItem),
                        onCompleted: (dynamic data) {
                          setState(() {
                            _currentCount = 0;
                            _maxCount = -1;
                          });
                        }
                    ),
                    builder: (RunMutation runMutation, QueryResult? result) {
                      return ElevatedButton.icon(
                        icon: const Icon(Icons.vpn_key),
                        label: const Text('Borrow'),
                        onPressed: _currentCount == 0 ? null : () {
                          runMutation({
                            'createItemHistoryInput' : {
                              'item': widget.itemId,
                              'quantity': _currentCount,
                              'activityType': 'RENT',
                              'issueDate': _startDate.toString(),
                              'dueDate': _endDate.toString()
                            }
                          });
                        },
                      );
                    },
                  )
                ],
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ],
    );
  }
}
