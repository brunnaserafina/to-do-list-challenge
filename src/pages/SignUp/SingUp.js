import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { BsGoogle } from "react-icons/bs";
import { postSignUp } from "../../services/authentication";
import { toast } from "react-toastify";
import WrapperForm from "../../assets/common/FormLoginAndSignUp";

export default function SignUp() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function isPasswordIsValid() {
    const minimumCharacterCount = 6;
    return password.length >= minimumCharacterCount;
  }

  function arePasswordsMatched() {
    return password === confirmPassword;
  }

  async function handleSubmit(event) {
    event.preventDefault();

    setErrorPassword(!isPasswordIsValid);
    setErrorConfirmPassword(!arePasswordsMatched);

    if (!isPasswordIsValid || !arePasswordsMatched) {
      return;
    }

    try {
      await postSignUp({ name, email, password });
      toast("Cadastro realizado com sucesso! Faça seu login");
      navigate("/");
    } catch (err) {
      toast("Não foi possível realizar seu cadastro. Tente novamente!");
    }
  }

  return (
    <WrapperForm>
      <h1>Olá, faça seu cadastro.</h1>

      <form onSubmit={handleSubmit}>
        <label>Nome completo</label>
        <input
          type="text"
          placeholder="Insira seu nome aqui"
          autoFocus
          value={name}
          onChange={(e) => setName(e.target.value)}
          required
          onInvalid={(e) =>
            e.target.setCustomValidity("Por favor, preencha com seu nome.")
          }
        />

        <label>E-mail</label>
        <input
          type="email"
          placeholder="nome@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          onInvalid={(e) =>
            e.target.setCustomValidity("Favor, insira seu e-mail.")
          }
        />

        <label>Senha</label>
        <input
          type="password"
          placeholder="********"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          onInvalid={(e) => e.target.setCustomValidity("Insira sua senha.")}
        />
        {errorPassword && <p>A senha deve possuir no mínimo 6 caracteres!</p>}

        <label>Confirmar senha</label>
        <input
          type="password"
          placeholder="********"
          value={confirmPassword}
          onChange={(e) => setConfirmPassword(e.target.value)}
          required
          onInvalid={(e) => e.target.setCustomValidity("Confirme sua senha.")}
        />
        {errorConfirmPassword && <p>As senhas devem ser iguais!</p>}

        <button type="submit">Cadastrar</button>
        <button>
          <BsGoogle fontSize={"20px"} />
          <p>Acessar com Google</p>
        </button>
      </form>

      <Link to={"/"}>Já possui conta? Faça seu login!</Link>
    </WrapperForm>
  );
}
