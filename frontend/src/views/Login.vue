<template>
  <div class="hello">
   <button v-on:click="googleAuth()"> login with google </button>
   <button v-on:click="outlookAuth()"> login with Outlook </button>
  </div>
</template>

<script>
    
    export default {
        name: 'login',
        props: {
            urlparams: {
                type: String,
                default: null
            }
        },
        

        mounted: function() {

            if(this.urlparams != null ) {
                var base64 = this.urlparams.replace(/-/g, '+').replace(/_/g, '/');
                var logindata = decodeURIComponent(atob(base64).split('').map(function(c) {
                    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
                }).join(''));

                console.log(JSON.parse(logindata) )
            }
            
        },
        
        methods :  {
            googleAuth : function() {
                window.location.href = "http://localhost:8000/v1/auth/google"
            },
            outlookAuth: function() {
                window.location.href = "http://localhost:8000/v1/auth/microsoft"
            },
            
        },
    }
</script>
