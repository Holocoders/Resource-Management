import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:graphql_flutter/graphql_flutter.dart';
import 'package:mobile_new/app/modules/item/providers/item_provider.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';
import 'package:toggle_switch/toggle_switch.dart';
import 'package:intl/intl.dart';

import '../../../widgets/snackbars.dart';

typedef CounterCallback = void Function();

class AvailabilityView extends StatefulWidget {
  final Map<String, dynamic> item;

  const AvailabilityView({Key? key, required this.item}) : super(key: key);

  @override
  State<AvailabilityView> createState() => _AvailabilityViewState();
}

class _AvailabilityViewState extends State<AvailabilityView> {
  String _range = '';

  int _currentCount = 0;

  int _maxCount = -1;

  String activityType = 'RENT';

  var allowedItemActivities = [];

  DateTime? _startDate;

  DateTime? _endDate;

  final timeZoneOffset = DateTime.now().timeZoneOffset;

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      if (args.value is PickerDateRange) {
        _startDate = args.value.startDate.add(timeZoneOffset);
        _endDate = args.value.endDate?.add(timeZoneOffset) ??
            args.value.startDate.add(timeZoneOffset);
        _range = '${DateFormat('dd/MM/yyyy').format(args.value.startDate)} -'
            ' ${DateFormat('dd/MM/yyyy').format(args.value.endDate ?? args.value.startDate)}';
      } else if (args.value is DateTime) {
        _startDate = args.value.add(timeZoneOffset);
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

  final _itemProvider = Get.put(ItemProvider());

  // String getItem = """
  Widget _createIncrementDecrementButton(IconData icon, Color fillColor,
      CounterCallback onPressed, bool disabled) {
    return ElevatedButton(
        onPressed: disabled ? null : onPressed,
        child: Icon(icon, color: Colors.black),
        style: ButtonStyle(
            backgroundColor:
                disabled ? null : MaterialStateProperty.all<Color>(fillColor),
            shape:
                MaterialStateProperty.all<CircleBorder>(const CircleBorder())));
  }

  @override
  void initState() {
    activityType = widget.item['allowedItemActivities'] == 'BOTH'
        ? 'RENT'
        : widget.item['allowedItemActivities'];
    super.initState();
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        const SizedBox(height: 20),
        ToggleSwitch(
          minWidth: 90.0,
          cornerRadius: 20.0,
          initialLabelIndex: activityType == 'BUY' &&
                  widget.item['allowedItemActivities'] == 'BOTH'
              ? 1
              : 0,
          totalSwitches: widget.item['allowedItemActivities'] == 'BOTH' ? 2 : 1,
          labels: widget.item['allowedItemActivities'] == 'BOTH'
              ? ['RENT', 'BUY']
              : [widget.item['allowedItemActivities']],
          radiusStyle: true,
          onToggle: (index) {
            setState(() {
              if (widget.item['allowedItemActivities'] == 'BOTH') {
                activityType = index == 0 ? 'RENT' : 'BUY';
              } else {
                activityType = widget.item['allowedItemActivities'];
              }
            });
          },
        ),
        const SizedBox(height: 10),
        const Text(
          'Select date range to check for availability.',
        ),
        const SizedBox(height: 10),
        SfDateRangePicker(
          onSelectionChanged: _onSelectionChanged,
          selectionMode: activityType == 'RENT'
              ? DateRangePickerSelectionMode.range
              : DateRangePickerSelectionMode.single,
          enablePastDates: false,
          minDate: DateTime.now(),
          maxDate: DateTime.now().add(const Duration(days: 30)),
        ),
        _range.isNotEmpty && _startDate != null
            ? activityType == 'RENT'
                ? Text('Selected range: $_range')
                : Text(
                    'Issue date: ${DateFormat('dd/MM/yyyy').format(_startDate!)}')
            : const SizedBox(height: 0),
        const SizedBox(height: 10),
        ElevatedButton(
          child: const Text('Check Availability'),
          onPressed: () async {
            if (_startDate == null) {
              CustomSnackbars.error('Please select a valid range!');
              return;
            }
            try {
              var count = await _itemProvider.findItemAvailability(
                  _startDate?.toIso8601String(),
                  _endDate?.toIso8601String() ?? _startDate?.toIso8601String(),
                  activityType,
                  widget.item['node']['_id']);
              setState(() {
                _maxCount = count;
              });
            } catch (e) {
              CustomSnackbars.error("Something went wrong!");
            }
          },
        ),
        const SizedBox(height: 10),
        Visibility(
          child: Text('Max. available qty: $_maxCount'),
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
              const Text("Select number of items to buy/rent/borrow."),
              const SizedBox(height: 10),
              Row(
                mainAxisAlignment: MainAxisAlignment.center,
                children: <Widget>[
                  // counter
                  _createIncrementDecrementButton(
                      Icons.remove, Colors.red, _decrement, _currentCount <= 0),
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
                  _createIncrementDecrementButton(Icons.add, Colors.green,
                      _increment, _currentCount >= _maxCount),
                ],
              ),
              const SizedBox(height: 10),
              Visibility(
                child: const Text('You need to get atleast 1 item.'),
                visible: _currentCount == 0,
              ),
              const SizedBox(height: 10),
              ElevatedButton.icon(
                icon: const Icon(Icons.check),
                label: const Text('Place order'),
                onPressed: _currentCount == 0
                    ? null
                    : () async {
                  Map<String, dynamic> mutObj = {};
                  try {
                    if (activityType == 'BUY') {
                      await _itemProvider.buyItem(widget.item['node']['_id'], _currentCount, _startDate.toString());
                    } else {
                      await _itemProvider.rentItem(widget.item['node']['_id'], _currentCount, _startDate.toString(), _endDate.toString());
                    }
                    CustomSnackbars.success("Order placed successfully.");
                    setState(() {
                      _currentCount = 0;
                      _maxCount = -1;
                    });
                  } catch (e) {
                    CustomSnackbars.error("Unable to place order!");
                  }
                },
              ),
              const SizedBox(height: 10),
            ],
          ),
        ),
      ],
    );
  }
}
