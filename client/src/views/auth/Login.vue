<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import ApiInstance from '../../services/api';
import Button from '../../utils/Button.vue';
import VerifyRole from '../../helpers/verify-role';
import { useStorage } from '../../hooks/useStorage';

const router = useRouter();

const [_, setToken ] = useStorage("token", "local")

const focusState = ref<{ email: boolean; password: boolean }>({
  email: false,
  password: false,
});

const email = ref<string>('alieev@gmail.com');
const password = ref<string>('123456');
const passwordType = ref<string>('password');
const isLoading = ref<boolean>(false);

const handlePasswordShow = () => {
  passwordType.value = passwordType.value === 'password' ? 'text' : 'password';
};

  const handleLogin = async () => {
    isLoading.value = true
    try {
      const response = await ApiInstance.post("/auth/login", {
       email: email.value,
       password: password.value
      })
      
      if(response.data.token){
        setToken(response?.data.token)
        isLoading.value = false
        const UserData: any = VerifyRole(response?.data?.token)
        
        const targetPath = UserData.role === 'admin' ? '/dashboard/admin' : '/dashboard/user'
        router.push(targetPath);
      }
    } 
    catch (error) {
        console.error(error);
    }
   
  }
</script>

<template>
    <h2 class="auth-title">Login</h2>
    <h6 class="auth-subtitle">Please enter your details</h6>
    <div :style="focusState.email ? 'border: 1px solid var(--primary-success)' : 'border: 1px solid #BAC4D1'" class="input-item">
      <i class="pi pi-envelope"></i>
      <input v-model="email" @focus="focusState.email = true" @blur="focusState.email = false"  type="email"  placeholder="Email"/>
    </div>
  <div :style="focusState.password ? 'border: 1px solid var(--primary-success)' : 'border: 1px solid #BAC4D1'" class="input-item password-item">
    <i class="pi pi-lock"></i>
    <input v-model="password"  @focus="focusState.password = true"  @blur="focusState.password = false"  class="password-input"  :type="passwordType"  placeholder="Password"/>
    <i  @click="handlePasswordShow"  :class="passwordType === 'password' ? 'pi pi-eye' : 'pi pi-eye-slash'"  id="password-toggle"></i>
  </div>
  <Button :loading="isLoading" text="Log in" class="submit-btn" @click="handleLogin" button-type="primary"/>
  <p  class="register-link">Don't have an account?  <router-link to="/auth/register" class="link" > Register</router-link></p>
</template>
