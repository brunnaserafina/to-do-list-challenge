import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { postSignUp } from "../services/authenticationService";
import WrapperForm from "../common/FormLoginAndSignUp";

interface FormProps {
  name: string;
  email: string;
  password: string;
  confirmPassword?: string;
}

interface HandleFormProps {
  name: string;
  value: string;
}

export default function SignUp() {
  const [form, setForm] = useState<FormProps>({ name: "", email: "", password: "", confirmPassword: "" });
  const [errorPassword, setErrorPassword] = useState(false);
  const [errorConfirmPassword, setErrorConfirmPassword] = useState(false);
  const navigate = useNavigate();

  function handleForm({ name, value }: HandleFormProps) {
    setForm({
      ...form,
      [name]: value,
    });
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (form.password.length < 6) {
      setErrorPassword(true);
      return;
    }

    setErrorPassword(false);

    if (form.password !== form.confirmPassword) {
      setErrorConfirmPassword(true);
      return;
    }

    setErrorConfirmPassword(false);

    const formWithoutConfirmPassword = { ...form };
    delete formWithoutConfirmPassword.confirmPassword;

    try {
      await postSignUp(formWithoutConfirmPassword);
      toast("Cadastro realizado com sucesso! Faça seu login");
      navigate("/sign-in");
    } catch (err: any) {
      if (err.response.status === 409) {
        toast("E-mail já cadastrado!");
      } else {
        toast.error("Não foi possível realizar seu cadastro. Tente novamente!");
      }
    }
  }

  return (
    <WrapperForm>
      <h1>Olá, faça seu cadastro.</h1>

      <form onSubmit={handleSubmit}>
        <label>Nome completo</label>
        <input
          type="text"
          name="name"
          placeholder="Insira seu nome aqui"
          autoFocus
          onChange={(e) => handleForm({ name: e.target.name, value: e.target.value })}
          required
          onInvalid={(F) => (F.target as HTMLInputElement).setCustomValidity("Por favor, preencha com seu nome.")}
          onInput={(F) => (F.target as HTMLInputElement).setCustomValidity("")}
        />

        <label>E-mail</label>
        <input
          type="email"
          name="email"
          placeholder="nome@email.com"
          onChange={(e) => handleForm({ name: e.target.name, value: e.target.value })}
          required
          onInvalid={(F) => (F.target as HTMLInputElement).setCustomValidity("Favor, insira seu e-mail.")}
          onInput={(F) => (F.target as HTMLInputElement).setCustomValidity("")}
        />

        <label>Senha</label>
        <input
          type="password"
          name="password"
          placeholder="********"
          onChange={(e) => handleForm({ name: e.target.name, value: e.target.value })}
          required
          onInvalid={(F) => (F.target as HTMLInputElement).setCustomValidity("Insira sua senha.")}
          onInput={(F) => (F.target as HTMLInputElement).setCustomValidity("")}
        />
        {errorPassword && <p>A senha deve possuir no mínimo 6 caracteres!</p>}

        <label>Confirmar senha</label>
        <input
          type="password"
          name="confirmPassword"
          placeholder="********"
          onChange={(e) => handleForm({ name: e.target.name, value: e.target.value })}
          required
          onInvalid={(F) => (F.target as HTMLInputElement).setCustomValidity("Confirme sua senha.")}
          onInput={(F) => (F.target as HTMLInputElement).setCustomValidity("")}
        />
        {errorConfirmPassword && <p>As senhas devem ser iguais!</p>}

        <button type="submit">Cadastrar</button>
      </form>

      <Link to={"/sign-in"}>Já possui conta? Faça seu login!</Link>
    </WrapperForm>
  );
}
