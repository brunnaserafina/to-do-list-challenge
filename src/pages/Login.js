import { useContext, useState } from "react";
// import { BsGoogle } from "react-icons/bs";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WrapperForm from "../common/FormLoginAndSignUp";
import ListsContext from "../contexts/ListsContext";
import { postLogin } from "../services/authentication";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { setRender } = useContext(ListsContext);
  const navigate = useNavigate();

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await postLogin({ email, password });
      console.log(response);
      toast("Login efetuado com sucesso! Seja bem-vindo(a)");
      localStorage.setItem(
        "to-do-list",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
          token: response.data.token,
        })
      );
      navigate("/");
      setRender((prev) => !prev);
    } catch (err) {
      toast(
        "Não foi possível efetuar seu login. Confira seus dados e tente novamente!"
      );
    }
  }

  return (
    <WrapperForm>
      <h1>Olá, faça login em sua conta.</h1>

      <form onSubmit={handleSubmit}>
        <label>E-mail</label>
        <input
          type="email"
          placeholder="nome@email.com"
          autoFocus
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onInvalid={(F) =>
            F.target.setCustomValidity("Informe seu e-mail cadastrado.")
          }
          onInput={(F) => F.target.setCustomValidity("")}
        />

        <label>Senha</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          onInvalid={(F) => F.target.setCustomValidity("Informe sua senha.")}
          onInput={(F) => F.target.setCustomValidity("")}
        />

        <button type="submit">Entrar</button>
        {/* <button>
          <BsGoogle fontSize={"20px"} />
          <p>Acessar com Google</p>
        </button> */}
      </form>

      <Link to={"/sign-up"}>Não possui conta? Cadastre-se!</Link>
    </WrapperForm>
  );
}
