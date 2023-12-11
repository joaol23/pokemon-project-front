<script setup>
const props = defineProps({
  type: {
    type: String,
    default: "text",
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  placeholder: {
    type: String,
    default: "",
  },
  leftIcon: {
    type: String,
    default: "",
  },
});
</script>

<template>
  <div class="field">
    <div class="label is-normal">
      <label class="block text-sm font-medium leading-6 text-gray-900">{{
        label
      }}</label>
    </div>
    <div class="field-body">
      <div class="field">
        <p class="control has-icons-left has-icons-right">
          <VeeField :name="name" v-slot="{ field, meta, errors }">
            <input
              v-bind="field"
              class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              :class="{
                'border-1 border-green-500': meta.valid && meta.touched,
                'border-[1px] border-red-500': !meta.valid && meta.touched,
              }"
              :placeholder="placeholder"
              :type="type" />
            <span class="icon is-small is-left">
              <i class="fas" :class="leftIcon"></i>
            </span>
            <span
              class="icon is-small is-right"
              v-if="meta.valid && meta.touched">
              <i class="fas fa-check has-text-success"></i>
            </span>
            <span
              class="icon is-small is-right"
              v-else-if="!meta.valid && meta.touched">
              <i class="fas fa-x has-text-danger"></i>
            </span>
            <VeeErrorMessage :name="name" as="div" class="text-red-500  " />
          </VeeField>
        </p>
      </div>
    </div>
  </div>
</template>

<style></style>
