import { useContext } from "react";
import DishContext from "../../contexts/dishContext";
import Comida from "../../models/food";

function agruparPorCategoria(pratos: Comida[]): Record<string, Comida[]> {
  return pratos.reduce((categorias, prato) => {
    const categoria = prato.category ? prato.category.name : "Outros";
    if (!categorias[categoria]) {
      categorias[categoria] = [];
    }
    categorias[categoria].push(prato);
    return categorias;
  }, {} as Record<string, Comida[]>);
}

const Cardapio: React.FC = () => {
  const { dish } = useContext(DishContext);
  const pratosPorCategoria = agruparPorCategoria(dish);

  return <>teste</>;
};

export default Cardapio;
