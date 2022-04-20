import 'package:get/get.dart';

import '../providers/search_provider.dart';

class SearchBarController extends GetxController {
  final SearchProvider _nodeProvider = Get.put(SearchProvider());

  getSuggestion(pattern) async {
    return await _nodeProvider.search(pattern);
  }
}
