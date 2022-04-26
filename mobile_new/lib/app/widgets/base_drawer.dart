import 'dart:convert';
import 'dart:io';
import 'package:flutter/material.dart';
import 'package:get/get.dart';
import 'package:dio/dio.dart' as http;
import 'package:image_picker/image_picker.dart';
import 'package:mobile_new/app/routes/app_pages.dart';
import 'package:mobile_new/app/widgets/snackbars.dart';

import 'package:mobile_new/app/services/camera_image_picker.dart';
import 'package:mobile_new/app/services/user_service.dart';

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
      RegExp urlRegex = RegExp(r'^(http|https)://');
      if (widget.imagePath!.startsWith(urlRegex)) {
        return Image.network(widget.imagePath!,
            errorBuilder: (context, error, stackTrace) {
          return Row(
            mainAxisAlignment: MainAxisAlignment.center,
            children: [
              Icon(
                Icons.error,
                color: Theme.of(context).errorColor,
              ),
              const SizedBox(width: 10),
              const Text('Error loading image'),
            ],
          );
        });
      }
      return Image.file(File(widget.imagePath!));
    } else {
      return Wrap(
        crossAxisAlignment: WrapCrossAlignment.center,
        children: [
          Icon(
            Icons.error,
            color: Theme.of(context).errorColor,
          ),
          const SizedBox(width: 10),
          const Text('No image to preview'),
        ],
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
          PreviewImage(
              imagePath: _imageFile ??
                  'http://10.0.2.2:3000/${Get.find<UserService>().user.value.id}?${DateTime.now()}'),
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
  String profilePicUrl = "";

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
    profilePicUrl =
        'http://10.0.2.2:3000/${Get.find<UserService>().user.value.id}?${DateTime.now()}';
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
                  Padding(
                    padding: const EdgeInsets.fromLTRB(0, 10, 20, 0),
                    child: Row(
                      mainAxisAlignment: MainAxisAlignment.center,
                      crossAxisAlignment: CrossAxisAlignment.center,
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
                                      profilePicUrl =
                                          'http://10.0.2.2:3000/${Get.find<UserService>().user.value.id}?${DateTime.now()}';
                                      CustomSnackbars.success(
                                        "Profile picture updated",
                                      );
                                    } catch (e) {
                                      CustomSnackbars.success(
                                        "Error updating profile picture!",
                                      );
                                    }
                                  }
                                  setState(() {
                                    Navigator.of(Get.overlayContext!).pop();
                                  });
                                },
                              ),
                            );
                          },
                          child: CircleAvatar(
                            child: ClipOval(
                              child: Image.network(
                                profilePicUrl,
                                fit: BoxFit.cover,
                                height: 80,
                                width: 80,
                                errorBuilder: (context, url, error) {
                                  return const CircleAvatar(
                                    child: Icon(
                                      Icons.person,
                                      size: 40,
                                    ),
                                  );
                                },
                              ),
                            ),
                            key: ValueKey(profilePicUrl),
                            radius: 40,
                          ),
                        ),
                        const SizedBox(width: 10),
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
                  const SizedBox(height: 10),
                  Row(
                    mainAxisAlignment: MainAxisAlignment.center,
                    children: const [
                      Icon(
                        Icons.info_outline,
                      ),
                      SizedBox(width: 10),
                      Text('Click on the avatar to edit!'),
                    ],
                  ),
                ],
              ),
            ),
          ),
          Container(
            alignment: Alignment.center,
            child: Column(children: [
              ListTile(
                leading: const Icon(Icons.search),
                title: const Text('Search'),
                onTap: () {
                  Get.toNamed(Routes.SEARCH_BAR);
                },
              ),
              ListTile(
                leading: const Icon(Icons.home),
                title: const Text('Facilities'),
                onTap: () {
                  Get.toNamed(Routes.NODE);
                },
              ),
              ListTile(
                leading: const Icon(Icons.calendar_today),
                title: const Text('My activities'),
                onTap: () {
                  Get.toNamed(Routes.USER_ACTIVITIES);
                },
              ),
              ListTile(
                leading: const Icon(Icons.calendar_month),
                title: const Text('All activities'),
                onTap: () {
                  Get.toNamed(Routes.ADMIN_ACTIVITIES);
                },
              )
            ]),
          )
        ],
      ),
    );
  }
}
