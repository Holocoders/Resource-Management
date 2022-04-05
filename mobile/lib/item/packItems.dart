import 'package:flutter/material.dart';
import 'package:get/get_core/src/get_main.dart';
import 'package:get/get_navigation/src/extension_navigation.dart';
import 'package:resource_management_system/item/item.dart';

class PackItems extends StatelessWidget {
  final Map<String, dynamic> item;
  const PackItems({Key? key, required this.item}) : super(key: key);

  String getDescription(String description) {
    if (description.length > 100) {
      return description.substring(0, 100) + '...';
    }
    return description;
  }

  @override
  Widget build(BuildContext context) {
    var packItems = item['packItems'];
    return SingleChildScrollView(
      physics: const ScrollPhysics(),
      child: Column(
        children: <Widget>[
          const SizedBox(
            height: 20,
          ),
          const Text(
            'Items in pack',
            style: TextStyle(fontSize: 20),
          ),
          const SizedBox(
            height: 10,
          ),
          ListView.builder(
            physics: const NeverScrollableScrollPhysics(),
            itemCount: packItems?.length,
            shrinkWrap: true,
            itemBuilder: (BuildContext context, int index) {
              return GestureDetector(
                onTap: () {
                  Get.toNamed(Item.route, arguments: packItems[index]['item']['node']['_id']);
                },
                child: Card(
                  elevation: 2,
                  shape: RoundedRectangleBorder(
                    side: const BorderSide(
                      color: Colors.grey,
                      width: 0.2,
                    ),
                    borderRadius: BorderRadius.circular(15),
                  ),
                  margin: const EdgeInsets.symmetric(
                    horizontal: 10.0,
                    vertical: 6.0,
                  ),
                  child: Container(
                    decoration: BoxDecoration(
                      borderRadius: BorderRadius.circular(5),
                    ),
                    child: ListTile(
                      contentPadding: const EdgeInsets.symmetric(
                        horizontal: 20.0,
                        vertical: 10.0,
                      ),
                      title: Text(
                        "${packItems[index]['item']['name']}",
                        style:
                        const TextStyle(fontWeight: FontWeight.bold),
                      ),
                      trailing: const IconButton(
                        icon: Icon(Icons.keyboard_arrow_right),
                        splashColor: Colors.transparent,
                        onPressed: null,
                      ),
                      subtitle: Column(
                        crossAxisAlignment: CrossAxisAlignment.start,
                        children: <Widget>[
                          const SizedBox(height: 5.0),
                          Text(
                            getDescription(packItems[index]['item']['description'].toString()),
                          ),
                          const SizedBox(height: 5.0),
                          Text(
                            "Quantity: ${packItems[index]['quantity']}",
                          ),
                        ],
                      ),
                    ),
                  ),
                ),
              );
            },
          )
        ],
      ),
    );
  }
}
