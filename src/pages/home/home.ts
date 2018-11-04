import {Component} from '@angular/core';
import {AlertController, Loading, LoadingController, NavController} from 'ionic-angular';
import {Camera} from "@ionic-native/camera";
import * as AWS from "aws-sdk";
import {File} from "@ionic-native/file";
import {EditNotePage} from "../edit-note/edit-note";
import {NotesServiceProvider} from "../../providers/notes-service/notes-service";
import {AwsCredentials} from "../../app/aws-credentials";

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {
  s3: AWS.S3;
  loadingView: Loading;

  constructor(public navCtrl: NavController,
              public camera: Camera,
              public file: File,
              public notesService: NotesServiceProvider,
              public alertController: AlertController,
              public loadingController: LoadingController) {
    AwsCredentials.init();

    this.s3 = new AWS.S3({
      apiVersion: "2006-03-01",
      params: {
        Bucket: "notaker"
      }
    });
  }

  takePicture() {
    const thiz = this;

    this.camera.getPicture({
      quality: 100,
      encodingType: this.camera.EncodingType.JPEG
    }).then((fileUri) => {
      this.loadingView = this.loadingController.create({
        content: "Uploading..."
      });
      this.loadingView.present();

      console.log(fileUri);

      const index: number = fileUri.lastIndexOf('/') + 1;
      const dir = fileUri.substring(0, index);
      const name = fileUri.substring(index);

      console.log(dir);
      console.log(name);

      this.file.readAsArrayBuffer(dir, name).then(
        buffer => {
          this.s3.upload({
            Bucket: "notaker",
            Key: name,
            Body: buffer,
            ACL: "public-read"
          }, function (err, data: AWS.S3.ManagedUpload.SendData) {
            console.log(err);
            console.log(data);

            thiz.loadingView.dismiss();
            thiz.navCtrl.push(EditNotePage, {name: data.Key});
          });
        }
      );
    })
  }

  deleteNote(noteNumber: number) {
    let alert = this.alertController.create({
      title: "Delete?",
      buttons: [{
        text: "OK",
        handler: () => this.notesService.deleteNote(noteNumber)
      }, {
        text: "Cancel"
      }]
    });
    alert.present();
  }
}
