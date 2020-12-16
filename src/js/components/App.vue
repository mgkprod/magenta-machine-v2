<template>
    <div class="flex items-center justify-center w-full h-full">
        <mpc-1000 :devtools="devtools" />

        <div class="absolute inset-0 top-auto p-4 text-indigo-500 dark:text-indigo-200">
            <div class="flex flex-row justify-between">
                <div></div>
                <div class="items-center -mx-1">
                    <button class="p-2 mx-1 text-indigo-500 transition bg-indigo-100 rounded-lg transition-200 dark:bg-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-600 hover:bg-indigo-200 focus:outline-none focus:ring-4 ring-opacity-50 dark:focus:ring-indigo-800 focus:ring-indigo-200" @click="devtools = !devtools">
                        <svg width="24" height="24" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fill-rule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0zm8.586 0a1 1 0 011.414 0l3 3a1 1 0 010 1.414l-3 3a1 1 0 11-1.414-1.414L16.586 10l-2.293-2.293a1 1 0 010-1.414z" clip-rule="evenodd" /></svg>
                    </button>
                    <button class="p-2 mx-1 text-indigo-500 transition bg-indigo-100 rounded-lg transition-200 dark:bg-indigo-900 dark:text-indigo-400 dark:hover:text-indigo-200 dark:hover:bg-indigo-800 hover:text-indigo-600 hover:bg-indigo-200 focus:outline-none focus:ring-4 ring-opacity-50 dark:focus:ring-indigo-800 focus:ring-indigo-200" @click="toggle_theme">
                        <svg v-if="theme == 'light'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="w-6 h-6" data-v-f49459f4=""><path d="M6.995 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007s-2.246-5.007-5.007-5.007S6.995 9.239 6.995 12zM11 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2H2zm17 0h3v2h-3z" fill="currentColor"></path><path d="M5.637 19.778l-1.414-1.414l2.121-2.121l1.414 1.414z" fill="currentColor"></path><path d="M16.242 6.344l2.122-2.122l1.414 1.414l-2.122 2.122z" fill="currentColor"></path><path d="M6.344 7.759L4.223 5.637l1.415-1.414l2.12 2.122z" fill="currentColor"></path><path d="M19.778 18.364l-1.414 1.414l-2.122-2.122l1.414-1.414z" fill="currentColor"></path></svg>
                        <svg v-if="theme == 'dark'" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" aria-hidden="true" role="img" width="24" height="24" preserveAspectRatio="xMidYMid meet" viewBox="0 0 24 24" class="w-6 h-6" data-v-f49459f4=""><path d="M6.993 12c0 2.761 2.246 5.007 5.007 5.007s5.007-2.246 5.007-5.007S14.761 6.993 12 6.993S6.993 9.239 6.993 12zM12 8.993c1.658 0 3.007 1.349 3.007 3.007S13.658 15.007 12 15.007S8.993 13.658 8.993 12S10.342 8.993 12 8.993zM10.998 19h2v3h-2zm0-17h2v3h-2zm-9 9h3v2h-3zm17 0h3v2h-3z" fill="currentColor"></path><path d="M4.219 18.363l2.12-2.122l1.415 1.414l-2.12 2.122z" fill="currentColor"></path><path d="M16.24 6.344l2.122-2.122l1.414 1.414l-2.122 2.122z" fill="currentColor"></path><path d="M6.342 7.759L4.22 5.637l1.415-1.414l2.12 2.122z" fill="currentColor"></path><path d="M19.776 18.364l-1.414 1.414l-2.122-2.122l1.414-1.414z" fill="currentColor"></path></svg>
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        data() {
            return {
                devtools: true,
                theme: undefined,
            }
        },

        mounted(){
            this.theme = (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches))
                ? 'dark'
                : 'light'
        },

        methods: {
            toggle_theme(){
                if (this.theme == 'dark') {
                    document.querySelector('html').classList.remove('dark')
                    this.theme = localStorage.theme = 'light'
                } else {
                    document.querySelector('html').classList.add('dark')
                    this.theme = localStorage.theme = 'dark'
                }
            }
        }
    }
</script>