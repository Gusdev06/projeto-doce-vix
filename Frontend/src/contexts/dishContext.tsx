import { api } from "../services/api/api";

import { createContext, useEffect, useState } from "react";
import Comida from "../models/food";

interface IDishContextType {
  dish: Comida[];
}

const DishContext = createContext<IDishContextType>({} as IDishContextType);

interface IDishProviderProps {
  children: React.ReactNode;
}

export function DishProvider({ children }: IDishProviderProps) {
  const [dish, setDish] = useState<Comida[]>([]);

  async function getDish() {
    const response = await api.get("/products");
    const data = response.data.result;
    setDish(data);
  }

  useEffect(() => {
    getDish();
  }, []);

  return (
    <DishContext.Provider value={{ dish }}>{children}</DishContext.Provider>
  );
}

export default DishContext;
