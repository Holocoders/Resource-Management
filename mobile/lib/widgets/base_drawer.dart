import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:dio/dio.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:resource_management_system/facilities_categories/facilities.dart';
import 'package:resource_management_system/widgets/snackbars.dart';
import '../activities/activities.dart';
import '../auth/user_service.dart';
import 'camera_image_picker.dart';

class PreviewImage extends StatefulWidget {
  final String? imagePath;
  const PreviewImage({Key? key, required this.imagePath}) : super(key: key);

  @override
  State<PreviewImage> createState() => _PreviewImageState();
}

class _PreviewImageState extends State<PreviewImage> {
  @override
  Widget build(BuildContext context) {
    if (widget.imagePath != null) {
      return Image.file(File(widget.imagePath!));
    } else {
      return Image.network(
        'http://10.0.2.2:3000/${Get.find<UserService>().user.value.id}',
      );
    }
  }
}

typedef OnImagePickedCallback = void Function(File? image);

Widget pickAndEditImageDialog(BuildContext context,
    {required OnImagePickedCallback onImagePicked}) {
  String? _imageFile;
  return StatefulBuilder(
    builder: (context, setState) {
      return Column(
        children: [
          Wrap(
            alignment: WrapAlignment.center,
            children: [
              TextButton.icon(
                icon: const Icon(Icons.camera),
                label: const Text("Camera"),
                onPressed: () {
                  onImageButtonPressed(
                    ImageSource.camera,
                    context: context,
                    capturedImageFile: (s) {
                      setState(() {
                        if (s == null) {
                          _imageFile = null;
                        } else {
                          _imageFile = s;
                        }
                      });
                    },
                  );
                },
              ),
              const SizedBox(width: 10),
              TextButton.icon(
                icon: const Icon(Icons.file_upload_sharp),
                label: const Text("Browse"),
                onPressed: () {
                  onImageButtonPressed(
                    ImageSource.gallery,
                    context: context,
                    capturedImageFile: (s) {
                      setState(() {
                        if (s == null) {
                          _imageFile = null;
                        } else {
                          _imageFile = s;
                        }
                      });
                    },
                  );
                },
              )
            ],
          ),
          const SizedBox(height: 10),
          PreviewImage(imagePath: _imageFile),
          const SizedBox(height: 10),
          TextButton.icon(
            icon: const Icon(Icons.check),
            label: const Text("Submit"),
            style: ElevatedButton.styleFrom(
              minimumSize: const Size.fromHeight(50),
            ),
            onPressed: () {
              if (_imageFile == null) {
                onImagePicked(null);
                return;
              }
              onImagePicked(File(_imageFile!));
            },
          ),
        ],
      );
    },
  );
}

class BaseDrawer extends StatefulWidget {
  const BaseDrawer({Key? key}) : super(key: key);

  @override
  State<BaseDrawer> createState() => _BaseDrawerState();
}

class _BaseDrawerState extends State<BaseDrawer> {
  _updateProfilePicture(file) async {
    var dio = http.Dio();
    dio.options.headers['Authorization'] =
        'Bearer ' + Get.find<UserService>().user.value.token;
    var operations = {
      'query': '''
                mutation updateProfilePicture(\$file: Upload!) {
                  updateProfilePicture(file: \$file)
                }
              ''',
      'variables': {'file': null},
    };
    var map = {
      'file': ['variables.file'],
    };
    http.FormData formData = http.FormData.fromMap({
      'operations': json.encode(operations),
      'map': json.encode(map),
      'file': http.MultipartFile.fromFileSync(file.path,
          filename: file.path.split('/').last),
    });
    return dio.post('http://10.0.2.2:3000/graphql', data: formData);
  }

  @override
  Widget build(BuildContext context) {

    var userPic = 'http://10.0.2.2:3000/${Get.find<UserService>().user.value.id}?' + DateTime.now().toString();

    return Drawer(
      child: ListView(
        // Important: Remove any padding from the ListView.
        padding: EdgeInsets.zero,
        children: [
          DrawerHeader(
            decoration: BoxDecoration(
              color: Theme.of(context).colorScheme.primary,
            ),
            child: SingleChildScrollView(
              child: Column(
                children: [
                  TextButton(
                    onPressed: () {
                      Get.defaultDialog(
                        title: "Update Profile Picture",
                        content: pickAndEditImageDialog(
                          context,
                          onImagePicked: (image) async {
                            if (image != null) {
                              try {
                                await _updateProfilePicture(image);
                                CustomSnackbars.success(
                                    "Profile picture updated");
                              } catch (e) {
                                CustomSnackbars.success(
                                    "Error updating profile picture!");
                              }
                            }
                            setState(() {
                              userPic = 'http://10.0.2.2:3000/${Get.find<UserService>().user.value.id}?' + DateTime.now().toString();
                              Navigator.of(Get.overlayContext!).pop();
                            });
                          },
                        ),
                      );
                    },
                    child: CircleAvatar(
                      backgroundImage: NetworkImage(userPic),
                      radius: 40,
                      key: ValueKey(userPic),
                    ),
                  ),
                  const SizedBox(height: 15),
                  Text(
                    Get.find<UserService>().user.value.name,
                    style: const TextStyle(
                      color: Colors.white,
                      fontSize: 20,
                    ),
                  ),
                ],
              ),
            ),
          ),
          Container(
            alignment: Alignment.center,
            child: Column(children: [
              ListTile(
                leading: const Icon(Icons.home),
                title: const Text('Facilities'),
                onTap: () {
                  Get.toNamed(Facilities.route);
                },
              ),
              ListTile(
                leading: const Icon(Icons.calendar_today),
                title: const Text('My activities'),
                onTap: () {
                  Get.toNamed(Activities.route);
                },
              ),
            ]),
          )
        ],
      ),
    );
  }
}
