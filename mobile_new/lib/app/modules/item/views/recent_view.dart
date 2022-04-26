import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:mobile_new/app/modules/item/controllers/recent_controller.dart';
import 'package:mobile_new/app/modules/item/bindings/item_binding.dart';
import 'item_view.dart';

class RecentView extends GetView<RecentController> {
  late final String? uniqueTag;

  @override
  String? get tag => uniqueTag;

  RecentView({Key? key}) : super(key: key) {
    final id = Get.arguments;
    uniqueTag = id.toString();
  }

  @override
  Widget build(BuildContext context) {
    return controller.obx((items) {
      return Column(
        children: [
          const SizedBox(height: 20),
          const Text(
            'Also got with',
            style: TextStyle(
              fontSize: 20,
              fontWeight: FontWeight.bold,
            ),
          ),
          const SizedBox(height: 10),
          Wrap(
            runSpacing: 4,
            spacing: 4,
            alignment: WrapAlignment.center,
            children: List.generate(items.length, (index) {
              return GestureDetector(
                onTap: () {
                  Get.to(() => ItemView(),
                      arguments: items[index]['node']['_id'],
                      preventDuplicates: false,
                      binding: ItemBinding(tag: items[index]['node']['_id']));
                },
                child: Container(
                  decoration: BoxDecoration(
                    borderRadius: BorderRadius.circular(10),
                  ),
                  width: MediaQuery.of(context).size.width / 2.2,
                  height: 200,
                  alignment: Alignment.center,
                  child: SingleChildScrollView(
                    physics: const NeverScrollableScrollPhysics(),
                    child: Column(
                      children: [
                        CircleAvatar(
                          backgroundImage: NetworkImage(
                              'http://10.0.2.2:3000/${items[index]['node']['_id']}'),
                          radius: MediaQuery.of(context).size.width / 7,
                        ),
                        const SizedBox(height: 20),
                        Text(
                          items[index]['name'],
                          textAlign: TextAlign.center,
                        ),
                      ],
                    ),
                  ),
                ),
              );
            }),
          )
        ],
      );
    });
  }
}
