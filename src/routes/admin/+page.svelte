<script lang="ts">
    import { Card, Button, Input } from "flowbite-svelte";
    let password = $state("");
    let logged_in = $state(false);
    let bericht = $state("");
    let new_message = $state(false)
    async function login() {
        const f = await fetch("/api/login", { 
            method: "POST", 
            body: JSON.stringify({ password: password }),
        })
        if(await f.json()=="success"){
            logged_in=true;
            message_updater()
        }
    }

   async function render_new_message(mess:string){ 
        new_message=true
        bericht=mess
        document.title = mess
        let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')!
        favicon.href = "/Green_icon.svg"
        if(Notification.permission=="default"){ 
            let permission = await Notification.requestPermission();
        }
        new Notification(bericht, { 
            body: "Nieuw bericht",
            icon: "./Green_icon.png"
        })
    }

    const message_updater = () => { 
        setInterval( async () => { 
            const f  = await fetch(" https://pieterapi-default-rtdb.europe-west1.firebasedatabase.app/.json")
            const json = await f.json()
            if(json.bericht!=bericht) {
                render_new_message(json.bericht)
            }
        } ,1000 )
    }
    const gezien = () => { 
        let favicon = document.querySelector<HTMLLinkElement>('link[rel="icon"]')!
        favicon.href = "/images.png"
        new_message=false
    }
</script>
<div class="w-screen h-screen justify-center items-center flex">
    {#if !logged_in}
        <Card class="py-5">
            <Input type="password" placeholder="Wachtwoord" bind:value={password}/>
            <Button class="mt-5" onclick={login} >
                Login
            </Button>
        </Card>
    {:else}
         <Card class="min-w-1/2">
            <span class="text-white text-3xl">{bericht}</span>
            {#if new_message}
                <Button onclick={gezien} class="mt-5"> Gezien </Button>
            {/if}
         </Card>
    {/if}
</div>