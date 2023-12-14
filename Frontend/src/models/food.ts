class Comida {
  id: number;
  guid?: string;
  name: string;
  description: string;
  price: GLfloat;
  quantity: number;
  observation?: string | undefined;
  files?: {
    id: number;
    guid: string;
    path: string;
  };
  category?: {
    id: number;
    guid: string;
    name: string;
    description: string;
  };
  dayOfWeek?: {
    id: number;
    guid: string;
    name: string;
  };

  constructor(
    id: number,
    guid: string,
    description: string,
    name: string,
    price: GLfloat,
    quantity: number,
    observation: string | undefined,
    files: {
      id: number;
      guid: string;
      path: string;
    },
    category: {
      id: number;
      guid: string;
      name: string;
      description: string;
    },
    dayOfWeek: {
      id: number;
      guid: string;
      name: string;
    }
  ) {
    this.id = id;
    this.guid = guid;
    this.description = description;
    this.name = name;
    this.price = price;
    this.files = files;
    this.category = category;
    this.dayOfWeek = dayOfWeek;
    this.quantity = 1;
    this.observation = observation;
  }
}

export default Comida;
