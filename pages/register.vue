<script lang="ts" setup>
import { object, string, ref as refYup } from "yup";
import { configure } from "vee-validate";
import { useAuthStore } from '../store/useAuthStore';

const auth = useAuthStore();

configure({
  validateOnBlur: true,
  validateOnChange: true,
  validateOnInput: true,
  validateOnModelUpdate: true,
});

const schema = object({
  name: string().required("Nome obrigatório!").max(200),
  email: string().required("Email obrigatório!").email("Email inválido!"),
  password: string()
    .required("Senha obrigatória!")
    .min(8, "Senha mínima de 8 caracteres!")
    .max(64, "Senha máxima de 64 caracteres!"),
    password_confirmation: string()
    .required("Confirmação de senha obrigatória!")
    .oneOf([refYup("password")], "Senhas não conferem!"),
});

useSeoMeta({
  title: "Registro",
});

const handleSubmit = async (
  values: Record<string, any>,
  actions: Record<string, any>
) => {
  const {data, error} = await useApiFetch<{data:{token:string}}>("/auth/register", {
    method: "POST",
    body: JSON.stringify(values),
  });
  if (error.value) {
    return;
  }
  actions.resetForm();
  auth.authToken = data.value?.data?.token || null;
  await auth.fetchUser();
  navigateTo('/');
};
</script>

<template>
  <div class="flex justify-center items-center">
    <VeeForm
      :validation-schema="schema"
      @submit="handleSubmit"
      v-slot="{ errors: formErrors }"
      class="mt-6 p-6 w-1/2 border-2 rounded-lg border-white bg-red-300">
      <div class="space-y-12">
        <div class="border-b border-gray-900/10 pb-12">
          <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
            <div class="sm:col-span-4">
              <div class="mt-2">
                <FormVTextInput label="Nome" type="text" name="name" />
              </div>
            </div>
            <div class="sm:col-span-4">
              <div class="mt-2">
                <FormVTextInput label="Email" type="email" name="email" />
              </div>
            </div>
            <div class="sm:col-span-3">
              <FormVTextInput label="Senha" type="password" name="password" />
            </div>
            <div class="sm:col-span-3">
              <FormVTextInput
                label="Confirmar Senha"
                type="password"
                name="password_confirmation" />
            </div>
          </div>
        </div>
      </div>
      <template v-if="Object.keys(formErrors).length">
        <p class="text-red-500">Por favor, corrija os seguintes erros:</p>
        <ul>
          <li
            v-for="(message, field) in formErrors"
            :key="field"
            class="help is-danger">
            {{ message }}
          </li>
        </ul>
      </template>

      <div class="mt-6 flex items-center justify-end gap-x-6">
        <button
          type="button"
          class="text-sm font-semibold leading-6 text-gray-900">
          Cancel
        </button>
        <button
          type="submit"
          class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">
          Save
        </button>
      </div>
    </VeeForm>
  </div>
</template>

<style scoped></style>
