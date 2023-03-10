import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import BotaoNavegacao from "../BotaoNavegacao"
import ModalCadastroUsuario from "../ModalCadastroUsuario"
import ModalLogin from "../ModalLogin"
import logo from './assets/logo.png'
import usuario from './assets/usuario.svg'
import './BarraNavegacao.css'
import { useObterToken } from '../../util/loginUtil';
import { useLimparToken } from '../../util/loginUtil';

const BarraNavegacao = () => {

    const [modalCadastroAberta, setModalCadastroAberta] = useState(false);
    const [modalLoginAberta, setModalLoginAberta] = useState(false);

    const token = useObterToken();
    const [usuarioEstaLogado, setUsuarioEstaLogado] = useState<boolean>(token != null);
    
    const navigate = useNavigate();
    const limpaToken = useLimparToken();

    const aoEfetuarLogin = () => {
        setModalLoginAberta(false);
        setUsuarioEstaLogado(true);
    }

    const efetuarLogout = () => {
        setUsuarioEstaLogado(false);
        //sessionStorage.removeItem('token');
        limpaToken();
        navigate('/');
    }


    return (<nav className="ab-navbar">
        <h1 className="logo">
            <Link to="/">
                <img className="logo" src={logo} alt="Logo da AluraBooks" />
            </Link>
        </h1>
        <ul className="navegacao">
            <li>
                <a href="#!">Categorias</a>
                <ul className="submenu">
                    <li>
                        <Link to="/">
                            Frontend
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Programação
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Infraestrutura
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Business
                        </Link>
                    </li>
                    <li>
                        <Link to="/">
                            Design e UX
                        </Link>
                    </li>
                </ul>
            </li>
        </ul>
        <ul className="acoes">
            {!usuarioEstaLogado && (<>
                <li>
                    <BotaoNavegacao
                        texto="Login"
                        textoAltSrc="Icone representando um usuário"
                        imagemSrc={usuario}
                        onClick={() => setModalLoginAberta(true)}
                    />
                </li>
                <li>
                    <BotaoNavegacao
                        texto="Cadastrar-se"
                        textoAltSrc="Icone representando um usuário"
                        imagemSrc={usuario}
                        onClick={() => setModalCadastroAberta(true)}
                    />
                    <ModalCadastroUsuario
                        aberta={modalCadastroAberta}
                        aoFechar={() => setModalCadastroAberta(false)}
                    />
                    <ModalLogin
                        aberta={modalLoginAberta}
                        aoFechar={() => setModalLoginAberta(false)}
                        aoEfetuarLogin={() => aoEfetuarLogin()}
                    />
                </li>
            </>)}
            {usuarioEstaLogado &&
                <>
                    <li>
                        <Link to="/minha-conta/pedidos">Minha conta</Link>
                    </li>
                    <li>
                        <BotaoNavegacao
                            texto="Logout"
                            textoAltSrc="Icone representando um usuário"
                            imagemSrc={usuario}
                            onClick={efetuarLogout}
                        />
                    </li>
                </>
            }
        </ul>
    </nav>)
}

export default BarraNavegacao