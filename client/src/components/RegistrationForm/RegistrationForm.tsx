import { FC, FormEventHandler, useState } from "react";

import { FormField } from "../FormField";
import { Button } from "../Button";
import "./RegistrationForm.css";
import { useMutation } from "@tanstack/react-query";
import { registerUser } from "../../api/User";
import { queryClient } from "../../api/queryClient";

export const RegistrationForm: FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const registorMutation = useMutation(
    {
      mutationFn: () => registerUser(username, password),
    },
    queryClient
  );

  const handleSubmit: FormEventHandler<HTMLFormElement> = (event) => {
    event.preventDefault();

    registorMutation.mutate()
  };

  return (
    <form className="registration-form" onSubmit={handleSubmit}>
      <FormField label="Имя пользователя">
        <input
          type="text"
          name="username"
          onChange={(event) => setUsername(event.target.value)}
          value={username}
        />
      </FormField>

      <FormField label="Пароль">
        <input
          type="password"
          name="password"
          onChange={(event) => setPassword(event.target.value)}
          value={password}
        />
      </FormField>
      {registorMutation.error && <span>{registorMutation.error.message }</span>}
      <Button
        type="submit"
        title="Зарегистрироваться"
        isLoading={registorMutation.isPending}
      />
    </form>
  );
};
