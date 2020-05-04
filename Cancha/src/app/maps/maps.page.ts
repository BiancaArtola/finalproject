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
import { ActivatedRoute, Params, Router } from '@angular/router';

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
  data;
  canchas = [{ lat: -38.7162826, lng: -62.2583714 }, { lat: -38.7164612, lng: -61.3221848 }];

  constructor(public toastCtrl: ToastController, private platform: Platform,
    private route: ActivatedRoute, private router: Router) {
    this.route.queryParams.subscribe(params => {
      if (params && params.special) {
        this.data = JSON.parse(params.special);
      }
    });
  }

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
        animation: GoogleMapsAnimation.BOUNCE,
        icon: 'http://maps.google.com/mapfiles/ms/icons/red-dot.png'
      });

      //show the infoWindow
      marker.showInfoWindow();

      //If clicked it, display the alert
      // marker.on(GoogleMapsEvent.MARKER_CLICK).subscribe(() => {
      //   this.showToast('clicked!');
      // });

      // this.map.on(GoogleMapsEvent.MAP_READY).subscribe(
      //   (data) => {
      //     console.log("Click MAP", data);
      //   }
      // );
    })
      .catch(err => {
        //this.loading.dismiss();
        this.showToast(err.error_message);
      });
  }

  addMarker() {
    let markers = new Array();
    let contador: number = 0;

    this.data.forEach(element => {   
      var nombre = element.nombre;
      var nombreCapitalize = nombre.charAt(0).toUpperCase() + nombre.slice(1);
      markers[contador] = this.map.addMarkerSync({
        title: nombreCapitalize,
        position: { lat: element.coordenadas[0], lng: element.coordenadas[1] },
        animation: GoogleMapsAnimation.BOUNCE,
        icon: 'http://maps.google.com/mapfiles/ms/icons/purple-dot.png'
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


