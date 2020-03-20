import { Component, OnInit, Input } from '@angular/core';
import { NavParams } from '@ionic/angular';
import { FirebaseAuth } from 'src/services/FirebaseAuth';
import { Storage } from '@ionic/storage';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.page.html',
  styleUrls: ['./comments.page.scss'],
})
export class CommentsPage implements OnInit {
  @Input() id: number;
  private contenido: string;
  private usuario: string;

  constructor(private navParams: NavParams, private storage: Storage, private firebaseAuth: FirebaseAuth) {
    this.id = navParams.get('id');

  }

  ngOnInit() {
  }

  sendMessage() {
    this.storage.get('user').then((usuario) => {

      this.firebaseAuth.setComment(this.id, this.contenido, usuario)

    });


  }

}
