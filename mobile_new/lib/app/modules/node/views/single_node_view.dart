import 'package:flutter/material.dart';

import 'package:get/get.dart';
import 'package:mobile_new/app/services/theme/app_colors.dart';

class SingleNodeView extends GetView {
  final index;
  final data;
  final onDelete;

  SingleNodeView(this.data, this.index, this.onDelete, {Key? key})
      : super(key: key);

  @override
  Widget build(BuildContext context) {
    final _node = data[index];
    return Card(
      elevation: 2,
      color: Theme.of(context).cardColor,
      margin: const EdgeInsets.only(top: 10, left: 5, right: 5),
      shape: RoundedRectangleBorder(
        borderRadius: BorderRadius.circular(15),
      ),
      child: Column(
          crossAxisAlignment: CrossAxisAlignment.center,
          mainAxisAlignment: MainAxisAlignment.spaceBetween,
          children: [
            Container(
              width: double.infinity,
              decoration: BoxDecoration(color: () {
                var nodeType = _node['node']['type'];
                if (nodeType == 'ITEM') {
                  return AppColors.itemColor;
                } else if (nodeType == 'PACK') {
                  return AppColors.packColor;
                } else if (nodeType == 'FACILITY') {
                  return AppColors.facilityColor;
                } else {
                  return AppColors.categoryColor;
                }
              }()),
              child: Row(
                mainAxisAlignment: MainAxisAlignment.spaceBetween,
                children: [
                  const Spacer(
                    flex: 1,
                  ),
                  Flexible(
                    flex: 4,
                    child: Text(
                      _node['name'],
                      textAlign: TextAlign.center,
                      style: Theme.of(context).textTheme.headline6,
                    ),
                  ),
                  Flexible(
                    fit: FlexFit.loose,
                    flex: 3,
                    child: IconButton(
                      onPressed: () => showDialog(
                          context: context,
                          builder: (context) {
                            return AlertDialog(
                              title: const Text('Description'),
                              content: Text(_node['description']),
                            );
                          }),
                      icon: const Icon(Icons.info_outline_rounded),
                    ),
                  )
                ],
              ),
            ),
            Image(
              image:
                  NetworkImage('http://10.0.2.2:3000/${_node['node']['_id']}'),
              width: 80,
              height: 80,
            ),
            () {
              var nodeType = _node['node']['type'];
              if (nodeType == 'ITEM' || nodeType == 'PACK') {
                return Chip(
                  label: Text('Quantity : ${_node['quantity']}'),
                  backgroundColor: AppColors.itemColor,
                );
              }
              return Row(
                mainAxisAlignment: MainAxisAlignment.spaceEvenly,
                children: [
                  Chip(
                    label: Text('${_node['node']['categoryCount']} Categories'),
                    backgroundColor: AppColors.categoryColor,
                  ),
                  Chip(
                    label: Text('${_node['node']['itemCount']} Items'),
                    backgroundColor: AppColors.itemColor,
                  ),
                ],
              );
            }(),
            const SizedBox(
              height: 2,
            ),
            IconButton(
              icon: Icon(
                Icons.delete,
                color: Get.theme.errorColor,
              ),
              onPressed: () => onDelete(_node['node']['_id']),
            )
          ]),
    );
  }
}
