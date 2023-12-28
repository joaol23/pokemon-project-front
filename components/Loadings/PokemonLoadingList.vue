<template>
  <div
    class="grid grid-cols-5 lg:grid-cols-3 mx-[50px] my-[25px] gap-2 md:grid-cols-2 sm:m-0">
    <div
      v-for="i in 20"
      class="h-[12rem] from-black to-white bg-gradient-to-r opacity-60 hover:opacity-100 p-[2px] rounded-lg">
      <div class="bg-white rounded-lg dark:bg-gray-800 h-[12rem] animate-pulse">
        <div class="flex justify-start items-center flex-row">
          <img
            class="w-[50px] ml-2 mt-2 h-[50px] p-10 rounded-md bg-gray-400"
            loading="lazy" />
          <div class="flex justify-start flex-row md:flex-col ml-5">
            <div v-for="i in 2" class="md:mt-2">
              <span
                class="rounded-full px-6 py-1 text-[12px] bg-gray-400 font-semibold mr-2 mb-2"></span>
            </div>
          </div>
        </div>
        <div class="px-2">
          <h5
            class="mb-2 text-lg py-2 mt-6 bg-gray-400 rounded-md first-letter:uppercase font-bold tracking-tight text-gray-900 dark:text-white">
          </h5>
          <a
            href="#"
            class="mt-2 inline-flex mb-2 items-center text-[12px] font-medium text-center bg-gray-400 px-10 py-4 rounded-md">
          </a>
        </div>
      </div>
    </div>
  </div>
</template>
