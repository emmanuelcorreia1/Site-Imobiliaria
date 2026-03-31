import Link from "next/link";
import { formatarFinalidade, formatarPreco } from "../lib/formatar";
import type { Imovel } from "../lib/types";

interface PropertyCardProps {
  imovel: Imovel;
}

export default function PropertyCard({ imovel }: PropertyCardProps) {
  return (
    <article className="cardImovel">
      <span className="propriedadeTag">
        {formatarFinalidade(imovel.finalidade)}
      </span>

      <Link href={`/imoveis/${imovel.codigo}`}>
        <img src={imovel.imagem} alt={imovel.titulo} className="imagemImovel" />
      </Link>

      <div className="infoCard">
        <div className="info">
          <span>{imovel.categoria}</span>
          <span>Cod. {imovel.codigo}</span>
        </div>

        <div className="nomeCard">
          <div>
            <Link href={`/imoveis/${imovel.codigo}`}>{imovel.titulo}</Link>
            <p>
              {imovel.cidade} - {imovel.bairro}
            </p>
          </div>
          <span>
            <i className="fa-solid fa-ruler-combined" /> {imovel.area} m2
          </span>
        </div>

        <div className="atributos">
          <span>
            <i className="fa-solid fa-bed" /> {imovel.quartos}
          </span>
          <span>
            <i className="fa-solid fa-bath" /> {imovel.banheiros}
          </span>
          <span>
            <i className="fa-solid fa-car" /> {imovel.vagas}
          </span>
        </div>

        <div className="preco">
          <p>Preco</p>
          <strong>
            R$ {formatarPreco(imovel.preco)}
            {imovel.finalidade === "locacao" ? "/mes" : ""}
          </strong>
        </div>

        <Link href={`/imoveis/${imovel.codigo}`} className="verDetalhes">
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
