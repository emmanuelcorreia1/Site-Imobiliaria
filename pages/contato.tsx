import Layout from "../src/components/Layout";
import { empresa } from "../src/lib/empresa";
import Maps from "../src/components/Maps";

export default function ContatoPage() {
  return (
    <Layout
      title="Contato"
      page="contato"
      empresa={empresa}
      stylesheets={["/assets/css/contato.css"]}
    >
      <main className="paginaContato">
        <section className="tituloPagina">
          <h1>Entre em contato</h1>
          <p>
            Estamos prontos para ajudar você a encontrar a melhor solução
            imobiliária
          </p>
          <div className="cirBlur2" />
        </section>

        <div className="divPrincipal2">
          <div className="contatoFormulario">
            <section className="contatos">
              <ul className="listaContato">
                <li className="listEmail">
                  <i className="fas fa-envelope"></i> <h3>{empresa.email}</h3>
                </li>
                <li className="listTel">
                  <i className="fas fa-phone"></i> <h3>{empresa.telefone}</h3>
                </li>
                <li className="listEndereco">
                  <i className="fas fa-map-marker-alt"></i> <h3>{empresa.endereco}</h3>
                </li>
                <li className="listHorario">
                  <i className="fas fa-clock"></i>
                  <div className="listHorarioText">
                    <h3>Nosso horário de atendimento</h3>
                    <p>
                      Segunda-feira à sexta-feira: <br /> 08:00 à 12:00 - 13:30
                      à 18:00 <br />
                      <br />
                      Sábado: <br /> 08:00 à 12:00
                    </p>
                  </div>
                </li>
              </ul>
            </section>

            <section className="formContato">
              <form action="formulario">
                <input
                  type="text"
                  id="campoNome"
                  name="nome"
                  placeholder="Nome"
                />{" "}
                <br />
                <input
                  type="email"
                  name="email"
                  id="campoEmail"
                  placeholder="Email"
                />
                <br />
                <input
                  type="tel"
                  name="telefone"
                  id="campoTelefone"
                  placeholder="Telefone"
                />
                <br />
                <input
                  type="text"
                  name="assunto"
                  id="campoAssunto"
                  placeholder="Assunto"
                />
                <br />
                <textarea
                  name="mensagem"
                  id="campoMensagem"
                  placeholder="Mensagem"
                />
                <br />
                <input type="submit" value="Enviar" />
              </form>
            </section>
          </div>
          <div className="tituloMaps">
            <h1>Onde estamos</h1>
            <div className="divMaps">
              <Maps />
            </div> 
          </div>
          
          
        </div>
      </main>
    </Layout>
  );
}
