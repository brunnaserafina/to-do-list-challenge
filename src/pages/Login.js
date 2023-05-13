import { useContext, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import WrapperForm from "../common/FormLoginAndSignUp";
import ListsContext from "../contexts/ListsContext";
import { postLogin } from "../services/authenticationService";

export default function Login() {
  const [form, setForm] = useState({});
  const { setRender } = useContext(ListsContext);
  const navigate = useNavigate();

  function handleForm({ name, value }) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event) {
    event.preventDefault();

    try {
      const response = await postLogin(form);
      localStorage.setItem(
        "to-do-list",
        JSON.stringify({
          name: response.data.name,
          email: response.data.email,
          token: response.data.token,
        })
      );
      navigate("/");
      setRender((prevRender) => !prevRender);
    } catch (err) {
      toast.error(
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
          name="email"
          autoFocus
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
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
          name="password"
          onChange={(e) =>
            handleForm({ name: e.target.name, value: e.target.value })
          }
          required
          onInvalid={(F) => F.target.setCustomValidity("Informe sua senha.")}
          onInput={(F) => F.target.setCustomValidity("")}
        />

        <button type="submit">Entrar</button>
      </form>

      <Link to={"/sign-up"}>Não possui conta? Cadastre-se!</Link>
    </WrapperForm>
  );
}
