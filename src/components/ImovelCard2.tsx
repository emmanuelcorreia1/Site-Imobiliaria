import Link from "next/link";
import { formatarFinalidade, formatarPreco } from "../lib/formatar";
import type { Imovel } from "../lib/types";

interface ImovelCardProps {
  imovel: Imovel;
}

export default function ImovelCard({ imovel }: ImovelCardProps) {
  return (
    <article className="cardImovel">
      <span className="propriedadeTag">
        {formatarFinalidade(imovel.finalidade)}
      </span>

      <Link href={`/imoveis/${imovel.codigo}`} className="imagemLink">
        <img
          src={imovel.imagem}
          alt={imovel.titulo}
          className="imagemImovel"
          loading="lazy"
          decoding="async"
        />
        {imovel.selos && imovel.selos.length > 0 && (
          <span className="selosImovel">
            {imovel.selos.map((selo) => (
              <span key={selo} className="seloImovel">
                {selo}
              </span>
            ))}
          </span>
        )}
      </Link>

      <div className="cardGrid">
        <div className="info">
          <span>{imovel.categoria}</span>
          <span>Cod. {imovel.codigo}</span>
        </div>

        <div className="nomeCard2">
          <div>
            <Link href={`/imoveis/${imovel.codigo}`}>{imovel.titulo}</Link>
            <p>
              {imovel.cidade} - {imovel.bairro}
            </p>
          </div>
        </div>

        <div className="atributos2">
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
          <p>Preço</p>
          <strong>
            {imovel.precoAnterior && imovel.precoAnterior > imovel.preco && (
              <span className="precoAnterior">
                de R$ {formatarPreco(imovel.precoAnterior)}
              </span>
            )}
            R$ {formatarPreco(imovel.preco)}
            {imovel.finalidade === "locacao" ? "/mês" : ""}
          </strong>
        </div>

        <Link href={`/imoveis/${imovel.codigo}`} className="verDetalhes">
          Ver detalhes
        </Link>
      </div>
    </article>
  );
}
