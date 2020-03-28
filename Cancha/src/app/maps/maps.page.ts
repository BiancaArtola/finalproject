import { Component, OnInit } from '@angular/core';
import {
  ToastController,
  Platform
} from '@ionic/angular';
import {
  GoogleMaps,
  GoogleMap,
  GoogleMapsEvent,
  Marker,
  GoogleMapsAnimation,
  MyLocation
} from '@ionic-native/google-maps';
import { ActivatedRoute, Params } from '@angular/router';

interface Marcadores {
  titulo: string;
  subtitulo: string;
  latitud: number,
  longitud: number
}

@Component({
  selector: 'app-maps',
  templateUrl: './maps.page.html',
  styleUrls: ['./maps.page.scss'],
})

export class MapsPage implements OnInit {

  map: GoogleMap;
  address: string;

  latitud: number;
  longitud: number;
  //markers: Marker[];

  canchas= [{ lat: -38.7162826, lng: -62.2583714 },{ lat: -38.7164612, lng: -61.3221848 }];

  constructor(public toastCtrl: ToastController, private platform: Platform,
    private route: ActivatedRoute) { }

  ngOnInit() {
    // this.route.params.subscribe((params: Params) => {
    //   this.canchas = params['canchas'];
      console.log("viendo ",this.canchas);
      
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    this.platform.ready();
    this.loadMap();
    //});
  }

  loadMap() {
    this.map = GoogleMaps.create('map_canvas', {
      // camera: {
      //   target: {
      //     lat: 43.0741704,
      //     lng: -89.3809802
      //   },
      //   zoom: 18,
      //   tilt: 30
      // }
    });
    this.goToMyLocation();
  }


  goToMyLocation() {
    this.map.clear();

    // Get the location of you
    this.map.getMyLocation().then((location: MyLocation) => {

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 15,
        duration: 5000
      });

      this.addMarker();


      let marker: Marker = this.map.addMarkerSync({
        title: 'Tu ubicación actual',
        position: location.latLng,
        animation: GoogleMapsAnimation.BOUNCE
      });

      //show the infoWindow
      marker.showInfoWindow();

      //If clicked it, display the alert
      marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
        this.showToast('clicked!');
      });

      this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
        (data) => {
          console.log("Click MAP", data);
        }
      );
    })
      .catch(err => {
        //this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  addMarker() { 
    let markers = new Array();
    let contador:number = 0;

    this.canchas.forEach(element => {
      markers[contador] = this.map.addMarkerSync({
        title: "puto",
        position: element,
        animation: GoogleMapsAnimation.BOUNCE
      });
      markers[contador].showInfoWindow();

      contador = contador++;
    });
  
  }


  async showToast(message: string) {
    let toast = await this.toastCtrl.create({
      message: message,
      duration: 2000,
      position: 'middle'
    });
    toast.present();
  }
}


