import {Component} from '@angular/core';
import {IonicPage, Loading, LoadingController, NavController, NavParams} from 'ionic-angular';
import * as AWS from "aws-sdk";
import * as Comprehend from "aws-sdk/clients/comprehend"
import {NotesServiceProvider} from "../../providers/notes-service/notes-service";

@IonicPage()
@Component({
  selector: 'page-edit-note',
  templateUrl: 'edit-note.html',
})
export class EditNotePage {
  detectedText: String = "";
  loadingView: Loading;

  constructor(public navCtrl: NavController,
              public navParams: NavParams,
              public loadingController: LoadingController,
              public notesService: NotesServiceProvider) {
    const name = navParams.get("name");

    this.loadingView = loadingController.create();
    this.loadingView.present();

    const thiz = this;
    let rekognition = new AWS.Rekognition();
    rekognition.detectText({
      Image: {
        S3Object: {
          Bucket: "notaker",
          Name: name
        }
      }
    }, function (err, data) {
      thiz.loadingView.dismiss();

      console.log(err);
      console.log(data);

      thiz.detectedText = data.TextDetections
        .filter(value => value.Type == "WORD")
        .map(value => value.DetectedText)
        .join(" ");
    })
  }

  cancelNewNote() {
    this.navCtrl.pop();
  }

  saveNewNote() {
    this.loadingView = this.loadingController.create();
    this.loadingView.present();

    let thiz = this;
    let comprehend = new Comprehend();
    comprehend.detectEntities({
      Text: this.detectedText.toString(),
      LanguageCode: "en"
    }, function(err, data) {
      thiz.loadingView.dismiss();

      console.log(err);
      console.log(data);

      const tags = data.Entities
        .filter(e => e.Type != "QUANTITY")
        .map(e => e.Text);

      thiz.notesService.addNote({
        book: "",
        author: "",
        quote: thiz.detectedText,
        tags: tags
      }).then(
        () => thiz.navCtrl.pop()
      );
    });
  }
}
