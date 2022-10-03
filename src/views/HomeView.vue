<template>
  <section
      class="
      relative
      h-screen
      w-screen
      bg-white
      sm:pt-2.5
      sm:flex
      sm:flex-col
      sm:items-center
      md:pt-5
      md:pl-9
      md:items-start
      md:flex-row
      ">
    <MSKCity @showModalForm="showModalForm" @addCityName="addCityName"/>
    <SPbCity @showModalForm="showModalForm" @addCityName="addCityName"/>

    <FormWindow v-show="isModalForm" @close="closeModalForm"
                class="
                absolute
                sm:-mt-2.5
                md:-mt-5
                md:-ml-9
                ">
      <template v-slot:header>
        <div class="
              text-dark-purple-blue
              font-medium
              text-2xl
              ">
          Заказать звонок
        </div>
      </template>
      <template v-slot:body>
        <form @submit="createDate"
              class="
              md:grid
              md:grid-cols-3
              md:grid-rows-2
              md:gap-px
              md:justify-between
              lg:grid-cols-4
              lg:grid-rows-2
              ">
          <div>
            <div
                class="
                text-base
                font-medium
                sm:mt-9
                md:mt-5
                ">
              Телефон*
            </div>
            <input type="tel" placeholder="+7 (___)___-__-__" v-model="phone" @blur="v$.phone.$touch()" :class="{'border-2 border-red-500': v$.phone.$error}"
                  class="
                  h-9
                  border
                  border-solid
                  border-color: rgb(209 213 219)
                  rounded-md
                  shadow-sm
                  text-xs
                  font-normal
                  focus:outline-none
                  sm:w-full
                  sm:px-3
                  sm:py-2
                  md:w-48
                  lg:w-44
                  ">
            <p v-if="v$.phone.$error"
                class="
                  text-red-500
                  text-xs
                ">
              Обязательно поле
            </p>
            <p v-if="v$.phone.numeric.$invalid"
              class="
                  text-red-500
                  text-xs
                ">
              Допускаются только цыфры и символ "+"
            </p>
          </div>
          <div>
            <div
                class="
                text-base
                font-medium
                sm:mt-5
                ">
              Имя*
            </div>
            <input type="text" placeholder="Иван Иванов" v-model="fullName" @blur="v$.fullName.$touch()" :class="{'border-2 border-red-500': v$.fullName.$error}"
                  class="
                  h-9
                  border
                  border-solid
                  border-color: rgb(209 213 219)
                  rounded-md
                  shadow-sm
                  text-xs
                  font-normal
                  focus:outline-none
                  sm:w-full
                  sm:px-3
                  sm:py-2
                  md:w-48
                  lg:w-44
                  ">
            <p v-if="v$.fullName.$error"
              class="
                  text-red-500
                  text-xs
                ">
              Обязательно поле
            </p>
            <p v-if="v$.fullName.alpha.$invalid"
              class="
                  text-red-500
                  text-xs
                ">
              Допускаются только буквы
            </p>
          </div>
          <div>
            <div
                class="
                text-base
                font-medium
                sm:mt-5
                ">
              Email*
            </div>
            <input type="email" placeholder="you@example.com" v-model="email" @blur="v$.email.$touch()" :class="{'border-2 border-red-500': v$.email.$error}"
                  class="
                  h-9
                  border
                  border-solid
                  border-color: rgb(209 213 219)
                  rounded-md
                  shadow-sm
                  text-xs
                  font-normal
                  focus:outline-none
                  sm:w-full
                  sm:px-3
                  sm:py-2
                  md:w-48
                  lg:w-44
                  ">
            <p v-if="v$.email.$error"
              class="
                  text-red-500
                  text-xs
                ">
              Обязательно поле
            </p>
            <p v-if="v$.email.email.$invalid"
              class="
                  text-red-500
                  text-xs
                ">
              Поле должно быть E-Mail
            </p>
          </div>
          <div class="md:col-span-2 lg:col-span-1">
            <div
                class="
                text-base
                font-medium
                sm:mt-5
                ">
              Город*
            </div>
            <div>
              <select v-model="cityName"
                      class="
                      h-9
                      border
                      border-solid
                      border-color: rgb(209 213 219)
                      rounded-md
                      shadow-sm
                      text-xs
                      font-normal
                      bg-white
                      focus:outline-none
                      sm:w-full
                      sm:px-3
                      sm:py-2
                      lg:w-44
                  ">
                <option v-for="cities in allCities" :key="cities.id">
                    {{cities.name}}
                </option>
              </select>
            </div>
          </div>
          <button @click="showModalNotification" type="submit" :disabled="v$.phone.$invalid || v$.fullName.$invalid || v$.email.$invalid"
                  class="
                h-9
                rounded-md
                shadow-sm
                bg-dark-spring-green
                text-base
                font-medium
                text-white
                sm:w-full
                sm:mt-5
                md:w-48
                md:mt-11
                lg:w-44
                lg:col-start-4
                ">
            Отправить
          </button>
        </form>
      </template>
      <template v-slot:footer>
      </template>
    </FormWindow>
    <NotificationWindow v-show="isModalNotification"
                class="
                absolute
                sm:-mt-2.5
                md:-mt-5
                md:-ml-9
                ">>
      <template v-slot:header>
      </template>
      <template v-slot:body>
        <div v-for="errorRequest in serverResponse" :key="errorRequest.statusSend">
          {{errorRequest.statusSend}}
        </div>
      </template>
      <template v-slot:footer>
      </template>
      </NotificationWindow>
  </section>
</template>

<script>
import {mapGetters, mapMutations, mapActions} from 'vuex';
import { useVuelidate } from '@vuelidate/core';
import MSKCity from "@/components/buttons/MSKCity";
import SPbCity from "@/components/buttons/SPbCity";
import FormWindow from "@/components/ModalWindows/FormWindow";
import NotificationWindow from "@/components/ModalWindows/NotificationWindow";

import { required, helpers, email } from '@vuelidate/validators'
const alpha = helpers.regex(/^[-A-Za-zа-яА-Я ]+$/)
const numeric = helpers.regex(/^[+1-9]+[0-9]*$/)
export default {
  name: 'HomeView',
  components: {
    SPbCity,
    MSKCity,
    FormWindow,
    NotificationWindow
  },
  setup () {
    return { v$: useVuelidate() }
  },
  data() {
    return {
      isModalForm: false,
      isModalNotification: false,
      cityName: '',
      phone: '',
      fullName: '',
      email: '',
    }
  },
  validations () {
    return {
      phone: {
        required,
        numeric
      },
      fullName: {
        required,
        alpha
      },
      email: {
        required,
        email
      }
    }
  },
  computed: mapGetters(["allCities", "serverResponse"]),
  methods: {
    ...mapMutations(["dateSubmit"]),
    ...mapActions(["sendDate"]),
    showModalForm() {
      this.isModalForm = true;
    },
    closeModalForm() {
      this.isModalForm = false;
      // setTimeout (() => {
      //   this.showModalNotification()
      // }, 1000)
    },
    showModalNotification() {
      this.isModalNotification = true;
      setTimeout (() => {
        this.closeModalNotification()
      }, 2000)
    },
    closeModalNotification() {
      this.isModalNotification = false;
      location.reload()
    },
    addCityName(CityName) {
      this.cityName = CityName
    },
    createDate() {
      this.dateSubmit({
        phone: this.phone,
        fullName: this.fullName,
        email: this.email,
        cityName: this.cityName,
      });
      this.phone = this.fullName = this.email = ''
      this.createSend()
    },
    createSend() {
      this.sendDate()
    },
  }
}
//:disabled="v$.phone || v$.fullName || v$.email"
</script>
