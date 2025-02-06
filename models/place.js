class Place {
    constructor(title, imageUri, address, location){
        this.title = title;
        this.imageUri = imageUri;
        this.address = address;
        this.location = location;// { lat: 0.1455, lng: 127,127}
        this.id = new Date().toString() + Math.random().toString();
    }
}



