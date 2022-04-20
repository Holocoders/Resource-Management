import 'dart:io';

import 'package:flutter/material.dart';
import 'package:image_cropper/image_cropper.dart';
import 'package:image_picker/image_picker.dart';

onImageButtonPressed(ImageSource source,
    {required BuildContext context,
    required CapturedImageFile capturedImageFile}) async {
  final ImagePicker _picker = ImagePicker();
  File? val;

  final pickedFile = await _picker.pickImage(
    source: source,
  );

  if (pickedFile == null) {
    capturedImageFile(null);
    return;
  }

  val = await ImageCropper().cropImage(
    sourcePath: pickedFile.path,
    aspectRatioPresets: Platform.isAndroid
        ? [
            CropAspectRatioPreset.square,
            CropAspectRatioPreset.ratio3x2,
            CropAspectRatioPreset.original,
            CropAspectRatioPreset.ratio4x3,
            CropAspectRatioPreset.ratio16x9
          ]
        : [
            CropAspectRatioPreset.original,
            CropAspectRatioPreset.square,
            CropAspectRatioPreset.ratio3x2,
            CropAspectRatioPreset.ratio4x3,
            CropAspectRatioPreset.ratio5x3,
            CropAspectRatioPreset.ratio5x4,
            CropAspectRatioPreset.ratio7x5,
            CropAspectRatioPreset.ratio16x9
          ],
    androidUiSettings: AndroidUiSettings(
      toolbarTitle: 'Cropper',
      toolbarColor: Theme.of(context).colorScheme.primary,
      toolbarWidgetColor: Colors.white,
      initAspectRatio: CropAspectRatioPreset.original,
      lockAspectRatio: false,
    ),
    iosUiSettings: const IOSUiSettings(
      title: 'Cropper',
    ),
  );
  if (val != null) {
    capturedImageFile(val.path);
    return;
  }
  capturedImageFile(null);
}

typedef CapturedImageFile = void Function(String?);
