import imagemPrincipal from './assets/login.png'
import { AbModal, AbCampoTexto, AbBotao } from "ds-alurabooks";
import { useState } from 'react';
import './ModalLogin.css';
import { usePersistirToken } from '../../util/loginUtil';
import http from '../../http';

interface PropsModalLogin {
    aberta: boolean
    aoFechar: () => void
    aoEfetuarLogin: () => void
}

const ModalLogin = ({ aberta, aoFechar, aoEfetuarLogin }: PropsModalLogin) => {

    const [email, setEmail] = useState('');
    const [senha, setSenha] = useState('');

    const persistToken = usePersistirToken();

    const aoSubmeterFormulario = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault();
        const usuario = {
            email,
            senha
        }
        http.post('public/login', usuario)
        .then((resposta) => {
            // sessionStorage.setItem('token', resposta.data.access_token);
            persistToken.call({}, resposta.data.access_token);
            setEmail('');
            setSenha('');
            aoFechar();
            aoEfetuarLogin();
        })
        .catch((ex) => { 
            //console.log(ex);
            if (ex?.response?.data?.message) {
                alert(ex?.response?.data?.message);
            } else {
                alert('Aconteceu um erro inesperado ao efetuar login!');
            }
        })
    }

    return (
        <AbModal
            titulo="Login"
            aberta={aberta}
            aoFechar={aoFechar}
        >
            <section className="corpoModalCadastro">
                <figure>
                    <img src={imagemPrincipal} alt="Pessoa segurando uma chave na frente de uma tela de computador que está exibindo uma fechadura" />
                </figure>
                <form onSubmit={(event) => aoSubmeterFormulario(event)}>
                    <AbCampoTexto
                        label="E-mail"
                        value={email}
                        onChange={setEmail}
                        type="email"
                    />
                    <AbCampoTexto
                        label="Senha"
                        value={senha}
                        onChange={setSenha}
                        type="password"
                    />
                    <div className="acoes">
                        <AbBotao texto="Fazer login" />
                    </div>
                </form>
            </section>
        </AbModal>
    );

}

export default ModalLogin;