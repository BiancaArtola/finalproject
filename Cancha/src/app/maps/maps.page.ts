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
  //marcadores: Marcadores;

  constructor(public toastCtrl: ToastController, private platform: Platform) { }

  ngOnInit() {
    // Since ngOnInit() is executed before `deviceready` event,
    // you have to wait the event.
    this.platform.ready();
    this.loadMap();
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
      console.log(JSON.stringify(location, null, 2));

      // Move the map camera to the location with animation
      this.map.animateCamera({
        target: location.latLng,
        zoom: 17,
        duration: 5000
      });

      // this.marcadores.titulo = "UNO bahia club"
      // this.marcadores.subtitulo= "Lavalle 32"
      // this.marcadores.latitud=-38.7162826;
      // this.marcadores.longitud = -62.2583714;

      var myLatLng = { lat: this.latitud, lng: this.longitud };

      this.addMarker(myLatLng);
      // //add a marker
      // let marker: Marker = this.map.addMarkerSync({
      //   title: '@ionic-native/google-maps plugin!',
      //   snippet: 'This plugin is awesome!',
      //   position: location.latLng,
      //   animation: GoogleMapsAnimation.BOUNCE
      // });

      // //show the infoWindow
      // marker.showInfoWindow();

      // //If clicked it, display the alert
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   this.showToast('clicked!');
      // });

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

  addMarker(position) {
    //add a marker
    let marker: Marker = this.map.addMarkerSync({
      title: "Titutlo",
      snippet: "Subtitulo",
      position: position,
      animation: GoogleMapsAnimation.BOUNCE
    });

    //show the infoWindow
    marker.showInfoWindow();

    //If clicked it, display the alert
    marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      this.showToast('clicked!');
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


