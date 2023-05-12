<template>
  <div>
    <nav class="navbar navbar-expand-lg bg-light">
      <div class="container-fluid">
        <a
          href="/"
          class="navbar-brand"
        >
          Home
        </a>
        <div class="collapse navbar-collapse">
          <ul class="navbar-nav me-auto">
            <li class="nav-item">
              <a
                href="/login"
                class="nav-link"
              >
                Login
              </a>
            </li>
            <li class="nav-item">
              <a
                href="/profile"
                class="nav-link"
              >
                Profile
              </a>
            </li>
            <li class="nav-item">
              <a
                href="/logout"
                class="nav-link"
              >
                Logout
              </a>
            </li>
          </ul>
          <span
            v-if="loggedIn"
            class="navbar-text"
          >
            Logged in as: {{ user?.name }}
          </span>
        </div>
      </div>
    </nav>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useJwtAuth } from '#imports'


const { user, loggedIn } = useJwtAuth()

</script>