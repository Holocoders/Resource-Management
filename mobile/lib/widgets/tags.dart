import 'package:flutter/material.dart';

class Tag extends StatelessWidget {
  final String _text;
  final Color _color;

  const Tag(this._text, this._color);

  @override
  Widget build(BuildContext context) {
    return Container(
      decoration: BoxDecoration(
        borderRadius: BorderRadius.circular(10),
        color: _color,
      ),
      child: Padding(
        padding: const EdgeInsets.all(4),
        child: Text(
          _text,
          style: Theme.of(context).textTheme.bodyText1,
        ),
      ),
    );
  }
}
