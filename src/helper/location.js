class Location {
  constructor(address, name, longitude, latitude, queue_length) {
    this.address = address;
    this.name = name;
    this.longitude = longitude;
    this.latitude = latitude;
    this.queue_length = queue_length;
  }
}

const _Location = Location;
export { _Location as Location };
