class Car {
  #brand;
  #model;
  speed = 0;
  isTruckOpen = false;

  constructor(carDetails) {
    this.#brand = carDetails.brand;
    this.#model = carDetails.model;
  }

  displayInfo() {
    console.log(`${this.#brand} ${this.#model}, Speed: ${this.speed}km/h, isTrunkOpen: ${this.isTruckOpen} `);
  }

  go() {
    if(this.speed < 200 && this.isTruckOpen === false){
      this.speed += 5;
    }
  }

  brake() {
    this.speed -= 5;
  }

  openTrunk() {
    if(this.speed === 0){
      this.isTruckOpen = true;
    }
  }

  closeTrunk() {
    this.isTruckOpen = false;
  }
}

class RaceCar extends Car {
  acceleration;

  constructor(carDetails) {
    super(carDetails);
    this.acceleration = carDetails.acceleration;
  }

  go() {
    if(this.speed < 300){
      this.speed += this.acceleration;
    }
  }

  openTrunk(){
    this.isTruckOpen = false;
  }
}

const car1 = new Car({
  brand: 'Toyota', model: 'Corolla'
});
const car2 = new Car({
  brand: 'Tesla', model: 'Model 3'
});
const car3 = new RaceCar({
  brand: 'McLaren', model: 'F1', acceleration: 20
});

console.log(car1);
console.log(car2);
car1.go();
car1.go();
car1.go();
car1.brake();
car2.go();
car2.brake();
car2.openTrunk();
car1.openTrunk();
car2.closeTrunk();
car2.go();
car3.go();
car3.go();
car3.brake();
car1.displayInfo();
car2.displayInfo();
car3.displayInfo();