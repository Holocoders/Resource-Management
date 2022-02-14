import 'package:flutter/material.dart';
import 'package:intl/intl.dart';
import 'package:syncfusion_flutter_datepicker/datepicker.dart';

typedef CounterCallback = void Function();

class AvailabilityView extends StatefulWidget {
  const AvailabilityView({Key? key}) : super(key: key);

  @override
  _AvailabilityViewState createState() => _AvailabilityViewState();
}

class _AvailabilityViewState extends State<AvailabilityView> {
  String _range = '';
  int _currentCount = 0;
  late DateTime _startDate;
  late DateTime? _endDate;

  void _onSelectionChanged(DateRangePickerSelectionChangedArgs args) {
    setState(() {
      if (args.value is PickerDateRange) {
        _startDate = args.value.startDate;
        _endDate = args.value.endDate;
        _range = '${DateFormat('dd/MM/yyyy').format(args.value.startDate)} -'
            ' ${DateFormat('dd/MM/yyyy').format(args.value.endDate ?? args.value.startDate)}';
      }
    });
  }

  void _increment() {
    setState(() {
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

  Widget _createIncrementDicrementButton(IconData icon, Color fillColor, CounterCallback onPressed) {
    return RawMaterialButton(
      materialTapTargetSize: MaterialTapTargetSize.shrinkWrap,
      constraints: BoxConstraints(minWidth: 32.0, minHeight: 32.0),
      onPressed: onPressed,
      elevation: 2.0,
      fillColor: fillColor,
      child: Icon(
        icon,
        color: Colors.black,
        size: 12.0,
      ),
      shape: CircleBorder(),
    );
  }

  @override
  Widget build(BuildContext context) {
    return Column(
      children: <Widget>[
        const SizedBox(height: 20),
        Text(
          'Select date range to check for availability.',
        ),
        const SizedBox(height: 10),
        SfDateRangePicker(
          onSelectionChanged: _onSelectionChanged,
          selectionMode: DateRangePickerSelectionMode.range,
          enablePastDates: false,
          maxDate: DateTime.now().add(Duration(days: 30)),
        ),
        const SizedBox(height: 10),
        Column(
          mainAxisAlignment: MainAxisAlignment.spaceEvenly,
          mainAxisSize: MainAxisSize.min,
          crossAxisAlignment: CrossAxisAlignment.start,
          children: <Widget>[
            Text('Selected range: $_range'),
          ],
        ),
        const SizedBox(height: 10),
        ElevatedButton(
          onPressed: () {},
          child: Text('Check Availability'),
        ),
        const SizedBox(height: 10),
        const Text('Pick the number of items you want to buy/rent/borrow.'),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: <Widget>[
            // counter
            _createIncrementDicrementButton(Icons.remove, Colors.red, _decrement),
            const SizedBox(width: 5),
            FocusScope(
                child: Focus(
                    onFocusChange: (focus) => print("focus: $focus"),
                    child: SizedBox(
                      width: MediaQuery.of(context).size.width * 0.3,
                      child: TextField(
                        textAlign: TextAlign.center,
                        controller: TextEditingController(text: _currentCount.toString()),
                        enableInteractiveSelection: false,
                        cursorHeight: 0,
                        cursorWidth: 0,
                        keyboardType: TextInputType.number,
                      ),
                    )
                )
            ),
            const SizedBox(width: 5),
            _createIncrementDicrementButton(Icons.add, Colors.green, _increment),
          ],
        ),
        const SizedBox(height: 10),
        Row(
          mainAxisAlignment: MainAxisAlignment.center,
          children: [
            ElevatedButton.icon(
              onPressed: () {
                showDialog(context: context, builder: (context) => Text("hi"));
              },
              icon: Icon(Icons.check),
              label: Text('Buy'),
            ),
            SizedBox(width: 10),
            ElevatedButton.icon(
              onPressed: () {},
              icon: Icon(Icons.vpn_key),
              label: Text('Borrow'),
            ),
          ],
        ),
      ],
    );
  }
}
