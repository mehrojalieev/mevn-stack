<script setup lang="ts">
import { ref } from 'vue';
import ApiInstance from '../../services/api';
import { useRouter } from 'vue-router';
import Button from '../../utils/Button.vue';

const router = useRouter();


interface FocusType {
    firstname: boolean;
    lastname: boolean;
    email: boolean;
    password: boolean
}


const focusState = ref<FocusType>({
    firstname: false,
    lastname: false,
    email: false,
    password: false,

});
const firstname = ref<string>('Mehrojbek');
const lastname = ref<string>('Aliyev');
const email = ref<string>('alieev@gmail.com');
const password = ref<string>('123456');
const passwordType = ref<string>('password');
const isLoading = ref<boolean>(false);

const handlePasswordShow = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};


const handleRegister = async () => {
    isLoading.value = true
    try {
      const response = await ApiInstance.post("/auth/register", {
       firstname: firstname.value,
       lastname: lastname.value,
       email: email.value,
       password: password.value
      })
      
      if(response.data.token){
        localStorage.setItem('token', response.data.token);
        const role = 'admin'
        isLoading.value = false
        const targetPath = role === 'admin' ? '/dashboard/admin' : '/dashboard/user'
        router.push(targetPath);
      }
    } 
    catch (error) {
        console.error(error);
        
    }
   
  }
</script>


<template> 
    <h2 class="auth-title">Register</h2>
    <h6 class="auth-subtitle">Please enter your details</h6>
    <div :style="focusState.email ? 'border: 1px solid var(--primary-success)' : 'border: 1px solid #BAC4D1'" class="input-item">
      <i class="pi pi-envelope"></i>
      <input v-model="firstname" @focus="focusState.firstname = true" @blur="focusState.firstname = false"  type="text"  placeholder="Firstname"/>
    </div>
    <div :style="focusState.email ? 'border: 1px solid var(--primary-success)' : 'border: 1px solid #BAC4D1'" class="input-item">
      <i class="pi pi-envelope"></i>
      <input v-model="lastname" @focus="focusState.lastname = true" @blur="focusState.lastname = false"  type="text"  placeholder="Lastname"/>
    </div>
    <div :style="focusState.email ? 'border: 1px solid var(--primary-success)' : 'border: 1px solid #BAC4D1'" class="input-item">
      <i class="pi pi-envelope"></i>
      <input v-model="email" @focus="focusState.email = true" @blur="focusState.email = false"  type="email"  placeholder="Email"/>
    </div>
  <div :style="focusState.password ? 'border: 1px solid var(--primary-success)' : 'border: 1px solid #BAC4D1'" class="input-item password-item">
    <i class="pi pi-lock"></i>
    <input v-model="password"  @focus="focusState.password = true"  @blur="focusState.password = false"  class="password-input"  :type="passwordType"  placeholder="Password"/>
    <i  @click="handlePasswordShow"  :class="passwordType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"  id="password-toggle"></i>
  </div>
  <Button :loading="isLoading" text="Register" class="submit-btn" @click="handleRegister"/>
  <p  class="register-link">Already have an account?  <router-link to="/auth/login" class="link" >Login</router-link></p>
</template>