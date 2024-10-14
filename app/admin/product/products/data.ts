export const data: Sneaker[] = [
    {
      id: "m5gr84i9",
      marque: "nike",
      model: "air force",
      amount: 316,
      quantity: 5,
      status: false,
      category: "men",
      image: ""
    },
    {
      id: "3u1reuv4",
      marque: "adidas",
      model: "yezu 360",
      amount: 250,
      quantity: 6,
      status: false,
      category: "mixte",
      image: ""
    },
    {
      id: "derv1ws0",
      marque: "puma",
      model: "force",
      amount: 230,
      quantity: 7,
      status: false,
      category: "men",
      image: ""
    },
    {
      id: "5kma53ae",
      marque: "jordan",
      model: "air force",
      amount: 160,
      quantity: 3,
      status: false,
      category: "men",
      image: ""
    },
    {
      id: "bhqecj4p",
      marque: "nike",
      model: "360",
      amount: 450,
      quantity: 8,
      status: false,
      category: "men",
      image: ""
    },
  ]
  
  export type Sneaker = {
    id: string;
    marque: string;
    model: string;
    amount: number;
    quantity: number;
    status?: boolean;
    category?: string;
    image: string;
  }
  