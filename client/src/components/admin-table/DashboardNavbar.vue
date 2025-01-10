<script setup lang="ts">
import { ref, onMounted, watch } from "vue";
import {  useRoute } from "vue-router"; 
import UzFlag from "../../assets/images/UzbFlag.svg";
import RuFlag from "../../assets/images/RusFlag.svg";
import EngFlag from "../../assets/images/EngFlag.svg";
import BreadCrumb from "primevue/breadcrumb"; 

const selectedLanguage = ref("EN");

interface LanguageType {
  name: string;
  code: string;
  flag: string;
}

const languages = ref<LanguageType[]>([
  { name: "English", code: "EN", flag: EngFlag },
  { name: "Russian", code: "RU", flag: RuFlag },
  { name: "Uzbek", code: "UZ", flag: UzFlag },
]);

const languageDropdown = ref<boolean>(false); 

const toggleLanguageDropdown = () => {
  languageDropdown.value = !languageDropdown.value;
};

const selectLanguage = (code: string) => {
  selectedLanguage.value = code; 
  languageDropdown.value = false; 
};

const profileDropdown = ref(false); 

// Foydalanuvchi ma'lumotlari
const user = ref({
  name: "Mehrojbek",
  email: "john.doe@example.com",
  avatar: "https://img.freepik.com/premium-vector/m-letter-logo-design_1159859-5474.jpg", 
});

const toggleProfileDropdown = () => {
  profileDropdown.value = !profileDropdown.value;
};

const handleAction = (action: string) => {
  console.log(`Action selected: ${action}`);
  profileDropdown.value = false;
};


</script>

<template>
  <div class="dashboard-navbar">
  <div></div>

    <div class="dashboard__navbar-actions">
        <div  class="language-select">
          <button class="selected" @click="toggleLanguageDropdown" >
            <img
              :src="languages.find((lang:any) => lang.code === selectedLanguage)?.flag"
              :alt="`Flag of ${selectedLanguage}`"
              class="flag"
            />
            <span class="language-name">
              {{ languages.find((lang: any ) => lang.code === selectedLanguage)?.name }}
            </span>
          </button>
          <ul  class="dropdown" v-if="languageDropdown">
            <li
              v-for="language in languages"
              :key="language.code"
              class="dropdown-item"
              :class="{ selected: language.code === selectedLanguage }"
              @click="selectLanguage(language.code)"
            >
              <img :src="language.flag" :alt="`Flag of ${language.name}`" class="flag" />
              <span>{{ language.name }}</span>
            </li>
          </ul>

        </div>
    
        <div class="avatar-container">
          <button class="avatar-button" @click="toggleProfileDropdown" >
            <img :src="user.avatar" alt="User Avatar" class="avatar" />
            <span class="user-name">{{ user.name }}</span>
            <i class="pi pi-caret-down"></i>
          </button>
    
          <ul class="dropdown" v-if="profileDropdown">
            <li class="dropdown-item" @click="handleAction('profile')">
              <i class="pi pi-user"></i>
              View Profile
            </li>
            <li class="dropdown-item" @click="handleAction('settings')">
              <i class="pi pi-cog"></i>
              Settings
            </li>
            <li class="dropdown-item" @click="handleAction('logout')">
              <i class="pi pi-sign-out"></i>
              Logout
            </li>
          </ul>
        </div>
    </div>

  </div>
</template>

<style lang="scss" scoped>
@mixin f-style($size, $weight, $color){
  font-size: $size;
  font-weight: $weight;
  color: $color;
}

.dashboard-navbar {
  display: flex;
  align-items: center;
  justify-content: space-between;
  column-gap: 2rem;
  align-items: center;
  width: 100%;
  padding: .7rem 2rem;
  margin: 10px 0;
  border-radius: 6px;
  background-color: var(--gray-dark);
  z-index: 100 !important;
}

.dashboard__navbar-actions{
    display: flex;
    align-items: center;
        column-gap: 2rem;
}

.breadcrumb-container {
    display: flex;
    align-items: center;
    height: 100%;
  margin-bottom: 10px;
  background-color: var(--gray-dark);
  border-radius: 6px;

  .p-breadcrumb {
    background-color: transparent;
    color: var(--light-color);

    .p-breadcrumb-item {
      color: var(--light-color);
    }

    .p-breadcrumb-item:hover {
      color: var(--primary-success);
    }

    .pi-home {
      color: var(--primary-success);
    }
  }
}

.language-select {
  position: relative;
  display: inline-block;
  
  .language-name {
    @include f-style(15px, 500, var(--light-color));
    letter-spacing: .5px;
  }

  .selected {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.5rem 1rem;
    background-color: var(--gray-dark);
    color: var(--light-color);
    border-radius: 8px;
    border: none;
    cursor: pointer;

    &:hover {
      background-color: var(--gray-dark-hover);
    }

    .flag {
      width: 22px;
      height: 14px;
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.2rem);
    left: 0;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: var(--dark-color);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

    .dropdown-item {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      padding: 0.4rem .8rem;
      margin-top: 5px;
      cursor: pointer;
      border-radius: 8px;
      color: var(--light-color);
      @include f-style(15px, 400, var(--light-color));

      &:hover {
        background-color: var(--primary-success);
        color: white;
      }

      &.selected {
        background-color: var(--primary-success);
        color: white;
      }

      .flag {
        width: 24px;
        height: 16px;
      }
    }
  }
}

.avatar-container {
  position: relative;
  display: inline-block;

  .avatar-button {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    padding: 0.2rem 1rem;
    background-color: var(--gray-dark);
    color: var(--light-color);
    border: 1px solid var(--border-color);
    border-radius: 8px;
    cursor: pointer;

    &:hover {
      background-color: var(--gray-dark-hover);
    }

    .avatar {
      width: 34px;
      height: 34px;
      border-radius: 50%;
      object-fit: cover;
      border: 2px solid var(--border-color);
    }

    .user-name {
      @include f-style(15px, 500, var(--light-color));
    }

    i {
      color: var(--light-color);
    }
  }

  .dropdown {
    position: absolute;
    top: calc(100% + 0.5rem);
    right: 0;
    z-index: 10;
    list-style: none;
    margin: 0;
    padding: 0;
    background-color: var(--dark-color);
    border-radius: 8px;
    box-shadow: rgba(0, 0, 0, 0.16) 0px 10px 36px 0px, rgba(0, 0, 0, 0.06) 0px 0px 0px 1px;

    .dropdown-item {
      padding: 0.5rem 1rem;
      color: var(--light-color);
      cursor: pointer;
      border-radius: 8px;

      &:hover {
        background-color: var(--primary-success);
        color: white;
      }

      i {
        margin-right: 10px;
      }
    }
  }
}
</style>
