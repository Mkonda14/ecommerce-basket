
type Tcustoms = {
    id: string;
    name: string;
    price: number;
    colorPrimary: {
        sneaker: {
            model: string;
            marque: string;
        };
        name: string;
        quantity: number;
        color: string;
    } | null;
    images: {
        publicId: string;
    }[];
}[];

export const transToItemList = (data: Tcustoms) =>{
    return data.map(item => ({
        id: item.id,
        name: item.name,
        price: item.price,
        marque: item.colorPrimary?.sneaker.marque,
        model: item.colorPrimary?.sneaker.model,
        colorPrimary:{
            name: item.colorPrimary?.name,
            code: item.colorPrimary?.color,
            quantity: item.colorPrimary?.quantity,
        },
        publicId: item.images[0].publicId
    }))
}

export type TtransToItemList = ReturnType<typeof transToItemList>;

// --- 

type TCardCustom = {
    colorPrimary: {
        sneaker: {
            model: string;
            price: number;
            marque: string;
            reduction: number | null;
            isPromo: boolean;
            isCustomByGraffiti: boolean,
            tags: {
                name: string;
            }[];
        };
        sizes: {
            size: number;
            quantity: number;
        }[];
    };
    id: string;
    slug: string;
    name: string;
    price: number;
    colorSecondaries: {
        name: string;
        color: string;
    }[];
    images: {
        publicId: string;
    }[];
} | null

export const transToCardCustom = (data: TCardCustom) => {
    if(data === null) return null;

    return {
        id: data.id,
        name: data.name,
        slug: data.slug,
        price: parseFloat((data.price + (data.colorPrimary.sneaker.price)).toFixed(1)),
        reducprice: data.colorPrimary.sneaker.reduction ? parseFloat((data.price + (data.colorPrimary.sneaker.price * (1 - data.colorPrimary.sneaker.reduction))).toFixed(2)) : undefined,

        sneaker: {
            model: data.colorPrimary.sneaker.model,
            price: data.colorPrimary.sneaker.price,
            marque: data.colorPrimary.sneaker.marque,
            reduction: Math.round((data.colorPrimary.sneaker.reduction || 0) * 100),
            isPromo: data.colorPrimary.sneaker.isPromo,
            tags: data.colorPrimary.sneaker.tags,
            isCustomByGraffiti: data.colorPrimary.sneaker.isCustomByGraffiti,
        },
        sizes: data.colorPrimary.sizes,

        colorSecondaries: data.colorSecondaries,
        image: data.images[0].publicId,
    }
}

export type TtransToCardCustom = ReturnType<typeof transToCardCustom>;

type TShowCustom = {
  id: string;
  slug: string;
  name: string;
  description: string;
  price: number;
  colorPrimary: {
    color: string;
    name: string;
    sneaker: {
      id: string,
      model: string;
      price: number;
      marque: string;
      reduction: number | null;
      isPromo: boolean;
      isCustomByGraffiti: boolean;
      tags: {
        name: string;
        description: string;
      }[];
      category: {
        name: string;
        description: string;
        designer: string;
      } | null;
    };
    sizes: {
      size: number;
      quantity: number;
    }[];
  };
  themes: {
    id: string;
    name: string;
    description: string;
    category: {
      name: string;
      description: string;
      secondName: string;
    } | null;
  }[];
  colorSecondaries: {
    color: string;
    name: string;
  }[];
  images: {
    id: string;
    publicId: string;
  }[];
  _count: {
    likes: number;
  };
} | null;


export const transToShowCustom = (data: TShowCustom) => {
    if(data == null) return null;

    return {
      custom: {
        id: data.id,
        slug: data.slug,
        name: data.name,
        description: data.description,
        price: data.price,
      },
      sneaker: {
        id: data.colorPrimary.sneaker.id,
        model: data.colorPrimary.sneaker.model,
        price: data.colorPrimary.sneaker.price,
        marque: data.colorPrimary.sneaker.marque,
        reduction: data.colorPrimary.sneaker.reduction,
        isPromo: data.colorPrimary.sneaker.isPromo,
        isCustomByGraffiti: data.colorPrimary.sneaker.isCustomByGraffiti,

        sizes: data.colorPrimary.sizes,
        colorPrimary: {
          color: data.colorPrimary.color,
          name: data.colorPrimary.name,
        },
        
        category: data.colorPrimary.sneaker.category,
        tags: data.colorPrimary.sneaker.tags,
      },

      themes: data.themes,
      colorSecondaries: data.colorSecondaries,
      images: data.images,
      likes: data._count.likes,
      
      price: parseFloat((data.price + (data.colorPrimary.sneaker.price)).toFixed(1)),
      reducprice: data.colorPrimary.sneaker.reduction? parseFloat((data.price + (data.colorPrimary.sneaker.price * (1 - data.colorPrimary.sneaker.reduction))).toFixed(2)) : undefined,
    }
};

export type TtransToShowCustom = ReturnType<typeof transToShowCustom>;  