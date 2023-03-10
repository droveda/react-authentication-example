import { AbBotao } from "ds-alurabooks";
import './Pedidos.css';
import { useEffect, useState } from "react";
import { useObterToken } from "../../util/loginUtil";
import { IPedido } from "../../interfaces/IPedido";
import http from "../../http";

const Pedidos = () => {
    
    const formatador = Intl.NumberFormat('pt-br', {style: 'currency', currency: 'BRL'});

    const [pedidos, setPedidos] = useState<IPedido[]>([])
    const token = useObterToken();


    useEffect(() => {

        http.get<IPedido[]>('pedidos')
            .then(response => {
                // console.log(response.data);
                setPedidos(response.data);
            })
            .catch(ex => console.log(ex));


    }, [token]);

    const excluir = (pedido: IPedido) => {
        http.delete(`pedidos/${pedido.id}`)
        .then(() => {
            setPedidos(pedidos.filter(p => p.id !== pedido.id));
        })
        .catch(ex => console.log(ex));
    };

    return (
        <section className="pedidos">
            <h1>Meus Pedidos</h1>
            {pedidos.map(pedido => (
                <div className="pedido" key={pedido.id}>
                    <ul>
                        <li>Pedido <strong>{pedido.id}</strong></li>
                        <li>Data do pedido: <strong>{new Date(pedido.data).toLocaleDateString()}</strong></li>
                        <li>Valor total: <strong>{formatador.format(pedido.total)}</strong></li>
                        <li>Entrega realizada em: <strong>{new Date(pedido.entrega).toLocaleDateString()}</strong></li>
                        <li>
                            <button className="botaoExcluir" onClick={() => excluir(pedido)}>
                                Excluir
                            </button>
                        </li>
                    </ul>
                    <AbBotao texto="Detalhes" />
                </div>
            ))}
        </section>
    );

}

export default Pedidos;